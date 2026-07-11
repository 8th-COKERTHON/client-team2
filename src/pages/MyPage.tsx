import { MobileScreen } from "@/components/ui/MobileScreen";
import { GradeCriteriaList } from "@/features/user/components/GradeCriteriaList";
import { GradeSummaryCard } from "@/features/user/components/GradeSummaryCard";
import { UserStatCards } from "@/features/user/components/UserStatCards";
import { useUserSummary } from "@/features/user/hooks/useUserSummary";
import { resolveCurrentGrade } from "@/features/user/utils";
import { getAccessToken } from "@/services/authTokenStorage";

export function MyPage() {
  const { userSummary, error } = useUserSummary();
  const shouldShowError = Boolean(getAccessToken()) && Boolean(error);
  const currentGrade = resolveCurrentGrade(
    userSummary.totalScore,
    userSummary.level,
  );

  return (
    <MobileScreen>
      <header className="bg-grayscale-000 sticky top-0 z-30">
        <div className="flex h-[50px] items-center justify-center px-5">
          <h1 className="text-grayscale-800 max-w-[230px] truncate text-center text-[18px] leading-[1.5] font-semibold tracking-[-0.45px]">
            My 성적표
          </h1>
        </div>
      </header>

      {shouldShowError ? (
        <div className="px-5 pt-20 text-center">
          <h2 className="text-[18px] leading-[1.5] font-semibold text-grayscale-800">
            마이페이지 정보를 불러오지 못했어요.
          </h2>
          <p className="mt-2 text-[14px] leading-[1.5] font-medium text-grayscale-300">
            잠시 후 다시 시도해 주세요.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 pt-[18px] pb-6">
          <GradeSummaryCard
            score={userSummary.totalScore}
            level={userSummary.level}
          />

          <UserStatCards
            savedBookmarkCount={userSummary.savedBookmarkCount}
            completedBookmarkCount={userSummary.completedBookmarkCount}
            totalViewCount={userSummary.totalViewCount}
          />

          <GradeCriteriaList currentGradeKey={currentGrade.key} />
        </div>
      )}
    </MobileScreen>
  );
}
