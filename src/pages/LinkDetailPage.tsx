import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

import { AppTopBar } from "@/components/ui/AppTopBar";
import { MobileScreen } from "@/components/ui/MobileScreen";
import { ROUTES } from "@/constants/routes";
import { getBookmarkDetail } from "@/features/link/api/bookmarkApi";
import {
  createChecklist,
  toggleChecklist,
} from "@/features/link/api/checklistApi";
import {
  getStoredBookmark,
  updateStoredBookmarkChecklist,
} from "@/features/link/api/localBookmarkStorage";
import { getMockBookmarkDetail } from "@/features/link/api/mockLinks";
import { TagBadge } from "@/features/link/components/TagBadge";
import type { Bookmark, ChecklistItem } from "@/features/link/types";
import {
  isServerId,
  mapBookmarkDetailResponseToBookmark,
} from "@/features/link/utils";
import { ScoreUnderline } from "@/features/user/components/GradeSummaryCard";

const MAX_CHECKLIST_COUNT = 5;
const CHECKLIST_SCORE_REWARD = 4;

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="text-grayscale-100 size-4"
      aria-hidden="true"
    >
      <path
        d="M4.5 2v2M11.5 2v2M3 6h10M3.5 3.5h9A1.5 1.5 0 0 1 14 5v7.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5V5a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M12 6v12M6 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M5.2 16.9 4.5 20l3.1-.7L18.2 8.7l-2.4-2.4L5.2 16.9ZM17.1 5l2.4 2.4.7-.7a1.7 1.7 0 0 0 0-2.4l-.1-.1a1.7 1.7 0 0 0-2.4 0l-.6.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M5.5 12.4 9.4 16.3 18.5 7.2"
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

