import { useState } from "react";
import { Link } from "react-router";

import emptyCharacter from "@/assets/icons/character2.png";
import { ROUTES } from "@/constants/routes";
import { getStoredBookmarks } from "@/features/link/api/localBookmarkStorage";
import type { Bookmark, Tag } from "@/features/link/types";
import { ScoreUnderline } from "@/features/user/components/GradeSummaryCard";

const DEFAULT_PREVIEW_TAGS = ["태그", "태그", "태그"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M10.75 18.5a7.75 7.75 0 1 1 0-15.5 7.75 7.75 0 0 1 0 15.5ZM16.5 16.5 21 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M6.5 9.5a5.5 5.5 0 0 1 11 0v3.36l1.34 2.69A1 1 0 0 1 17.95 17H6.05a1 1 0 0 1-.9-1.45l1.35-2.69V9.5ZM10 19h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SiteIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`${className} text-grayscale-100`} aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="currentColor" />
      <path
        d="M4 10h12M10 2.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M10 2.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5"
        stroke="white"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function HomeTag({
  label,
  size = "default",
}: {
  label: string;
  size?: "default" | "small";
}) {
  const isSmall = size === "small";

  return (
    <span
      className={`shrink-0 rounded-md bg-main-100 text-center font-medium text-main-300 ${
        isSmall
          ? "w-[34px] px-[2px] py-px text-[9.72px] leading-[1.5]"
          : "w-11 px-1 py-0.5 text-[14px] leading-[1.5]"
      }`}
    >
      # {label}
    </span>
  );
}

function getBookmarkDescription(bookmark: Bookmark): string {
  return bookmark.purpose.trim() || bookmark.title.trim();
}

type ArchiveCardProps = {
  bookmark: Bookmark;
};

function ArchiveCard({ bookmark }: ArchiveCardProps) {
  const description = getBookmarkDescription(bookmark);
  const completedCount = bookmark.checklist.filter((item) => item.isCompleted).length;
  const previewTags =
    bookmark.tags.length > 0
      ? bookmark.tags.slice(0, 3).map((tag) => tag.name)
      : DEFAULT_PREVIEW_TAGS;

  return (
    <Link
      to={ROUTES.linkDetail(bookmark.id)}
      className="flex size-[180px] shrink-0 flex-col justify-between rounded-xl bg-grayscale-white p-4"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="line-clamp-1 text-[18px] leading-[1.5] font-semibold text-grayscale-800">
            {description}
          </h2>
          <div className="flex items-center gap-1">
            <SiteIcon />
            <span className="truncate text-[16px] leading-[1.5] font-medium text-grayscale-200">
              {bookmark.domain}
            </span>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden">
          {previewTags.map((tag, index) => (
            <HomeTag key={`${tag}-${index}`} label={tag} />
          ))}
        </div>
      </div>

      <p className="self-end text-[12px] leading-[1.5] font-medium text-grayscale-100">
        {completedCount}/{bookmark.checklist.length} 완료
      </p>
    </Link>
  );
}

type CollectionCardProps = {
  tag: Tag & { count: number };
  count: number;
  sample: Bookmark;
};

function CollectionCard({ tag, count, sample }: CollectionCardProps) {
  const description = getBookmarkDescription(sample);
  const previewTags =
    sample.tags.length > 0
      ? sample.tags.slice(0, 3).map((sampleTag) => sampleTag.name)
      : DEFAULT_PREVIEW_TAGS;

  return (
    <Link
      to={ROUTES.collectionDetail(tag.id)}
      className="flex w-[160px] flex-col items-center gap-2"
    >
      <div className="relative h-[160px] w-full overflow-visible">
        <div className="absolute top-[19px] left-[18px] h-[86px] w-[119px] rounded-[9px] bg-grayscale-100" />
        <div className="absolute top-[13px] left-[18px] h-[34px] w-[76px] rounded-t-[9px] bg-grayscale-100" />

        <div className="absolute top-0 left-[18px] z-10 size-[125px] rotate-[15deg] rounded-lg bg-grayscale-white p-[11px]">
          <div className="flex size-full flex-col justify-between">
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="line-clamp-1 text-[12.5px] leading-[1.5] font-semibold text-grayscale-800">
                  {description}
                </p>
                <div className="flex min-w-0 items-center gap-1">
                  <SiteIcon className="size-[14px] shrink-0" />
                  <span className="truncate text-[11px] leading-[1.5] font-medium text-grayscale-200">
                    {sample.domain}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 overflow-hidden">
                {previewTags.map((sampleTag, index) => (
                  <HomeTag key={`${sampleTag}-${index}`} label={sampleTag} size="small" />
                ))}
              </div>
            </div>

            <div className="flex justify-between text-[8px] leading-[1.5] font-medium text-grayscale-100">
              <span>0/{sample.checklist.length} 완료</span>
              <span>2025/02/02</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[51px] left-0 z-20 h-[31px] w-[86px] rounded-t-[12px] bg-grayscale-050/60 backdrop-blur-[4px]" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-[84px] rounded-[12px] bg-gradient-to-b from-grayscale-000/55 via-grayscale-050/75 to-grayscale-050/90 shadow-[inset_0_1px_10px_rgba(255,255,255,0.72)] backdrop-blur-[6px]" />
      </div>

      <div className="flex items-center gap-1">
        <p className="text-[14px] leading-[1.5] font-semibold text-grayscale-800">
          {tag.name}
        </p>
        <span className="flex size-5 items-center justify-center rounded-full bg-grayscale-100 text-[12px] leading-[1.5] font-medium text-grayscale-000">
          {count}
        </span>
      </div>
    </Link>
  );
}

