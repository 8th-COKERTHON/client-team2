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

export interface CreatedNotificationResponse {
  notificationId: number;
  bookmarkId: number;
  bookmarkTitle: string;
  notificationCount: number;
  reminderLevel: number;
  title: string;
  message: string;
  incompleteChecklistCount: number;
  nextReminderAt: string;
  createdAt: string;
}

export interface NotificationGenerationResponse {
  processedBookmarkCount: number;
  createdNotificationCount: number;
  notifications: CreatedNotificationResponse[];
  message: string;
}

export type NotificationFilter = "all" | "unread";
