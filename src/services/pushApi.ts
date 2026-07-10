import { apiClient } from "@/services/apiClient";

export type PushSubscriptionRequest = {
  endpoint: string;
  p256dh: string;
  auth: string;
};

export type PushSubscriptionResponse = {
  subscriptionId: number;
  endpoint: string;
  createdAt: string;
  updatedAt: string;
};

export type PushSubscriptionDeleteRequest = {
  endpoint: string;
};

export type PushSubscriptionDeleteResponse = {
  message: string;
};

export type VapidPublicKeyResponse = {
  publicKey: string;
};

export async function getVapidPublicKey(): Promise<string> {
  const response = await apiClient<VapidPublicKeyResponse>(
    "/api/push/public-key",
  );

  return response.publicKey;
}

export async function savePushSubscription(
  requestBody: PushSubscriptionRequest,
): Promise<PushSubscriptionResponse> {
  return apiClient<PushSubscriptionResponse>("/api/push/subscriptions", {
    method: "POST",
    body: requestBody,
  });
}

export async function deletePushSubscription(
  requestBody: PushSubscriptionDeleteRequest,
): Promise<PushSubscriptionDeleteResponse> {
  return apiClient<PushSubscriptionDeleteResponse>("/api/push/subscriptions", {
    method: "DELETE",
    body: requestBody,
  });
}

export function mapPushSubscriptionToRequest(
  subscription: PushSubscription,
): PushSubscriptionRequest {
  const subscriptionJson = subscription.toJSON();
  const p256dh = subscriptionJson.keys?.p256dh;
  const auth = subscriptionJson.keys?.auth;

  if (!subscriptionJson.endpoint || !p256dh || !auth) {
    throw new Error("Push subscription is missing required keys.");
  }

  return {
    endpoint: subscriptionJson.endpoint,
    p256dh,
    auth,
  };
}
