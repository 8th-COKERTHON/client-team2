import { LogoPlaceholder } from "@/features/auth/components/LogoPlaceholder";

export function SplashPage() {
  return (
    <main className="min-h-dvh bg-grayscale-background">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[375px] flex-col items-center bg-grayscale-background px-5 pt-[162px] pb-[56px]">
        <LogoPlaceholder />

        <h1 className="typo-kr-heading-semibold mt-2 text-grayscale-900">
          임시 서비스명
        </h1>

        <p className="typo-kr-detail-medium absolute bottom-[104px] left-1/2 -translate-x-1/2 text-grayscale-100">
          @임시문구
        </p>

        <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-[134px] -translate-x-1/2 rounded-full bg-grayscale-700" />
      </div>
    </main>
  );
}
