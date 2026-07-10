import { apiClient } from "@/services/apiClient";

import type {
  BookmarkDetailResponse,
  BookmarkMutationResponse,
  BookmarkRequest,
  TagFilterResponse,
} from "@/features/link/api/types";

export async function createBookmark(
  requestBody: BookmarkRequest,
): Promise<BookmarkMutationResponse> {
  return apiClient<BookmarkMutationResponse>("/api/bookmarks", {
    method: "POST",
    body: requestBody,
  });
}

export async function updateBookmark(
  bookmarkId: string,
  requestBody: BookmarkRequest,
): Promise<BookmarkMutationResponse> {
  return apiClient<BookmarkMutationResponse>(`/api/bookmarks/${bookmarkId}`, {
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

export async function visitBookmark(
  bookmarkId: string,
): Promise<BookmarkMutationResponse> {
  return apiClient<BookmarkMutationResponse>(`/api/bookmarks/${bookmarkId}`, {
    method: "POST",
  });
}

export async function deleteBookmark(
  bookmarkId: string,
): Promise<BookmarkMutationResponse> {
  return apiClient<BookmarkMutationResponse>(`/api/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });
}
