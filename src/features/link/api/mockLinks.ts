import type { Bookmark, CollectionDetail, Tag } from "@/features/link/types";

export const MOCK_TAGS: Tag[] = [
  { id: "css", name: "태그1" },
  { id: "react", name: "태그2" },
];

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: "css-grid-guide",
    title: "CSS Grid 완벽 가이드",
    url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    domain: "google.com",
    purpose: "CSS Grid 완벽 가이드",
    reminderAt: "2026-07-18 11:00",
    score: 58,
    tags: MOCK_TAGS,
    checklist: [
      { id: "read-all", title: "전체 읽기", isCompleted: false },
      { id: "practice-code", title: "예제 코드 실습", isCompleted: false },
    ],
  },
  {
    id: "link-title-1",
    title: "링크 제목",
    url: "https://google.com",
    domain: "google.com",
    purpose: "링크 제목",
    reminderAt: "2026-07-18 11:00",
    score: 42,
    tags: MOCK_TAGS,
    checklist: [
      { id: "read", title: "전체 읽기", isCompleted: false },
      { id: "memo", title: "메모 남기기", isCompleted: false },
    ],
  },
  {
    id: "link-title-2",
    title: "링크 제목",
    url: "https://google.com",
    domain: "google.com",
    purpose: "링크 제목",
    reminderAt: "2026-07-18 11:00",
    score: 38,
    tags: MOCK_TAGS,
    checklist: [
      { id: "read", title: "전체 읽기", isCompleted: false },
      { id: "memo", title: "메모 남기기", isCompleted: false },
    ],
  },
  {
    id: "link-title-3",
    title: "링크 제목",
    url: "https://google.com",
    domain: "google.com",
    purpose: "링크 제목",
    reminderAt: "2026-07-18 11:00",
    score: 31,
    tags: MOCK_TAGS,
    checklist: [
      { id: "read", title: "전체 읽기", isCompleted: false },
      { id: "memo", title: "메모 남기기", isCompleted: false },
    ],
  },
  {
    id: "link-title-4",
    title: "링크 제목",
    url: "https://google.com",
    domain: "google.com",
    purpose: "링크 제목",
    reminderAt: "2026-07-18 11:00",
    score: 29,
    tags: MOCK_TAGS,
    checklist: [
      { id: "read", title: "전체 읽기", isCompleted: false },
      { id: "memo", title: "메모 남기기", isCompleted: false },
    ],
  },
  {
    id: "link-title-5",
    title: "링크 제목",
    url: "https://google.com",
    domain: "google.com",
    purpose: "링크 제목",
    reminderAt: "2026-07-18 11:00",
    score: 24,
    tags: MOCK_TAGS,
    checklist: [
      { id: "read", title: "전체 읽기", isCompleted: false },
      { id: "memo", title: "메모 남기기", isCompleted: false },
    ],
  },
];

// TODO: Replace mock data with backend API responses when the REST contract is confirmed.
export function getMockCollectionDetail(tagId: string): CollectionDetail {
  const tag = MOCK_TAGS.find((item) => item.id === tagId) ?? MOCK_TAGS[0];

  return {
    tag,
    bookmarks: MOCK_BOOKMARKS.filter((bookmark) =>
      bookmark.tags.some((bookmarkTag) => bookmarkTag.id === tag.id),
    ),
  };
}

// TODO: Replace mock data with backend API responses when the REST contract is confirmed.
export function getMockBookmarkDetail(bookmarkId: string): Bookmark | undefined {
  return MOCK_BOOKMARKS.find((bookmark) => bookmark.id === bookmarkId);
}
