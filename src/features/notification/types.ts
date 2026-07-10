export interface NotificationItem {
  notificationId: number;
  title: string;
  message: string;
  sentAt: string;
}

export interface NotificationGroup {
  bookmarkId: number;
  bookmarkTitle: string;
  notificationCount: number;
  // 북마크의 view_count가 1회 이상이면 읽음으로 처리
  isRead: boolean;
  latestNotificationAt: string;
  notificationItems: NotificationItem[];
}

export interface NotificationsResponse {
  totalBookmarkCount: number;
  totalNotificationCount: number;
  notifications: NotificationGroup[];
}

export type NotificationFilter = "all" | "unread";
