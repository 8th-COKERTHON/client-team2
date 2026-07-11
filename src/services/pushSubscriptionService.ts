import {
  deletePushSubscription,
  getVapidPublicKey,
  mapPushSubscriptionToRequest,
  savePushSubscription,
} from "@/services/pushApi";

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = `${base64String}${padding}`
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(new ArrayBuffer(rawData.length));

  for (let index = 0; index < rawData.length; index += 1) {
    outputArray[index] = rawData.charCodeAt(index);
  }

  return outputArray;
}

export function canUseWebPush(): boolean {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!canUseWebPush()) {
    return "denied";
  }

  if (Notification.permission !== "default") {
    return Notification.permission;
  }

  return Notification.requestPermission();
}

export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  const permission = await requestNotificationPermission();

  if (permission !== "granted") {
    return null;
  }

  const registration = await navigator.serviceWorker.ready;
  const existingSubscription = await registration.pushManager.getSubscription();

  if (existingSubscription) {
    await savePushSubscription(mapPushSubscriptionToRequest(existingSubscription));
    return existingSubscription;
  }

  const publicKey = await getVapidPublicKey();
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  await savePushSubscription(mapPushSubscriptionToRequest(subscription));

  return subscription;
}

export async function unsubscribeFromPushNotifications(): Promise<void> {
  if (!canUseWebPush()) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  await deletePushSubscription({ endpoint: subscription.endpoint });
  await subscription.unsubscribe();
}
