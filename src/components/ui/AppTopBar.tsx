import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type AppTopBarProps = {
  title: string;
  rightSlot?: ReactNode;
};

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M15 5L8 12L15 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        d="M12 8.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM12 13.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM12 19.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AppTopBar({ title, rightSlot }: AppTopBarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-grayscale-000">
      <div className="flex h-[60px] items-end px-5 pb-2" aria-hidden="true" />
      <div className="flex h-[50px] items-center justify-between px-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex size-6 items-center justify-center text-grayscale-800"
          aria-label="이전 화면으로 이동"
        >
          <BackIcon />
        </button>
        <h1 className="max-w-[230px] truncate text-center text-[18px] leading-[1.5] font-semibold text-[#1c1c1a]">
          {title}
        </h1>
        <div className="flex size-6 items-center justify-center text-grayscale-800">
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
