import type { ButtonHTMLAttributes, ReactNode } from "react";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function AuthButton({ children, className = "", ...props }: AuthButtonProps) {
  return (
    <button
      className={`typo-kr-body-medium flex h-12 w-full items-center justify-center rounded-xl transition-colors disabled:bg-grayscale-050 disabled:text-grayscale-200 enabled:bg-main enabled:text-grayscale-000 enabled:shadow-[0_2px_10px_rgba(229,55,46,0.3)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
