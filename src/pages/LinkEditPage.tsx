import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { MobileScreen } from "@/components/ui/MobileScreen";
import { ROUTES } from "@/constants/routes";
import {
  getBookmarkDetail,
  updateBookmark as updateBookmarkApi,
} from "@/features/link/api/bookmarkApi";
import {
  getStoredBookmark,
  updateStoredBookmark,
} from "@/features/link/api/localBookmarkStorage";
import { getMockBookmarkDetail } from "@/features/link/api/mockLinks";
import type { Bookmark } from "@/features/link/types";
import {
  createReminderDateTime,
  isServerId,
  mapBookmarkDetailResponseToBookmark,
} from "@/features/link/utils";

const MAX_TAG_COUNT = 5;
const DEFAULT_REMINDER_TIME = "09:00";

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M15 5 8 12l7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3M4.5 9h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7.5V12l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
      <path
        d="M4.5 4.5 11.5 11.5M11.5 4.5 4.5 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

type FieldLabelProps = {
  label: string;
  helper?: string;
  isRequired?: boolean;
};

function FieldLabel({ label, helper, isRequired = false }: FieldLabelProps) {
  return (
    <div className="flex gap-1 text-[16px] leading-[1.5] font-medium">
      <label className="text-grayscale-300">{label}</label>
      {isRequired ? <span className="text-main-sub">(필수)</span> : null}
      {helper ? <span className="text-main-sub">{helper}</span> : null}
    </div>
  );
}

type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  type?: "text" | "url";
};

function TextField({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
}: TextFieldProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={label}
      className="h-12 w-full rounded-xl bg-grayscale-050 px-5 text-[14px] leading-[1.5] font-medium text-grayscale-800 outline-none placeholder:text-grayscale-200"
    />
  );
}

