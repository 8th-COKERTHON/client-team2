import { apiClient } from "@/services/apiClient";

import type {
  BookmarkDetailResponse,
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

export async function updateBookmark(
  bookmarkId: string,
  requestBody: BookmarkRequest,
): Promise<BookmarkResponse> {
  return apiClient<BookmarkResponse>(`/api/bookmarks/${bookmarkId}`, {
    method: "PATCH",
    body: requestBody,
  });
}

export async function getBookmarkDetail(
  bookmarkId: string,
): Promise<BookmarkDetailResponse> {
  return apiClient<BookmarkDetailResponse>(`/api/bookmarks/${bookmarkId}`);
}
