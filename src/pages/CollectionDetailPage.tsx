import { useState } from "react";
import { useParams } from "react-router";

import { AppTopBar, MoreIcon } from "@/components/ui/AppTopBar";
import { MobileScreen } from "@/components/ui/MobileScreen";
import {
  getStoredBookmarks,
  getStoredBookmarksByTag,
} from "@/features/link/api/localBookmarkStorage";
import { BookmarkCard } from "@/features/link/components/BookmarkCard";

export function CollectionDetailPage() {
  const { tagId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const bookmarks = getStoredBookmarksByTag(tagId ?? "");
  const isCurrentTag = (storedTagId: string): boolean =>
    storedTagId === tagId || decodeURIComponent(storedTagId) === tagId;
  const tagName =
    bookmarks[0]?.tags.find((tag) => isCurrentTag(tag.id))?.name ??
    getStoredBookmarks()
      .flatMap((bookmark) => bookmark.tags)
      .find((tag) => isCurrentTag(tag.id))?.name ??
    decodeURIComponent(tagId ?? "태그");

  return (
    <MobileScreen>
      <AppTopBar
        title={tagName}
        rightSlot={
          <button
            type="button"
            onClick={() => setIsEditMode((current) => !current)}
            className="flex size-6 items-center justify-center"
            aria-label={isEditMode ? "태그 편집 종료" : "태그 항목 편집"}
          >
            <MoreIcon />
          </button>
        }
      />

      <section className="grid grid-cols-2 gap-x-[13px] gap-y-3 px-5 pt-5 pb-6">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            isEditMode={isEditMode}
          />
        ))}
      </section>
    </MobileScreen>
  );
}
