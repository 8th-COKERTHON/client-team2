import type {
  NotificationGenerationResponse,
  NotificationGroup,
  NotificationsResponse,
} from "@/features/notification/types";
import { apiClient } from "@/services/apiClient";

export async function getNotifications(): Promise<NotificationGroup[]> {
  const response =
    await apiClient<NotificationsResponse>("/api/notifications");

  return response.notifications;
}

export async function generateNotifications(): Promise<NotificationGenerationResponse> {
  return apiClient<NotificationGenerationResponse>("/api/notifications", {
    method: "POST",
  });
}
