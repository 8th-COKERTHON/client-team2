import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { AppTopBar, MoreIcon } from "@/components/ui/AppTopBar";
import { MobileScreen } from "@/components/ui/MobileScreen";
import { ROUTES } from "@/constants/routes";
import { getMockBookmarkDetail } from "@/features/link/api/mockLinks";
import { TagBadge } from "@/features/link/components/TagBadge";
import type { ChecklistItem } from "@/features/link/types";

const MAX_CHECKLIST_COUNT = 5;

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 text-grayscale-100" aria-hidden="true">
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

export function LinkDetailPage() {
  const { linkId } = useParams();
  const bookmark = getMockBookmarkDetail(linkId ?? "");
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    () => bookmark?.checklist ?? [],
  );
  const [draftTitle, setDraftTitle] = useState("");
  const completedCount = useMemo(
    () => checklist.filter((item) => item.isCompleted).length,
    [checklist],
  );
  const canAddChecklist = checklist.length < MAX_CHECKLIST_COUNT;

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
            className="mt-5 inline-flex rounded-xl bg-main px-5 py-3 text-grayscale-white"
          >
            홈으로 이동
          </Link>
        </div>
      </MobileScreen>
    );
  }

  const handleToggleChecklistItem = (itemId: string): void => {
    setChecklist((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };

  const handleAddChecklistItem = (): void => {
    const title = draftTitle.trim();

    if (!title || !canAddChecklist) {
      return;
    }

    setChecklist((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        title,
        isCompleted: false,
      },
    ]);
    setDraftTitle("");
  };

  return (
    <MobileScreen>
      <AppTopBar
        title={bookmark.title}
        rightSlot={
          <button
            type="button"
            className="flex size-6 items-center justify-center"
            aria-label="링크 수정 메뉴"
          >
            <MoreIcon />
          </button>
        }
      />

      <section className="px-5 pt-[13px]">
        <div className="relative h-[71px]">
          <p className="absolute top-0 left-0 text-[40px] leading-[1.5] font-normal text-main">
            {bookmark.score}점
          </p>
          <span className="absolute top-[51px] left-0 h-2 w-[119px] rounded-full bg-main-200" />
          <span className="absolute top-[42px] left-2 h-3 w-[88px] rounded-full bg-main-100" />
        </div>
      </section>

      <section className="mt-5 px-5">
        <div className="rounded-xl bg-grayscale-white p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[16px] leading-[1.5] font-medium text-grayscale-200">
                저장 목적
              </p>
              <div className="flex items-center gap-1">
                <CalendarIcon />
                <time className="text-[12px] leading-[1.5] font-medium text-grayscale-100">
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
        <p className="mb-1 text-[16px] leading-[1.5] font-medium text-grayscale-300">
          링크 URL
        </p>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noreferrer"
          className="block h-12 overflow-hidden rounded-xl bg-grayscale-050 px-5 py-[13px] text-[14px] leading-[1.5] font-medium text-main underline"
        >
          <span className="block truncate">{bookmark.url}</span>
        </a>
      </section>

      <section className="mt-4 px-5 pb-6">
        <div className="rounded-xl bg-grayscale-white p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] leading-[1.5] font-medium text-grayscale-200">
                체크리스트
              </h2>
              <p className="text-[12px] leading-[1.5] font-medium text-grayscale-100">
                {completedCount}/{checklist.length}
              </p>
            </div>
            <MoreIcon />
          </div>

          <ol className="mt-2.5 flex list-decimal flex-col gap-2 pl-6">
            {checklist.map((item) => (
              <li key={item.id} className="text-[16px] leading-[1.5] font-medium">
                <button
                  type="button"
                  onClick={() => handleToggleChecklistItem(item.id)}
                  className={`text-left ${
                    item.isCompleted
                      ? "text-grayscale-100 line-through"
                      : "text-[#1c1c1a]"
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ol>

          {canAddChecklist ? (
            <div className="mt-2 flex items-center gap-2 pl-6">
              <input
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="새 항목 추가 (최대 5개)"
                className="min-w-0 flex-1 bg-transparent text-[16px] leading-[1.5] font-medium text-grayscale-200 outline-none placeholder:text-grayscale-200"
                aria-label="새 체크리스트 항목"
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                disabled={!draftTitle.trim()}
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-main-100 text-main disabled:text-grayscale-100"
                aria-label="체크리스트 항목 추가"
              >
                <AddIcon />
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </MobileScreen>
  );
}
