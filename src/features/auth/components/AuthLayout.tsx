import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-dvh bg-grayscale-800">
      <div className="relative mx-auto min-h-dvh w-full max-w-[375px] overflow-hidden bg-grayscale-background px-5 pt-[110px] pb-[56px]">
        {children}
        <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-[134px] -translate-x-1/2 rounded-full bg-grayscale-700" />
      </div>
    </main>
  );
}
