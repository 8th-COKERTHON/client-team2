import type { Bookmark } from "@/features/link/types";

import type {
  HomeCollection,
  HomeData,
  HomeResponse,
} from "@/features/home/types";

function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function mapHomeResponseToHomeData(response: HomeResponse): HomeData {
  return {
    nickname: response.nickname,
    totalScore: response.totalScore,
    todayArchive: response.todayArchive.map((item) => ({
      id: String(item.bookmarkId),
      title: item.title,
      url: item.url,
      domain: getDomainFromUrl(item.url),
      tags: item.tags,
      checkedCount: item.checkedCount,
      totalChecklistCount: item.totalChecklistCount,
    })),
    collections: response.collections.map((collection) => ({
      tagName: collection.tagName,
      bookmarkCount: collection.bookmarkCount,
    })),
  };
}

export function mapBookmarksToHomeData(bookmarks: Bookmark[]): HomeData {
  const tagCountMap = new Map<string, HomeCollection>();

  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      const currentCollection = tagCountMap.get(tag.name);

      tagCountMap.set(tag.name, {
        tagName: tag.name,
        bookmarkCount: (currentCollection?.bookmarkCount ?? 0) + 1,
      });
    });
  });

  return {
    nickname: "",
    totalScore: 90,
    todayArchive: bookmarks.slice(0, 2).map((bookmark) => ({
      id: bookmark.id,
      title: bookmark.purpose.trim() || bookmark.title.trim(),
      url: bookmark.url,
      domain: bookmark.domain,
      tags:
        bookmark.tags.length > 0
          ? bookmark.tags.slice(0, 3).map((tag) => tag.name)
          : ["태그", "태그", "태그"],
      checkedCount: bookmark.checklist.filter((item) => item.isCompleted).length,
      totalChecklistCount: bookmark.checklist.length,
    })),
    collections: Array.from(tagCountMap.values()),
  };
}
