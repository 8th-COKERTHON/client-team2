import { useMemo, useState } from "react";

import { Header } from "@/components/layout/Header";
import { NotificationCard } from "@/features/notification/components/NotificationCard";
import { NotificationFilterTabs } from "@/features/notification/components/NotificationFilterTabs";
import { useNotifications } from "@/features/notification/hooks/useNotifications";
import type { NotificationFilter } from "@/features/notification/types";
import EmptyNotificationPage from "./EmptyNotificationPage";

export function NotificationListPage() {
  const { notifications, isLoading, error } = useNotifications();
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const unreadCount = useMemo(
    () =>
      notifications
        .filter((notificationGroup) => !notificationGroup.isRead)
        .reduce(
          (total, notificationGroup) =>
            total + notificationGroup.notificationCount,
          0,
        ),
    [notifications],
  );

  const visibleNotifications = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((notificationGroup) => !notificationGroup.isRead)
        : notifications,
    [filter, notifications],
  );

  return (
    <div className="bg-grayscale-background flex min-h-screen flex-col">
      <Header title="알림" />

      <div className="flex flex-col gap-3 px-5 pt-6">
        <NotificationFilterTabs
          filter={filter}
          unreadCount={unreadCount}
          onFilterChange={setFilter}
        />

        {isLoading && (
          <p className="typo-kr-body-regular text-grayscale-300 py-10 text-center">
            알림을 불러오는 중이에요.
          </p>
        )}

        {error && (
          <p className="typo-kr-body-regular text-error py-10 text-center">
            알림을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        {!isLoading && !error && visibleNotifications.length === 0 && (
          <EmptyNotificationPage />
        )}

        {!isLoading && !error && visibleNotifications.length > 0 && (
          <ul className="flex list-none flex-col gap-3">
            {visibleNotifications.map((notificationGroup) => (
              <NotificationCard
                key={notificationGroup.bookmarkId}
                notificationGroup={notificationGroup}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
