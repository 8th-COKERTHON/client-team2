import { useEffect, useState } from "react";

import { getHome } from "@/features/home/api/getHome";
import type { HomeData } from "@/features/home/types";
import { mapHomeResponseToHomeData } from "@/features/home/utils";

type UseHomeResult = {
  homeData: HomeData | null;
  isLoading: boolean;
  error: Error | null;
};

export function useHome(): UseHomeResult {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchHome(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getHome();

        if (isMounted) {
          setHomeData(mapHomeResponseToHomeData(response));
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error("홈 정보를 불러오지 못했습니다."),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchHome();

    return () => {
      isMounted = false;
    };
  }, []);

  return { homeData, isLoading, error };
}
