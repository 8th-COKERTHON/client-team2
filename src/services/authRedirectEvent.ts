export const AUTH_REQUIRED_EVENT_NAME = "remine:auth-required";

export function dispatchAuthRequiredEvent(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_REQUIRED_EVENT_NAME));
}
