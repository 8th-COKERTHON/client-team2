import { Link } from "react-router";

import { ROUTES } from "@/constants/routes";
import { MOCK_BOOKMARKS, MOCK_TAGS } from "@/features/link/api/mockLinks";
import type { Bookmark, Tag } from "@/features/link/types";

const TODAY_ARCHIVE_ITEMS = MOCK_BOOKMARKS.slice(0, 2);
const COLLECTION_TAGS = [
  ...MOCK_TAGS,
  { id: "tag-3", name: "태그3" },
  { id: "tag-4", name: "태그4" },
] satisfies Tag[];
const HOME_TAGS = ["tag-1", "tag-2", "tag-3"];

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

function HomeTag({ size = "default" }: { size?: "default" | "small" }) {
  const isSmall = size === "small";

  return (
    <span
      className={`shrink-0 rounded-md bg-main-100 text-center font-medium text-main-300 ${
        isSmall
          ? "w-[34px] px-[2px] py-px text-[9.72px] leading-[1.5]"
          : "w-11 px-1 py-0.5 text-[14px] leading-[1.5]"
      }`}
    >
      # 태그
    </span>
  );
}

type ArchiveCardProps = {
  bookmark: Bookmark;
};

function ArchiveCard({ bookmark }: ArchiveCardProps) {
  const completedCount = bookmark.checklist.filter((item) => item.isCompleted).length;

  return (
    <Link
      to={ROUTES.linkDetail(bookmark.id)}
      className="flex size-[180px] shrink-0 flex-col justify-between rounded-xl bg-grayscale-white p-4"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="line-clamp-1 text-[18px] leading-[1.5] font-semibold text-grayscale-800">
            링크 제목
          </h2>
          <div className="flex items-center gap-1">
            <SiteIcon />
            <span className="truncate text-[16px] leading-[1.5] font-medium text-grayscale-200">
              {bookmark.domain}
            </span>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden">
          {HOME_TAGS.map((tag) => (
            <HomeTag key={tag} />
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
  tag: Tag;
  count: number;
  sample: Bookmark;
};

function CollectionCard({ tag, count, sample }: CollectionCardProps) {
  return (
    <Link
      to={ROUTES.collectionDetail(tag.id)}
      className="flex w-[160px] flex-col items-center gap-2"
    >
      <div className="relative h-[160px] w-full overflow-hidden">
        <div className="absolute top-3.5 left-2.5 size-[125px] rounded-lg bg-grayscale-100" />
        <div className="absolute top-0 left-1 size-[153px] rotate-[15deg]">
          <div className="flex size-[125px] flex-col justify-between rounded-lg bg-grayscale-white p-[11px]">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <p className="line-clamp-1 text-[12.5px] leading-[1.5] font-semibold text-grayscale-800">
                  링크 제목
                </p>
                <div className="flex items-center gap-1">
                  <SiteIcon className="size-[14px]" />
                  <span className="truncate text-[11px] leading-[1.5] font-medium text-grayscale-200">
                    {sample.domain}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                {HOME_TAGS.map((sampleTag) => (
                  <HomeTag key={sampleTag} size="small" />
                ))}
              </div>
            </div>

            <div className="flex justify-between text-[8px] leading-[1.5] font-medium text-grayscale-100">
              <span>0/{sample.checklist.length} 완료</span>
              <span>2025/02/02</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[113px] bg-gradient-to-t from-grayscale-000 via-grayscale-000/95 to-grayscale-000/0" />
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

export function HomePage() {
  const sampleBookmark = MOCK_BOOKMARKS[0];

  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-grayscale-000 pb-[140px] text-grayscale-900">
      <header className="fixed top-0 right-0 left-0 z-40 mx-auto w-full max-w-[430px] bg-grayscale-000 px-5 pt-[60px]">
        <div className="flex h-[50px] items-center justify-between">
          <div className="relative">
            <p className="text-[40px] leading-[1.5] font-normal text-main">
              90점
            </p>
            <span className="absolute bottom-2 left-0 h-2 w-24 rounded-full bg-main-100" />
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
          <div className="mt-[15px] flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TODAY_ARCHIVE_ITEMS.map((bookmark) => (
              <ArchiveCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
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

          <div className="mt-[15px] grid grid-cols-2 gap-x-[15px] gap-y-[15px]">
            {COLLECTION_TAGS.map((tag) => (
              <CollectionCard
                key={tag.id}
                tag={tag}
                count={4}
                sample={sampleBookmark}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
