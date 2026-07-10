import { useState } from "react";
import { useNavigate } from "react-router";

import { MobileScreen } from "@/components/ui/MobileScreen";
import { ROUTES } from "@/constants/routes";
import { createStoredBookmark } from "@/features/link/api/localBookmarkStorage";

const MAX_TAG_COUNT = 5;
const INITIAL_TAGS = ["개발", "학업"];

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

function CloseIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
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

function TextField({ value, onChange, placeholder, label, type = "text" }: TextFieldProps) {
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

export function LinkCreatePage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [tags, setTags] = useState(INITIAL_TAGS);
  const [tagDraft, setTagDraft] = useState("");
  const [isComposingTag, setIsComposingTag] = useState(false);

  const canSubmit =
    title.trim().length > 0 &&
    reminderDate.trim().length > 0 &&
    reminderTime.trim().length > 0;
  const canAddTag = tagDraft.trim().length > 0 && tags.length < MAX_TAG_COUNT;

  const handleAddTag = (): void => {
    setTags((current) => appendTag(current, tagDraft));
    setTagDraft("");
  };

  const handleRemoveTag = (targetTag: string): void => {
    setTags((current) => current.filter((tag) => tag !== targetTag));
  };

  const handleSubmit = (): void => {
    if (!canSubmit) {
      return;
    }

    const submitTags = appendTag(tags, tagDraft);

    setTags(submitTags);
    setTagDraft("");

    createStoredBookmark({
      title,
      url,
      reminderDate,
      reminderTime,
      tags: submitTags,
    });
    navigate(ROUTES.home);
  };

  return (
    <MobileScreen>
      <header className="sticky top-0 z-30 bg-grayscale-000">
        <div className="flex h-[60px] items-end px-5 pb-2" aria-hidden="true" />
        <div className="grid h-[50px] grid-cols-[24px_1fr_24px] items-center px-5">
          <span aria-hidden="true" />
          <h1 className="truncate text-center text-[18px] leading-[1.5] font-semibold text-[#1c1c1a]">
            북마크 저장
          </h1>
          <button
            type="button"
            onClick={() => navigate(ROUTES.home)}
            className="flex size-6 items-center justify-center text-grayscale-200"
            aria-label="북마크 저장 닫기"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>
      </header>

      <form
        className="flex min-h-[calc(100vh-110px)] flex-col px-5 pt-9 pb-[90px]"
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
              onChange={setUrl}
              placeholder="https://..."
            />
          </section>

          <section className="flex flex-col gap-1">
            <FieldLabel label="링크 제목" isRequired />
            <TextField
              label="링크 제목"
              value={title}
              onChange={setTitle}
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
                  onChange={(event) => setTagDraft(event.target.value)}
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
                  onChange={(event) => setReminderDate(event.target.value)}
                  onInput={(event) =>
                    setReminderDate(event.currentTarget.value)
                  }
                  className="min-w-0 flex-1 bg-transparent text-[14px] leading-[1.5] font-medium text-grayscale-800 outline-none"
                  aria-label="리마인드 날짜"
                />
                <CalendarIcon />
              </label>
              <label className="flex h-12 items-center justify-between rounded-xl bg-grayscale-050 px-5 text-grayscale-200">
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(event) => setReminderTime(event.target.value)}
                  onInput={(event) =>
                    setReminderTime(event.currentTarget.value)
                  }
                  className="min-w-0 flex-1 bg-transparent text-[14px] leading-[1.5] font-medium text-grayscale-800 outline-none"
                  aria-label="리마인드 시간"
                />
                <ClockIcon />
              </label>
            </div>
          </section>

          <p className="text-[12px] leading-[1.5] font-medium text-grayscale-200">
            *저장 목적, 리마인드 날짜/시간은 필수 입력 항목입니다.
          </p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="fixed right-4 bottom-[56px] left-4 mx-auto h-12 max-w-[398px] rounded-xl bg-main text-[16px] leading-[1.5] font-medium text-grayscale-white disabled:bg-grayscale-050 disabled:text-grayscale-200"
        >
          완료
        </button>
      </form>
    </MobileScreen>
  );
}
