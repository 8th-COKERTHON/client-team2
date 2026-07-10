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
  const completedCount = sample.checklist.filter((item) => item.isCompleted).length;
  const previewTags =
    sample.tags.length > 0
      ? sample.tags.slice(0, 3).map((sampleTag) => sampleTag.name)
      : DEFAULT_PREVIEW_TAGS;

  return (
    <Link
      to={ROUTES.collectionDetail(tag.id)}
      className="flex w-[160px] flex-col items-center gap-2"
    >
      <div className="relative h-[160px] w-full overflow-hidden">
        <div className="absolute top-3.5 left-2.5 size-[125px] rounded-lg bg-grayscale-100" />

        <div className="absolute top-0 left-1 flex size-[153px] items-center justify-center">
          <div className="size-[125px] rotate-[15deg] overflow-hidden rounded-[8.33px] bg-grayscale-white p-[11px]">
            <div className="flex size-full flex-col justify-between">
              <div className="flex min-w-0 flex-col gap-[8.33px]">
                <div className="flex min-w-0 flex-col gap-[1.39px]">
                  <p className="line-clamp-1 text-[12.5px] leading-[1.5] font-semibold tracking-[-0.31px] text-grayscale-800">
                    {description}
                  </p>
                  <div className="flex min-w-0 items-center gap-[2.78px]">
                    <SiteIcon className="size-[13.89px] shrink-0" />
                    <span className="truncate text-[11.11px] leading-[1.5] font-medium tracking-[-0.28px] text-grayscale-200">
                      {sample.domain}
                    </span>
                  </div>
                </div>
                <div className="flex gap-[2.78px] overflow-hidden">
                  {previewTags.map((sampleTag, index) => (
                    <HomeTag
                      key={`${sampleTag}-${index}`}
                      label={sampleTag}
                      size="small"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-[8.33px] leading-[1.5] font-medium tracking-[-0.21px] text-grayscale-100">
                <span>
                  {completedCount}/{sample.checklist.length} 완료
                </span>
                <span>2025/02/02</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[66px] left-0 z-20 h-[94px] w-full overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.56)_0%,rgba(246,246,246,0.82)_55%,rgba(233,233,233,0.92)_100%)] shadow-[inset_0_1px_10px_rgba(255,255,255,0.85)] backdrop-blur-[6px]">
          <div className="absolute top-[-28px] left-[31px] h-[70px] w-[76px] rounded-full bg-white/70 blur-[18px]" />
          <div className="absolute right-[28px] bottom-[13px] h-[30px] w-[65px] rounded-full bg-grayscale-100/35 blur-[12px]" />
          <div className="absolute bottom-[8px] left-[15px] h-[17px] w-[78px] rounded-full bg-grayscale-100/30 blur-[10px]" />
        </div>
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