function ChecklistNumberMark() {
  return (
    <svg
      viewBox="0 0 38 37"
      className="text-main pointer-events-none absolute top-1/2 left-1/2 size-[38px] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <path
        d="M8.6 28.4C4.1 23.8 4.7 15.3 10.1 10.5C15.7 5.5 25.2 6 29.2 12.4C32.8 18.2 29.7 26.8 23.2 30.1C16.7 33.3 8.3 31.2 5.3 24.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistTextUnderline() {
  return (
    <svg
      viewBox="0 0 110 8"
      preserveAspectRatio="none"
      className="text-main pointer-events-none absolute right-0 bottom-[6px] left-0 h-2"
      aria-hidden="true"
    >
      <path
        d="M1 5.2C16.8 3.5 33.9 3.1 48.5 3.7C65.7 4.4 82.3 2.4 109 3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LinkDetailLocationState = {
  shouldShowEditSuccessToast?: boolean;
};

export function LinkDetailPage() {
  const { linkId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as LinkDetailLocationState | null;
  const [bookmark, setBookmark] = useState<Bookmark | null>(() => {
    if (!linkId) {
      return null;
    }

    return getStoredBookmark(linkId) ?? getMockBookmarkDetail(linkId) ?? null;
  });
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    () => bookmark?.checklist ?? [],
  );
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(() =>
    linkId ? isServerId(linkId) : false,
  );
  const [draftTitle, setDraftTitle] = useState("");
  const [isEditingChecklist, setIsEditingChecklist] = useState(false);
  const [pendingChecklistIds, setPendingChecklistIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [checklistErrorMessage, setChecklistErrorMessage] = useState("");
  const [showEditSuccessToast, setShowEditSuccessToast] = useState(() =>
    Boolean(locationState?.shouldShowEditSuccessToast),
  );
  const completedCount = useMemo(
    () => checklist.filter((item) => item.isCompleted).length,
    [checklist],
  );
  const canAddChecklist = checklist.length < MAX_CHECKLIST_COUNT;

  useEffect(() => {
    if (!linkId || !isServerId(linkId)) {
      return;
    }

    const targetLinkId = linkId;
    let isMounted = true;

    async function fetchBookmarkDetail(): Promise<void> {
      setIsLoadingBookmark(true);

      try {
        const response = await getBookmarkDetail(targetLinkId);
        const nextBookmark = mapBookmarkDetailResponseToBookmark(response);

        if (isMounted) {
          setBookmark(nextBookmark);
          setChecklist(nextBookmark.checklist);
        }
      } catch {
        const fallbackBookmark =
          getStoredBookmark(targetLinkId) ??
          getMockBookmarkDetail(targetLinkId) ??
          null;

        if (isMounted) {
          setBookmark(fallbackBookmark);
          setChecklist(fallbackBookmark?.checklist ?? []);
        }
      } finally {
        if (isMounted) {
          setIsLoadingBookmark(false);
        }
      }
    }

    void fetchBookmarkDetail();

    return () => {
      isMounted = false;
    };
  }, [linkId]);

  useEffect(() => {
    if (!locationState?.shouldShowEditSuccessToast) {
      return;
    }

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, locationState?.shouldShowEditSuccessToast, navigate]);

  useEffect(() => {
    if (!showEditSuccessToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowEditSuccessToast(false);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [showEditSuccessToast]);

  if (isLoadingBookmark && !bookmark) {
    return (
      <MobileScreen>
        <AppTopBar title="링크 상세" />
        <div className="px-5 pt-20 text-center">
          <p className="typo-kr-body-medium text-grayscale-300">
            링크를 불러오는 중이에요.
          </p>
        </div>
      </MobileScreen>
    );
  }

  if (!bookmark) {
    return (
      <MobileScreen>
        <AppTopBar title="링크 상세" />
        <div className="px-5 pt-20 text-center">
          <p className="typo-kr-body-medium text-grayscale-300">
            링크를 찾을 수 없어요.
          </p>
          <Link
            to={ROUTES.home}
            className="bg-main text-grayscale-white mt-5 inline-flex rounded-xl px-5 py-3"
          >
            홈으로 이동
          </Link>
        </div>
      </MobileScreen>
    );
  }

  const handleToggleChecklistItem = (itemId: string): void => {
    if (pendingChecklistIds.has(itemId)) {
      return;
    }

    const targetItem = checklist.find((item) => item.id === itemId);

    if (!targetItem) {
      return;
    }

    const previousIsCompleted = targetItem.isCompleted;
    const nextIsCompleted = !previousIsCompleted;

    setChecklistErrorMessage("");
    setChecklist((current) => {
      const nextChecklist = current.map((item) =>
        item.id === itemId ? { ...item, isCompleted: nextIsCompleted } : item,
      );

      if (bookmark && !isServerId(bookmark.id)) {
        updateStoredBookmarkChecklist(bookmark.id, nextChecklist);
      }

      return nextChecklist;
    });

    if (isServerId(bookmark.id) && isServerId(itemId)) {
      setPendingChecklistIds((current) => new Set(current).add(itemId));

      void toggleChecklist(bookmark.id, itemId)
        .then((updatedChecklist) => {
          setChecklist((current) =>
            current.map((item) =>
              item.id === itemId
                ? { ...item, isCompleted: updatedChecklist.isChecked }
                : item,
            ),
          );
        })
        .catch(() => {
          setChecklist((current) =>
            current.map((item) =>
              item.id === itemId
                ? { ...item, isCompleted: previousIsCompleted }
                : item,
            ),
          );
          setChecklistErrorMessage(
            "체크 상태를 변경하지 못했어요. 잠시 후 다시 시도해 주세요.",
          );
        })
        .finally(() => {
          setPendingChecklistIds((current) => {
            const nextPendingIds = new Set(current);
            nextPendingIds.delete(itemId);
            return nextPendingIds;
          });
        });
    }
  };

  const handleAddChecklistItem = (): void => {
    const title = draftTitle.trim();

    if (!title || !canAddChecklist) {
      return;
    }

    setChecklistErrorMessage("");

    const newChecklistItem: ChecklistItem = {
      id: `local-${Date.now()}`,
      title,
      isCompleted: false,
    };

    setChecklist((current) => {
      const nextChecklist = [...current, newChecklistItem];

      if (bookmark && !isServerId(bookmark.id)) {
        updateStoredBookmarkChecklist(bookmark.id, nextChecklist);
      }

      return nextChecklist;
    });
    setDraftTitle("");

    if (isServerId(bookmark.id)) {
      void createChecklist(Number(bookmark.id), { content: title })
        .then((createdChecklist) => {
          setChecklist((current) =>
            current.map((item) =>
              item.id === newChecklistItem.id
                ? {
                    id: String(createdChecklist.checklistId),
                    title: createdChecklist.content,
                    isCompleted: createdChecklist.isChecked,
                  }
                : item,
            ),
          );
        })
        .catch(() => {
          setChecklist((current) =>
            current.filter((item) => item.id !== newChecklistItem.id),
          );
          setChecklistErrorMessage(
            "체크리스트 항목을 추가하지 못했어요. 잠시 후 다시 시도해 주세요.",
          );
        });
    }
  };

  const handleAddChecklistFromEnter = (
    event: KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleAddChecklistItem();
  };

  const renderChecklistItem = (item: ChecklistItem, index: number) => {
    const isPending = pendingChecklistIds.has(item.id);

    return (
      <li
        key={item.id}
        className="relative flex min-h-[30px] items-center justify-between text-[16px] leading-[1.5] font-medium"
      >
        <button
          type="button"
          onClick={() => handleToggleChecklistItem(item.id)}
          disabled={isPending}
          className="relative min-w-0 flex-1 text-left text-[#1c1c1a] disabled:opacity-60"
        >
          <span className="relative mr-1 inline-flex min-w-5 justify-center">
            {item.isCompleted && !isEditingChecklist ? (
              <ChecklistNumberMark />
            ) : null}
            <span className="relative">{index + 1}.</span>
          </span>
          <span className="relative inline-block">
            {item.title}
            {item.isCompleted && !isEditingChecklist ? (
              <ChecklistTextUnderline />
            ) : null}
          </span>
        </button>
        {item.isCompleted && !isEditingChecklist ? (
          <span className="font-hakgyo text-main ml-3 shrink-0 text-[20px] leading-[1.5] font-normal tracking-[-0.6px]">
            {CHECKLIST_SCORE_REWARD}점
          </span>
        ) : null}
      </li>
    );
  };

  return (
    <MobileScreen>
      <AppTopBar
        title={bookmark.title}
        rightSlot={
          <Link
            to={ROUTES.linkEdit(bookmark.id)}
            className="text-grayscale-200 flex size-6 items-center justify-center"
            aria-label="링크 수정"
          >
            <PencilIcon />
          </Link>
        }
      />

      <section className="px-5 pt-[13px]">
        <div className="relative h-[71px]">
          <p className="font-hakgyo text-main absolute top-0 left-0 text-[40px] leading-[1.5] font-normal">
            {bookmark.score}점
            <ScoreUnderline />
          </p>
        </div>
      </section>

      <section className="mt-5 px-5">
        <div className="bg-grayscale-white rounded-xl p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-grayscale-200 text-[16px] leading-[1.5] font-medium">
                저장 목적
              </p>
              <div className="flex items-center gap-1">
                <CalendarIcon />
                <time className="text-grayscale-100 text-[12px] leading-[1.5] font-medium">
                  {bookmark.reminderAt}
                </time>
              </div>
            </div>
            <h2 className="text-[18px] leading-[1.5] font-semibold text-[#1c1c1a]">
              {bookmark.purpose}
            </h2>
          </div>

          <div className="mt-2.5 flex gap-2.5">
            {bookmark.tags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-3 px-5">
        <p className="text-grayscale-300 mb-1 text-[16px] leading-[1.5] font-medium">
          링크 URL
        </p>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noreferrer"
          className="bg-grayscale-050 text-main block h-12 overflow-hidden rounded-xl px-5 py-[13px] text-[14px] leading-[1.5] font-medium underline"
        >
          <span className="block truncate">{bookmark.url}</span>
        </a>
      </section>

      <section className="mt-4 px-5 pb-6">
        <div className="bg-grayscale-white rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-grayscale-200 text-[16px] leading-[1.5] font-medium">
                체크리스트
              </h2>
              <p className="text-grayscale-100 text-[12px] leading-[1.5] font-medium">
                {completedCount}/{checklist.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditingChecklist((current) => !current)}
              className={`flex size-6 items-center justify-center ${
                isEditingChecklist ? "text-main" : "text-grayscale-200"
              }`}
              aria-label={
                isEditingChecklist ? "체크리스트 수정 완료" : "체크리스트 수정"
              }
            >
              {isEditingChecklist ? <CheckIcon /> : <PencilIcon />}
            </button>
          </div>

          <ol className="mt-2.5 flex flex-col gap-2">
            {checklist.map(renderChecklistItem)}
          </ol>

          {checklistErrorMessage ? (
            <p
              className="text-error mt-2 text-[12px] leading-[1.5] font-medium"
              role="alert"
              aria-live="polite"
            >
              {checklistErrorMessage}
            </p>
          ) : null}

          {isEditingChecklist && canAddChecklist ? (
            <div className="mt-2 flex items-center gap-2 pl-6">
              <input
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                onKeyDown={handleAddChecklistFromEnter}
                placeholder="새 항목 추가 (최대 5개)"
                className="text-grayscale-200 placeholder:text-grayscale-200 min-w-0 flex-1 bg-transparent text-[16px] leading-[1.5] font-medium outline-none"
                aria-label="새 체크리스트 항목"
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                disabled={!draftTitle.trim()}
                className="bg-main-100 text-main disabled:text-grayscale-100 flex size-6 shrink-0 items-center justify-center rounded-full"
                aria-label="체크리스트 항목 추가"
              >
                <AddIcon />
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {showEditSuccessToast ? (
        <div className="fixed right-5 bottom-[144px] left-5 z-40 mx-auto flex max-w-[390px] items-center gap-2 rounded-lg border border-[#71e3bb] bg-[#dcf8ee] px-[17px] py-[13px] text-[#3eb088]">
          <SuccessIcon />
          <p className="text-[14px] leading-[1.5] font-semibold">
            북마크가 수정되었어요
          </p>
        </div>
      ) : null}
    </MobileScreen>
  );
}
