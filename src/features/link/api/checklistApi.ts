import { apiClient } from "@/services/apiClient";

import type {
  ChecklistCheckResponse,
  ChecklistResponse,
  CreateChecklistRequest,
  UpdateChecklistRequest,
} from "@/features/link/api/types";

export async function createChecklist(
  bookmarkId: number | string,
  requestBody: CreateChecklistRequest,
): Promise<ChecklistResponse> {
  return apiClient<ChecklistResponse>(`/api/bookmarks/${bookmarkId}/checklists`, {
    method: "POST",
    body: requestBody,
  });
}

export async function toggleChecklist(
  bookmarkId: number | string,
  checklistId: number | string,
): Promise<ChecklistCheckResponse> {
  return apiClient<ChecklistCheckResponse>(
    `/api/bookmarks/${bookmarkId}/checklists/${checklistId}/check`,
    {
      method: "POST",
    },
  );
}

export async function updateChecklist(
  bookmarkId: number | string,
  checklistId: number | string,
  requestBody: UpdateChecklistRequest,
): Promise<ChecklistResponse> {
  return apiClient<ChecklistResponse>(
    `/api/bookmarks/${bookmarkId}/checklists/${checklistId}`,
    {
      method: "PATCH",
      body: requestBody,
    },
  );
}

export async function deleteChecklist(
  bookmarkId: number | string,
  checklistId: number | string,
): Promise<void> {
  await apiClient<void>(
    `/api/bookmarks/${bookmarkId}/checklists/${checklistId}`,
    {
      method: "DELETE",
    },
  );
}
