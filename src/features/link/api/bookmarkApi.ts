import { apiClient } from "@/services/apiClient";

import type {
  BookmarkDetailResponse,
  BookmarkRequest,
  BookmarkResponse,
  TagFilterResponse,
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

export async function getBookmarksByTag(
  tagName: string,
): Promise<TagFilterResponse> {
  return apiClient<TagFilterResponse>(
    `/api/bookmarks/tags?tagName=${encodeURIComponent(tagName)}`,
  );
}

export async function visitBookmark(bookmarkId: string): Promise<BookmarkResponse> {
  return apiClient<BookmarkResponse>(`/api/bookmarks/${bookmarkId}`, {
    method: "POST",
  });
}

export async function deleteBookmark(bookmarkId: string): Promise<void> {
  await apiClient<void>(`/api/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });
}
