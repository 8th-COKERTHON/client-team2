import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LogoPlaceholder } from "@/features/auth/components/LogoPlaceholder";

export function SignupCompletePage() {
  return (
    <AuthLayout>
      <section className="flex min-h-[560px] flex-col items-center justify-center text-center">
        <div className="-rotate-[14deg]">
          <LogoPlaceholder />
        </div>

        <h1 className="mt-8 text-[18px] leading-[150%] font-semibold text-grayscale-900">
          준비가 모두 끝났어요!
        </h1>

        <p className="typo-kr-body-medium mt-1 text-grayscale-200">
          <span className="text-main">적재적소</span>에 오신 것을 환영합니다.
        </p>
      </section>
    </AuthLayout>
  );
}
