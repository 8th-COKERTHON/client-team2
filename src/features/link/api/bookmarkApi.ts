import { apiClient } from "@/services/apiClient";

import type {
  BookmarkRequest,
  BookmarkResponse,
} from "@/features/link/api/types";

export async function createBookmark(
  requestBody: BookmarkRequest,
): Promise<BookmarkResponse> {
  return apiClient<BookmarkResponse>("/api/bookmarks", {
    method: "POST",
    body: requestBody,
  });
}
