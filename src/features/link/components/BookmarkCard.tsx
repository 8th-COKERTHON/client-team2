import { Link } from "react-router";

import { ROUTES } from "@/constants/routes";
import { TagBadge } from "@/features/link/components/TagBadge";
import type { Bookmark } from "@/features/link/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
  isEditMode?: boolean;
};

function SiteIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5 text-grayscale-100" aria-hidden="true">
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

function DeleteIcon() {
  return (
    <span className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-grayscale-050 text-grayscale-300">
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M7 7L17 17M17 7L7 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function BookmarkCard({ bookmark, isEditMode = false }: BookmarkCardProps) {
  const completedCount = bookmark.checklist.filter((item) => item.isCompleted).length;
  const checklistCount = bookmark.checklist.length;

  return (
    <Link
      to={ROUTES.linkDetail(bookmark.id)}
      className="relative flex aspect-square min-h-[161px] flex-col justify-between overflow-visible rounded-xl bg-grayscale-white p-4"
    >
      {isEditMode ? <DeleteIcon /> : null}

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="line-clamp-1 text-[18px] leading-[1.5] font-semibold text-grayscale-800">
            {bookmark.title}
          </h2>
          <div className="flex items-center gap-1">
            <SiteIcon />
            <span className="truncate text-[16px] leading-[1.5] font-medium text-grayscale-200">
              {bookmark.domain}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {bookmark.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      </div>

      <p className="self-end text-[12px] leading-[1.5] font-medium text-grayscale-100">
        {completedCount}/{checklistCount} 완료
      </p>
    </Link>
  );
}
