import type { UserSummary } from "@/features/user/types";

const MOCK_USER_SUMMARY: UserSummary = {
  nickname: "은서",
  totalScore: 0,
  level: "유치원생",
  savedBookmarkCount: 15,
  completedBookmarkCount: 7,
  totalViewCount: 23,
};

export function getMockUserSummary(): UserSummary {
  return MOCK_USER_SUMMARY;
}
