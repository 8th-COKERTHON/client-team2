import { MobileScreen } from "@/components/ui/MobileScreen";
import { getMockUserSummary } from "@/features/user/api/mockUserSummary";
import { GradeCriteriaList } from "@/features/user/components/GradeCriteriaList";
import { GradeSummaryCard } from "@/features/user/components/GradeSummaryCard";
import { UserStatCards } from "@/features/user/components/UserStatCards";
import { resolveCurrentGrade } from "@/features/user/utils";

export function MyPage() {
  const userSummary = getMockUserSummary();
  const currentGrade = resolveCurrentGrade(
    userSummary.totalScore,
    userSummary.level,
  );

  return (
    <MobileScreen>
      <header className="bg-grayscale-000 sticky top-0 z-30">
        <div className="flex h-[60px] items-end px-5 pb-2" aria-hidden="true" />
        <div className="flex h-[50px] items-center justify-center px-5">
          <h1 className="text-grayscale-800 max-w-[230px] truncate text-center text-[18px] leading-[1.5] font-semibold tracking-[-0.45px]">
            My 성적표
          </h1>
        </div>
      </header>

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
    </MobileScreen>
  );
}
