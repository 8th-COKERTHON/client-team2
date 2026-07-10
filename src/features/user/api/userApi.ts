import type { ScoreResponse, UserSummary } from "@/features/user/types";
import { apiClient } from "@/services/apiClient";

export async function getMyPage(): Promise<UserSummary> {
  return apiClient<UserSummary>("/api/mypage");
}

export async function getScore(): Promise<ScoreResponse> {
  return apiClient<ScoreResponse>("/api/score");
}
