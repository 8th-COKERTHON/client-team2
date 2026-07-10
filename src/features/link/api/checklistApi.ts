import { apiClient } from "@/services/apiClient";

import type {
  ChecklistResponse,
  CreateChecklistRequest,
} from "@/features/link/api/types";

export async function createChecklist(
  bookmarkId: number,
  requestBody: CreateChecklistRequest,
): Promise<ChecklistResponse> {
  return apiClient<ChecklistResponse>(`/api/bookmarks/${bookmarkId}/checklists`, {
    method: "POST",
    body: requestBody,
  });
}
