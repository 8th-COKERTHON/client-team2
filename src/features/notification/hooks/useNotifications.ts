import { useEffect, useState } from "react";

import { getNotifications } from "@/features/notification/api/getNotifications";
import type { NotificationGroup } from "@/features/notification/types";

type UseNotificationsResult = {
  notifications: NotificationGroup[];
  isLoading: boolean;
  error: Error | null;
};

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<NotificationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchNotifications(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getNotifications();
        if (isMounted) {
          setNotifications(data);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error("알림을 불러오지 못했습니다."),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  return { notifications, isLoading, error };
}
