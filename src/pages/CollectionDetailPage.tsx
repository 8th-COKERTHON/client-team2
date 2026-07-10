import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import { AppTopBar } from "@/components/ui/AppTopBar";
import { MobileScreen } from "@/components/ui/MobileScreen";
import {
  deleteStoredBookmark,
  getStoredBookmarks,
  getStoredBookmarksByTag,
  markStoredBookmarkAsViewed,
} from "@/features/link/api/localBookmarkStorage";
import { BookmarkCard } from "@/features/link/components/BookmarkCard";
import type { Bookmark } from "@/features/link/types";

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M5.5 7h13M9 10.5v6M15 10.5v6M7 7l.75 12A1.5 1.5 0 0 0 9.25 20h5.5a1.5 1.5 0 0 0 1.5-1.41L17 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M6 6 18 18M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M5 12.5 9.5 17 19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="M7 12.5 10.5 16 17 8.5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getBookmarkDescription(bookmark: Bookmark): string {
  return bookmark.purpose.trim() || bookmark.title.trim();
}

export function CollectionDetailPage() {
  const { tagId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    getStoredBookmarksByTag(tagId ?? ""),
  );
  const [deleteTarget, setDeleteTarget] = useState<Bookmark | null>(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const isCurrentTag = (storedTagId: string): boolean =>
    storedTagId === tagId || decodeURIComponent(storedTagId) === tagId;
  const tagName =
    bookmarks[0]?.tags.find((tag) => isCurrentTag(tag.id))?.name ??
    getStoredBookmarks()
      .flatMap((bookmark) => bookmark.tags)
      .find((tag) => isCurrentTag(tag.id))?.name ??
    decodeURIComponent(tagId ?? "태그");
  const sortedBookmarks = useMemo(
    () =>
      [...bookmarks].sort((firstBookmark, secondBookmark) => {
        if (Boolean(firstBookmark.viewedAt) !== Boolean(secondBookmark.viewedAt)) {
          return firstBookmark.viewedAt ? 1 : -1;
        }

        return 0;
      }),
    [bookmarks],
  );

  useEffect(() => {
    if (!showDeleteToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowDeleteToast(false);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [showDeleteToast]);

  const handleOpenBookmark = (bookmarkId: string): void => {
    const viewedBookmark = markStoredBookmarkAsViewed(bookmarkId);

    if (!viewedBookmark) {
      return;
    }

    setBookmarks((current) =>
      current.map((bookmark) =>
        bookmark.id === bookmarkId ? viewedBookmark : bookmark,
      ),
    );
  };

  const handleDeleteBookmark = (): void => {
    if (!deleteTarget) {
      return;
    }

    deleteStoredBookmark(deleteTarget.id);
    setBookmarks((current) =>
      current.filter((bookmark) => bookmark.id !== deleteTarget.id),
    );
    setDeleteTarget(null);
    setShowDeleteToast(true);
  };

  return (
    <MobileScreen>
      <AppTopBar
        title={tagName}
        leftSlot={
          isEditMode ? (
            <button
              type="button"
              onClick={() => {
                setDeleteTarget(null);
                setIsEditMode(false);
              }}
              className="flex size-6 items-center justify-center text-grayscale-200"
              aria-label="태그 편집 취소"
            >
              <CloseIcon />
            </button>
          ) : undefined
        }
        rightSlot={
          <button
            type="button"
            onClick={() => setIsEditMode((current) => !current)}
            className={`flex size-6 items-center justify-center ${
              isEditMode ? "text-main" : "text-grayscale-200"
            }`}
            aria-label={isEditMode ? "태그 편집 종료" : "태그 항목 편집"}
          >
            {isEditMode ? <CheckIcon /> : <TrashIcon />}
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-x-[13px] gap-y-3 px-5 pt-5 pb-[140px]">
        {sortedBookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            isEditMode={isEditMode}
            onClick={() => handleOpenBookmark(bookmark.id)}
            onRequestDelete={setDeleteTarget}
          />
        ))}
      </section>

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-bookmark-title"
            className="w-full max-w-[335px] rounded-xl bg-grayscale-white p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <h2
              id="delete-bookmark-title"
              className="text-[18px] leading-[1.5] font-semibold text-grayscale-800"
            >
              링크를 삭제할까요?
            </h2>
            <p className="mt-2 text-[14px] leading-[1.5] font-medium text-grayscale-200">
              {getBookmarkDescription(deleteTarget)}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="h-12 rounded-xl bg-grayscale-050 text-[16px] leading-[1.5] font-medium text-grayscale-300"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDeleteBookmark}
                className="h-12 rounded-xl bg-main text-[16px] leading-[1.5] font-medium text-grayscale-white"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showDeleteToast ? (
        <div className="fixed right-5 bottom-[144px] left-5 z-40 mx-auto flex max-w-[390px] items-center gap-2 rounded-lg border border-[#71e3bb] bg-[#dcf8ee] px-[17px] py-[13px] text-[#3eb088]">
          <SuccessIcon />
          <p className="text-[14px] leading-[1.5] font-semibold">
            삭제가 완료되었어요
          </p>
        </div>
      ) : null}
    </MobileScreen>
  );
}
