import type { ReactNode } from "react";

type MobileScreenProps = {
  children: ReactNode;
};

export function MobileScreen({ children }: MobileScreenProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-grayscale-000 text-grayscale-900">
      {children}
    </main>
  );
}
