import type { InputHTMLAttributes } from "react";

type AuthTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function AuthTextField({ id, label, className = "", ...props }: AuthTextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="typo-kr-body-medium text-grayscale-300">
        {label}
      </label>
      <input
        id={id}
        className={`typo-kr-detail-medium h-12 w-full rounded-xl bg-grayscale-050 px-5 text-grayscale-800 outline-none placeholder:text-grayscale-200 focus:ring-2 focus:ring-main/30 ${className}`}
        {...props}
      />
    </div>
  );
}
