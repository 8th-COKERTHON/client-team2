import { Link } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LogoPlaceholder } from "@/features/auth/components/LogoPlaceholder";

export function AuthEntryPage() {
  return (
    <AuthLayout>
      <section className="flex flex-col items-center pt-[52px]">
        <LogoPlaceholder />

        <h1 className="typo-kr-heading-semibold mt-2 text-grayscale-900">
          임시 서비스명
        </h1>
      </section>

      <div className="absolute right-5 bottom-[104px] left-5 flex flex-col gap-3">
        <Link
          to={ROUTES.signup}
          className="typo-kr-body-medium flex h-12 items-center justify-center rounded-xl bg-grayscale-050 text-grayscale-200"
        >
          회원가입
        </Link>
        <Link
          to={ROUTES.login}
          className="typo-kr-body-medium flex h-12 items-center justify-center rounded-xl bg-grayscale-050 text-grayscale-200"
        >
          로그인
        </Link>
      </div>
    </AuthLayout>
  );
}
