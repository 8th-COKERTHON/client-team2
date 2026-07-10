export type Grade = {
  key: string;
  label: string;
  emoji: string;
  minScore: number;
  maxScore: number;
};

//TODO: Replace with the actual API response after backend integration.
export type UserSummary = {
  nickname: string;
  totalScore: number;
  level: string;
  savedBookmarkCount: number; // 저장한 북마크 개수
  completedBookmarkCount: number; // 완료한 북마크 개수
  totalViewCount: number; // 총 조회수
};
