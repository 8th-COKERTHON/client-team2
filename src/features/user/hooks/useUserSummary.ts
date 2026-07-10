import { useEffect, useState } from "react";

import { getMockUserSummary } from "@/features/user/api/mockUserSummary";
import { getMyPage } from "@/features/user/api/userApi";
import type { UserSummary } from "@/features/user/types";

type UseUserSummaryResult = {
  userSummary: UserSummary;
  isLoading: boolean;
  error: Error | null;
};

export function useUserSummary(): UseUserSummaryResult {
  const [userSummary, setUserSummary] = useState<UserSummary>(() =>
    getMockUserSummary(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserSummary(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMyPage();

        if (isMounted) {
          setUserSummary(data);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error("마이페이지 정보를 불러오지 못했습니다."),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchUserSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  return { userSummary, isLoading, error };
}
