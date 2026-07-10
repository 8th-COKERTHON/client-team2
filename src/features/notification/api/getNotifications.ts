import type {
  NotificationGroup,
  NotificationsResponse,
} from "@/features/notification/types";
import { apiClient } from "@/services/apiClient";

export async function getNotifications(): Promise<NotificationGroup[]> {
  const response =
    await apiClient<NotificationsResponse>("/api/notifications");

  return response.notifications;
}
