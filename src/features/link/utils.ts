import type { Bookmark } from "@/features/link/types";
import type {
  BookmarkDetailResponse,
  BookmarkResponse,
} from "@/features/link/api/types";

export function createReminderDateTime(
  reminderDate: string,
  reminderTime: string,
): string {
  return `${reminderDate}T${reminderTime}:00`;
}

function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "google.com";
  }
}

export function mapBookmarkDetailResponseToBookmark(
  response: BookmarkDetailResponse,
): Bookmark {
  return {
    id: String(response.bookmarkId),
    title: response.title,
    url: response.url,
    domain: getDomainFromUrl(response.url),
    purpose: response.title,
    reminderAt: response.remindAt ?? "",
    score: response.totalScore,
    tags: response.tags.map((tag) => ({
      id: String(tag.tagId),
      name: tag.name,
    })),
    checklist: response.checklists.map((checklist) => ({
      id: String(checklist.checklistId),
      title: checklist.content,
      isCompleted: checklist.isChecked,
    })),
  };
}

export function mapBookmarkResponseToBookmark(response: BookmarkResponse): Bookmark {
  return {
    id: String(response.bookmarkId),
    title: response.title,
    url: response.url,
    domain: getDomainFromUrl(response.url),
    purpose: response.title,
    reminderAt: response.remindAt ?? "",
    score: 0,
    viewedAt: response.visitedAt,
    tags: response.tags.map((tag) => ({
      id: tag.name,
      name: tag.name,
    })),
    checklist:
      response.checklists?.map((checklist) => ({
        id: String(checklist.checklistId),
        title: checklist.content,
        isCompleted: checklist.isChecked,
      })) ?? [],
  };
}

export function isServerId(id: string): boolean {
  return /^\d+$/.test(id);
}