type EmptyStateProps = {
  message: string;
  className?: string;
};

function EmptyState({ message, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img
        src={emptyCharacter}
        alt=""
        className="h-[133px] w-[117px] object-contain"
      />
      <p className="text-[14px] leading-[1.5] font-semibold text-grayscale-300">
        {message}
      </p>
    </div>
  );
}

export function HomePage() {
  const [bookmarks] = useState<Bookmark[]>(() => getStoredBookmarks());
  const todayArchiveItems = bookmarks.slice(0, 2);
  const hasBookmarks = bookmarks.length > 0;
  const tagMap = new Map<string, Tag & { count: number }>();

  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      const currentTag = tagMap.get(tag.id);

      if (currentTag) {
        tagMap.set(tag.id, { ...currentTag, count: currentTag.count + 1 });
        return;
      }

      tagMap.set(tag.id, { ...tag, count: 1 });
    });
  });

  const collectionTags = Array.from(tagMap.values());
  const bookmarkByTagId = collectionTags.reduce<Record<string, Bookmark | undefined>>(
    (result, tag) => ({
      ...result,
      [tag.id]: bookmarks.find((bookmark) =>
        bookmark.tags.some((bookmarkTag) => bookmarkTag.id === tag.id),
      ),
    }),
    {},
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-grayscale-000 pb-[140px] text-grayscale-900">
      <header className="fixed top-0 right-0 left-0 z-40 mx-auto w-full max-w-[430px] bg-grayscale-000 px-5 pt-[60px]">
        <div className="flex h-[50px] items-center justify-between">
          <div>
            <p className="relative text-[40px] leading-[1.5] font-normal text-main">
              90점
              <ScoreUnderline />
            </p>
          </div>

          <div className="flex items-center gap-4 text-grayscale-800">
            <button
              type="button"
              className="flex size-6 items-center justify-center"
              aria-label="검색"
            >
              <SearchIcon />
            </button>
            <Link
              to={ROUTES.notifications}
              className="flex size-6 items-center justify-center"
              aria-label="알림"
            >
              <NotificationIcon />
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-[122px]">
        <section className="overflow-hidden">
          <div className="px-5">
            <h1 className="font-poppins text-[16px] leading-[1.5] font-semibold text-black">
              Today’s Archive
            </h1>
          </div>
          {todayArchiveItems.length > 0 ? (
            <div className="mt-[15px] flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {todayArchiveItems.map((bookmark) => (
                <ArchiveCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </div>
          ) : (
            <EmptyState
              message="추천 할 일이 없어요."
              className="mx-5 mt-[15px] h-[180px]"
            />
          )}
        </section>

        <section className="mt-5 px-5">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins text-[16px] leading-[1.5] font-semibold text-black">
              Collections
            </h2>
            <button
              type="button"
              className="flex size-6 items-center justify-center text-grayscale-800"
              aria-label="컬렉션 더보기"
            >
              <ArrowRightIcon />
            </button>
          </div>

          {hasBookmarks && collectionTags.length > 0 ? (
            <div className="mt-[15px] grid grid-cols-2 gap-x-[15px] gap-y-[15px]">
              {collectionTags.map((tag) => {
                const sampleBookmark = bookmarkByTagId[tag.id];

                if (!sampleBookmark) {
                  return null;
                }

                return (
                  <CollectionCard
                    key={tag.id}
                    tag={tag}
                    count={tag.count}
                    sample={sampleBookmark}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              message="북마크한 링크가 없어요."
              className="mt-[15px] h-[308px]"
            />
          )}
        </section>
      </div>
    </main>
  );
}
