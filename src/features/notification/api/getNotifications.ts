import type {
  NotificationGroup,
  NotificationsResponse,
} from "@/features/notification/types";

//TODO: Replace with the actual API response after backend integration.
const MOCK_NOTIFICATIONS_RESPONSE: NotificationsResponse = {
  totalBookmarkCount: 2,
  totalNotificationCount: 5,
  notifications: [
    {
      bookmarkId: 10,
      bookmarkTitle: "공고",
      notificationCount: 3,
      isRead: true,
      latestNotificationAt: "2026-07-10T18:00:00",
      notificationItems: [
        {
          notificationId: 103,
          title: "체크리스트 리마인드",
          message: "자기소개서 작성을 완료할 시간이에요.",
          sentAt: "2026-07-10T18:00:00",
        },
        {
          notificationId: 102,
          title: "체크리스트 리마인드",
          message: "지원서 제출 전 내용을 검토해보세요.",
          sentAt: "2026-07-09T18:00:00",
        },
        {
          notificationId: 101,
          title: "체크리스트 리마인드",
          message: "오늘 지원서를 작성해보세요.",
          sentAt: "2026-07-08T18:00:00",
        },
      ],
    },
    {
      bookmarkId: 20,
      bookmarkTitle: "Spring Batch 학습 자료",
      notificationCount: 2,
      isRead: false,
      latestNotificationAt: "2026-07-10T15:00:00",
      notificationItems: [
        {
          notificationId: 105,
          title: "학습 리마인드",
          message: "Spring Batch 예제를 실행해볼 시간이에요.",
          sentAt: "2026-07-10T15:00:00",
        },
        {
          notificationId: 104,
          title: "학습 리마인드",
          message: "저장한 학습 자료를 확인해보세요.",
          sentAt: "2026-07-09T15:00:00",
        },
      ],
    },
  ],
};

export async function getNotifications(): Promise<NotificationGroup[]> {
  return Promise.resolve(MOCK_NOTIFICATIONS_RESPONSE.notifications);
}