function normalizeTag(tag: string): string {
  return tag.trim().replace(/^#+/, "").trim();
}

function appendTag(tags: string[], draft: string): string[] {
  const nextTag = normalizeTag(draft);

  if (!nextTag || tags.includes(nextTag) || tags.length >= MAX_TAG_COUNT) {
    return tags;
  }

  return [...tags, nextTag];
}

function splitReminderAt(reminderAt: string): { date: string; time: string } {
  const [date = "", rawTime = ""] = reminderAt.includes("T")
    ? reminderAt.split("T")
    : reminderAt.split(" ");
  const time = rawTime.slice(0, 5);

  return {
    date,
    time: time || DEFAULT_REMINDER_TIME,
  };
}

function getBookmarkDescription(bookmark: Bookmark): string {
  return bookmark.purpose.trim() || bookmark.title.trim();
}

export function LinkEditPage() {
  const { linkId } = useParams();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState<Bookmark | null>(() => {
    if (!linkId) {
      return null;
    }

    return getStoredBookmark(linkId) ?? getMockBookmarkDetail(linkId) ?? null;
  });
  const reminder = splitReminderAt(bookmark?.reminderAt ?? "");
  const [url, setUrl] = useState(() => bookmark?.url ?? "");
  const [title, setTitle] = useState(() =>
    bookmark ? getBookmarkDescription(bookmark) : "",
  );
  const [reminderDate, setReminderDate] = useState(reminder.date);
  const [reminderTime, setReminderTime] = useState(reminder.time);
  const [tags, setTags] = useState<string[]>(
    () => bookmark?.tags.map((tag) => tag.name) ?? [],
  );
  const [tagDraft, setTagDraft] = useState("");
  const [isComposingTag, setIsComposingTag] = useState(false);
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(() =>
    linkId ? isServerId(linkId) : false,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const canSubmit =
    title.trim().length > 0 &&
    reminderDate.trim().length > 0 &&
    reminderTime.trim().length > 0 &&
    !isSubmitting;
  const canAddTag = tagDraft.trim().length > 0 && tags.length < MAX_TAG_COUNT;

  useEffect(() => {
    if (!linkId || !isServerId(linkId)) {
      return;
    }

    const targetLinkId = linkId;
    let isMounted = true;

    async function fetchBookmark(): Promise<void> {
      setIsLoadingBookmark(true);

      try {
        const response = await getBookmarkDetail(targetLinkId);
        const nextBookmark = mapBookmarkDetailResponseToBookmark(response);
        const nextReminder = splitReminderAt(nextBookmark.reminderAt);

        if (isMounted) {
          setBookmark(nextBookmark);
          setUrl(nextBookmark.url);
          setTitle(getBookmarkDescription(nextBookmark));
          setReminderDate(nextReminder.date);
          setReminderTime(nextReminder.time);
          setTags(nextBookmark.tags.map((tag) => tag.name));
        }
      } catch {
        const fallbackBookmark =
          getStoredBookmark(targetLinkId) ??
          getMockBookmarkDetail(targetLinkId) ??
          null;
        const fallbackReminder = splitReminderAt(
          fallbackBookmark?.reminderAt ?? "",
        );

        if (isMounted) {
          setBookmark(fallbackBookmark);
          setUrl(fallbackBookmark?.url ?? "");
          setTitle(
            fallbackBookmark ? getBookmarkDescription(fallbackBookmark) : "",
          );
          setReminderDate(fallbackReminder.date);
          setReminderTime(fallbackReminder.time);
          setTags(fallbackBookmark?.tags.map((tag) => tag.name) ?? []);
        }
      } finally {
        if (isMounted) {
          setIsLoadingBookmark(false);
        }
      }
    }

    void fetchBookmark();

    return () => {
      isMounted = false;
    };
  }, [linkId]);

  if (isLoadingBookmark && !bookmark) {
    return (
      <MobileScreen>
        <div className="px-5 pt-20 text-center">
          <p className="typo-kr-body-medium text-grayscale-300">
            수정할 링크를 불러오는 중이에요.
          </p>
        </div>
      </MobileScreen>
    );
  }

  if (!bookmark) {
    return (
      <MobileScreen>
        <div className="px-5 pt-20 text-center">
          <p className="typo-kr-body-medium text-grayscale-300">
            수정할 링크를 찾을 수 없어요.
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

  const handleAddTag = (): void => {
    setSubmitErrorMessage("");
    setTags((current) => appendTag(current, tagDraft));
    setTagDraft("");
  };

  const handleRemoveTag = (targetTag: string): void => {
    setSubmitErrorMessage("");
    setTags((current) => current.filter((tag) => tag !== targetTag));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!canSubmit) {
      return;
    }

    const submitTags = appendTag(tags, tagDraft);
    const requestBody = {
      title: title.trim(),
      url: url.trim(),
      remindAt: createReminderDateTime(reminderDate, reminderTime),
      tags: submitTags,
    };

    try {
      setIsSubmitting(true);
      setSubmitErrorMessage("");

      if (isServerId(bookmark.id)) {
        await updateBookmarkApi(bookmark.id, requestBody);
      } else {
        updateStoredBookmark(bookmark.id, {
          title,
          url,
          reminderDate,
          reminderTime,
          tags: submitTags,
        });
      }

      navigate(ROUTES.linkDetail(bookmark.id), {
        replace: true,
        state: { shouldShowEditSuccessToast: true },
      });
    } catch {
      setSubmitErrorMessage(
        "북마크를 수정하지 못했어요. 입력값을 확인한 뒤 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileScreen>
      <header className="sticky top-0 z-30 bg-grayscale-000">
        <div className="grid h-[50px] grid-cols-[24px_1fr_24px] items-center px-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-6 items-center justify-center text-grayscale-200"
            aria-label="이전 화면으로 이동"
          >
            <BackIcon />
          </button>
          <h1 className="truncate text-center text-[18px] leading-[1.5] font-semibold text-[#1c1c1a]">
            {title.trim() || bookmark.title}
          </h1>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex size-6 items-center justify-center text-main disabled:text-grayscale-100"
            aria-label="링크 수정 완료"
          >
            <CheckIcon />
          </button>
        </div>
      </header>

      <form
        className="flex flex-col px-5 pt-9 pb-[140px]"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-1">
            <FieldLabel label="링크 URL" />
            <TextField
              type="url"
              label="링크 URL"
              value={url}
              onChange={(nextUrl) => {
                setSubmitErrorMessage("");
                setUrl(nextUrl);
              }}
              placeholder="https://..."
            />
          </section>

          <section className="flex flex-col gap-1">
            <FieldLabel label="링크 제목" isRequired />
            <TextField
              label="링크 제목"
              value={title}
              onChange={(nextTitle) => {
                setSubmitErrorMessage("");
                setTitle(nextTitle);
              }}
              placeholder="이 링크에 대해 간략히 설명해주세요."
            />
          </section>

          <section className="flex flex-col gap-1">
            <FieldLabel label="해시태그" helper="(최대 5개)" />
            <div className="flex min-h-[49px] flex-wrap items-center gap-2.5 rounded-xl bg-grayscale-white p-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center rounded-md bg-main-100 py-0.5 pr-0.5 pl-1 text-[14px] leading-[1.5] font-medium text-main-300"
                >
                  # {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-0.5 flex size-4 items-center justify-center"
                    aria-label={`${tag} 태그 삭제`}
                  >
                    <CloseIcon />
                  </button>
                </span>
              ))}

              {tags.length < MAX_TAG_COUNT ? (
                <input
                  value={tagDraft}
                  onChange={(event) => {
                    setSubmitErrorMessage("");
                    setTagDraft(event.target.value);
                  }}
                  onCompositionStart={() => setIsComposingTag(true)}
                  onCompositionEnd={() => setIsComposingTag(false)}
                  onKeyDown={(event) => {
                    if (event.nativeEvent.isComposing || isComposingTag) {
                      return;
                    }

                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddTag();
                    }
                  }}
                  onBlur={() => {
                    if (canAddTag) {
                      handleAddTag();
                    }
                  }}
                  placeholder="# 태그추가"
                  aria-label="해시태그 추가"
                  className="h-[25px] w-[86px] rounded-md border border-dashed border-grayscale-100 bg-grayscale-000 px-1 text-[14px] leading-[1.5] font-medium text-grayscale-300 outline-none placeholder:text-grayscale-100"
                />
              ) : null}
            </div>
          </section>

          <section className="flex flex-col gap-1">
            <FieldLabel label="리마인드 날짜 및 시간" isRequired />
            <div className="grid grid-cols-2 gap-1">
              <label className="flex h-12 items-center justify-between rounded-xl bg-grayscale-050 px-5 text-grayscale-200">
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(event) => {
                    setSubmitErrorMessage("");
                    setReminderDate(event.target.value);
                  }}
                  className="min-w-0 flex-1 bg-transparent text-[14px] leading-[1.5] font-medium text-grayscale-800 outline-none"
                  aria-label="리마인드 날짜"
                />
                <CalendarIcon />
              </label>
              <label className="flex h-12 items-center justify-between rounded-xl bg-grayscale-050 px-5 text-grayscale-200">
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(event) => {
                    setSubmitErrorMessage("");
                    setReminderTime(event.target.value);
                  }}
                  className="min-w-0 flex-1 bg-transparent text-[14px] leading-[1.5] font-medium text-grayscale-800 outline-none"
                  aria-label="리마인드 시간"
                />
                <ClockIcon />
              </label>
            </div>
          </section>

          {submitErrorMessage ? (
            <p
              className="text-[12px] leading-[1.5] font-medium text-error"
              role="alert"
              aria-live="polite"
            >
              {submitErrorMessage}
            </p>
          ) : null}
        </div>
      </form>
    </MobileScreen>
  );
}
