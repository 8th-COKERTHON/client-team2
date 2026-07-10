import type { Bookmark, Tag } from "@/features/link/types";

const BOOKMARK_STORAGE_KEY = "remine.bookmarks";

export type CreateBookmarkInput = {
  title: string;
  url: string;
  reminderDate: string;
  reminderTime: string;
  tags: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTag(value: unknown): value is Tag {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string"
  );
}

function isChecklistItem(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.isCompleted === "boolean"
  );
}

function isBookmark(value: unknown): value is Bookmark {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.url === "string" &&
    typeof value.domain === "string" &&
    typeof value.purpose === "string" &&
    typeof value.reminderAt === "string" &&
    typeof value.score === "number" &&
    Array.isArray(value.tags) &&
    value.tags.every(isTag) &&
    Array.isArray(value.checklist) &&
    value.checklist.every(isChecklistItem)
  );
}

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function createTagId(tagName: string): string {
  return tagName.trim().replace(/^#/, "");
}

function decodeTagId(tagId: string): string {
  try {
    return decodeURIComponent(tagId);
  } catch {
    return tagId;
  }
}

function normalizeBookmarkTags(bookmark: Bookmark): Bookmark {
  const tagMap = new Map<string, Tag>();

  bookmark.tags.forEach((tag) => {
    const tagId = decodeTagId(tag.id);

    if (!tagMap.has(tagId)) {
      tagMap.set(tagId, {
        id: tagId,
        name: decodeTagId(tag.name),
      });
    }
  });

  return {
    ...bookmark,
    tags: Array.from(tagMap.values()),
  };
}

function isSameTagId(storedTagId: string, routeTagId: string): boolean {
  return decodeTagId(storedTagId) === decodeTagId(routeTagId);
}

function createDomain(url: string): string {
  if (!url.trim()) {
    return "google.com";
  }

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "google.com";
  }
}

export function getStoredBookmarks(): Bookmark[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  const rawBookmarks = window.localStorage.getItem(BOOKMARK_STORAGE_KEY);

  if (!rawBookmarks) {
    return [];
  }

  try {
    const parsedBookmarks: unknown = JSON.parse(rawBookmarks);

    if (!Array.isArray(parsedBookmarks)) {
      return [];
    }

    return parsedBookmarks.filter(isBookmark).map(normalizeBookmarkTags);
  } catch {
    return [];
  }
}

export function getStoredBookmark(bookmarkId: string): Bookmark | undefined {
  return getStoredBookmarks().find((bookmark) => bookmark.id === bookmarkId);
}

export function getStoredBookmarksByTag(tagId: string): Bookmark[] {
  return getStoredBookmarks().filter((bookmark) =>
    bookmark.tags.some((tag) => isSameTagId(tag.id, tagId)),
  );
}

export function createStoredBookmark(input: CreateBookmarkInput): Bookmark {
  const tags = input.tags
    .map((tagName) => tagName.trim().replace(/^#/, ""))
    .filter(Boolean)
    .slice(0, 5)
    .map((tagName) => ({
      id: createTagId(tagName),
      name: tagName,
    }));

  const bookmark: Bookmark = {
    id: `local-${Date.now()}`,
    title: input.title.trim(),
    url: input.url.trim(),
    domain: createDomain(input.url),
    purpose: input.title.trim(),
    reminderAt: `${input.reminderDate} ${input.reminderTime}`,
    score: 0,
    tags,
    checklist: [],
  };

  const bookmarks = getStoredBookmarks();
  window.localStorage.setItem(
    BOOKMARK_STORAGE_KEY,
    JSON.stringify([bookmark, ...bookmarks]),
  );

  return bookmark;
}

export function getStoredTags(): Array<Tag & { count: number }> {
  const tagMap = new Map<string, Tag & { count: number }>();

  getStoredBookmarks().forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      const currentTag = tagMap.get(tag.id);

      if (currentTag) {
        tagMap.set(tag.id, { ...currentTag, count: currentTag.count + 1 });
        return;
      }

      tagMap.set(tag.id, { ...tag, count: 1 });
    });
  });

  return Array.from(tagMap.values());
}
