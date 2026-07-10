import { apiClient } from "@/services/apiClient";

import type { HomeResponse } from "@/features/home/types";

export async function getHome(): Promise<HomeResponse> {
  return apiClient<HomeResponse>("/api/home");
}
