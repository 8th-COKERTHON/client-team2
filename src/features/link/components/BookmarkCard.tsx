import { Link } from "react-router";

import { ROUTES } from "@/constants/routes";
import { TagBadge } from "@/features/link/components/TagBadge";
import type { Bookmark } from "@/features/link/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
  isEditMode?: boolean;
  onClick?: () => void;
  onRequestDelete?: (bookmark: Bookmark) => void;
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
    <span className="flex size-6 items-center justify-center rounded-full bg-grayscale-050 text-grayscale-200">
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M6 12H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function getBookmarkDescription(bookmark: Bookmark): string {
  return bookmark.purpose.trim() || bookmark.title.trim();
}

export function BookmarkCard({
  bookmark,
  isEditMode = false,
  onClick,
  onRequestDelete,
}: BookmarkCardProps) {
  const completedCount = bookmark.checklist.filter((item) => item.isCompleted).length;
  const checklistCount = bookmark.checklist.length;
  const isViewed = Boolean(bookmark.viewedAt);
  const description = getBookmarkDescription(bookmark);
  const cardClassName = `relative flex aspect-square min-h-[161px] flex-col justify-between overflow-visible rounded-xl p-4 ${
    isViewed ? "bg-grayscale-050" : "bg-grayscale-white"
  }`;
  const tagTone = isViewed ? "muted" : "default";

  const content = (
    <>
      {isEditMode ? (
        <button
          type="button"
          onClick={() => onRequestDelete?.(bookmark)}
          className="absolute -top-1.5 -right-1.5 z-10"
          aria-label={`${description} 삭제`}
        >
          <DeleteIcon />
        </button>
      ) : null}

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

        <div className="flex flex-wrap gap-1">
          {bookmark.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag.id} tag={tag} tone={tagTone} />
          ))}
        </div>
      </div>

      <p className="self-end text-[12px] leading-[1.5] font-medium text-grayscale-100">
        {completedCount}/{checklistCount} 완료
      </p>
    </>
  );

  if (isEditMode) {
    return <article className={cardClassName}>{content}</article>;
  }

  return (
    <Link
      to={ROUTES.linkDetail(bookmark.id)}
      onClick={onClick}
      className={cardClassName}
    >
      {content}
    </Link>
  );
}
