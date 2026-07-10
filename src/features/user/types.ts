export type Grade = {
  key: string;
  label: string;
  emoji: string;
  minScore: number;
  maxScore: number;
};

export type UserSummary = {
  nickname: string;
  totalScore: number;
  level: string;
  savedBookmarkCount: number; // 저장한 북마크 개수
  completedBookmarkCount: number; // 완료한 북마크 개수
  totalViewCount: number; // 총 조회수
};

export type ScoreResponse = {
  totalScore: string;
};
