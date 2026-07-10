import { GRADES } from "@/features/user/utils";
import type { Grade } from "@/features/user/types";

type GradeCriteriaListProps = {
  currentGradeKey: string;
};

function formatScoreRange(grade: Grade): string {
  if (grade.maxScore === Infinity) {
    return `${grade.minScore}~∞점`;
  }
  return `${grade.minScore}~${grade.maxScore}점`;
}

export function GradeCriteriaList({ currentGradeKey }: GradeCriteriaListProps) {
  return (
    <div className="bg-grayscale-white flex w-full flex-col gap-3 rounded-xl px-4 pt-4 pb-2">
      <p className="text-[18px] leading-[1.5] font-semibold text-[#1a1a1a]">
        등급 기준
      </p>

      <ul className="flex w-full flex-col">
        {GRADES.map((grade, index) => {
          const isCurrentGrade = grade.key === currentGradeKey;
          const isLastRow = index === GRADES.length - 1;

          return (
            <li
              key={grade.key}
              className={`flex items-center justify-between py-2 ${
                isLastRow ? "" : "border-grayscale-050 border-b-[0.8px]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[18px] leading-[28px]">
                  {grade.emoji}
                </span>
                <span
                  className={`text-[16px] font-medium tracking-[-0.4px] ${
                    isCurrentGrade ? "text-grayscale-800" : "text-grayscale-200"
                  }`}
                >
                  {grade.label}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-grayscale-100 text-[14px] font-medium tracking-[-0.35px]">
                  {formatScoreRange(grade)}
                </span>
                {isCurrentGrade && (
                  <span className="text-grayscale-white flex h-[23px] w-[43px] items-center justify-center rounded-lg bg-[#d42b2b] text-[12px] tracking-[-0.3px]">
                    현재
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
