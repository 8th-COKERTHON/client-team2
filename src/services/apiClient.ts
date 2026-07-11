import { env } from "@/lib/env";
import { dispatchAuthRequiredEvent } from "@/services/authRedirectEvent";
import { clearAuthTokens, getAccessToken } from "@/services/authTokenStorage";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ApiClientOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  auth?: boolean;
};

export class ApiError extends Error {
  status: number;
  responseBody: unknown;

  constructor(status: number, responseBody: unknown) {
    super(`API request failed with status ${status}.`);
    this.name = "ApiError";
    this.status = status;
    this.responseBody = responseBody;
  }
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");

  if (response.status === 204) {
    return undefined;
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || undefined;
}

function isAccessTokenRequiredError(
  status: number,
  responseBody: unknown,
): boolean {
  if (status === 401) {
    return true;
  }

  if (
    status === 400 &&
    typeof responseBody === "object" &&
    responseBody !== null &&
    "message" in responseBody &&
    typeof responseBody.message === "string"
  ) {
    return responseBody.message.includes("Access Token");
  }

  return false;
}

export async function apiClient<TResponse>(
  path: string,
  options: ApiClientOptions = {},
): Promise<TResponse> {
  const headers = new Headers(options.headers);
  const shouldUseAuth = options.auth !== false;

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (shouldUseAuth) {
    const accessToken = getAccessToken();

    if (!accessToken) {
      dispatchAuthRequiredEvent();
      throw new ApiError(401, { message: "Access Token은 필수입니다." });
    }

    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    if (shouldUseAuth && isAccessTokenRequiredError(response.status, responseBody)) {
      clearAuthTokens();
      dispatchAuthRequiredEvent();
    }

    throw new ApiError(response.status, responseBody);
  }

  return responseBody as TResponse;
}
