self.addEventListener("push", (event) => {
  const payload = parsePushPayload(event);
  const title = payload.title || "적재적소";
  const body = payload.message || payload.body || "새로운 알림이 도착했어요.";
  const url = resolveNotificationUrl(payload);

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: payload.notificationId
        ? `notification-${payload.notificationId}`
        : undefined,
      data: {
        url,
      },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = getSafeClientUrl(event.notification.data?.url);

  event.waitUntil(focusOrOpenClient(targetUrl));
});

function parsePushPayload(event) {
  if (!event.data) {
    return {};
  }

  try {
    return event.data.json();
  } catch {
    return {
      title: "적재적소",
      message: event.data.text(),
    };
  }
}

function resolveNotificationUrl(payload) {
  if (typeof payload.url === "string") {
    return payload.url;
  }

  if (typeof payload.path === "string") {
    return payload.path;
  }

  if (payload.bookmarkId) {
    return `/links/${payload.bookmarkId}`;
  }

  return "/notifications";
}

function getSafeClientUrl(url) {
  const fallbackUrl = new URL("/notifications", self.location.origin);

  if (typeof url !== "string") {
    return fallbackUrl.href;
  }

  try {
    const targetUrl = new URL(url, self.location.origin);

    if (targetUrl.origin !== self.location.origin) {
      return fallbackUrl.href;
    }

    return targetUrl.href;
  } catch {
    return fallbackUrl.href;
  }
}

async function focusOrOpenClient(targetUrl) {
  const clientList = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (const client of clientList) {
    const clientUrl = new URL(client.url);

    if (clientUrl.origin === self.location.origin && "focus" in client) {
      await client.focus();

      if ("navigate" in client) {
        return client.navigate(targetUrl);
      }

      return undefined;
    }
  }

  return self.clients.openWindow(targetUrl);
}
