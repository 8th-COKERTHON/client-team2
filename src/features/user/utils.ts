import type { Grade } from "@/features/user/types";

export const GRADES: Grade[] = [
  {
    key: "kindergarten",
    label: "유치원생",
    emoji: "🧸",
    minScore: 0,
    maxScore: 99,
  },
  {
    key: "elementary",
    label: "초등학생",
    emoji: "🎒",
    minScore: 100,
    maxScore: 299,
  },
  {
    key: "middleSchool",
    label: "중학생",
    emoji: "📘",
    minScore: 300,
    maxScore: 699,
  },
  {
    key: "highSchool",
    label: "고등학생",
    emoji: "📖",
    minScore: 700,
    maxScore: 1499,
  },
  {
    key: "university",
    label: "대학생",
    emoji: "🎓",
    minScore: 1500,
    maxScore: Infinity,
  },
];

export function getGradeByScore(score: number): Grade {
  return (
    GRADES.find(
      (grade) => score >= grade.minScore && score <= grade.maxScore,
    ) ?? GRADES[GRADES.length - 1]
  );
}

// 백엔드가 계산한 level 문자열을 우선 신뢰하고, 매칭되는 등급이 없을 때만 점수로 계산한다.
export function resolveCurrentGrade(score: number, level?: string): Grade {
  const matchedGrade = level
    ? GRADES.find((grade) => grade.label === level)
    : undefined;

  return matchedGrade ?? getGradeByScore(score);
}

export function getNextGrade(currentGrade: Grade): Grade | undefined {
  const currentIndex = GRADES.findIndex(
    (grade) => grade.key === currentGrade.key,
  );
  return GRADES[currentIndex + 1];
}

export type GradeProgress = {
  currentGrade: Grade;
  nextGrade: Grade | undefined;
  progressPercent: number;
  pointsToNextGrade: number;
};

export function getGradeProgress(score: number, level?: string): GradeProgress {
  const currentGrade = resolveCurrentGrade(score, level);
  const nextGrade = getNextGrade(currentGrade);

  if (!nextGrade) {
    return {
      currentGrade,
      nextGrade,
      progressPercent: 100,
      pointsToNextGrade: 0,
    };
  }

  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      ((score - currentGrade.minScore) /
        (nextGrade.minScore - currentGrade.minScore)) *
        100,
    ),
  );

  return {
    currentGrade,
    nextGrade,
    progressPercent,
    pointsToNextGrade: nextGrade.minScore - score,
  };
}
