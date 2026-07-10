import { apiClient } from "@/services/apiClient";

import type {
  ChecklistCheckResponse,
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

export async function toggleChecklist(
  bookmarkId: string,
  checklistId: string,
): Promise<ChecklistCheckResponse> {
  return apiClient<ChecklistCheckResponse>(
    `/api/bookmarks/${bookmarkId}/checklists/${checklistId}/check`,
    {
      method: "POST",
    },
  );
}
