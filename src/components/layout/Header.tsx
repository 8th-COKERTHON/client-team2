import type { ReactNode } from "react";
import { useNavigate } from "react-router";

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
      <path
        d="M9.8284 12.0007L14.7782 16.9504L13.364 18.3646L7 12.0007L13.364 5.63672L14.7782 7.05093L9.8284 12.0007Z"
        fill="currentColor"
      />
    </svg>
  );
}

type HeaderProps = {
  title: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
};

export function Header({ title, onBack, rightSlot }: HeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <header className="bg-grayscale-background flex h-[50px] w-full items-center justify-between px-5">
      <button
        type="button"
        onClick={handleBackClick}
        aria-label="뒤로 가기"
        className="text-grayscale-900 flex size-6 items-center justify-center"
      >
        <BackArrowIcon />
      </button>

      <h1 className="text-[18px] leading-[1.4] font-semibold tracking-[-0.36px] text-[#1c1c1a]">
        {title}
      </h1>

      <div className="flex size-6 items-center justify-center">{rightSlot}</div>
    </header>
  );
}
