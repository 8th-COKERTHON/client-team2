import { Link } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import splashLogo from "@/assets/icons/character_basic.png";

export function AuthEntryPage() {
  return (
    <AuthLayout>
      <section className="flex flex-col items-center pt-[52px]">
        <img src={splashLogo} alt="logo" className="h-[188px] w-[133px]" />

        <h1 className="font-dandan typo-kr-heading-semibold text-main mt-2 text-4xl">
          적재적소
        </h1>
      </section>

      <div className="absolute right-5 bottom-[104px] left-5 flex flex-col gap-3">
        <Link
          to={ROUTES.signup}
          className="typo-kr-body-medium bg-grayscale-050 text-grayscale-200 flex h-12 items-center justify-center rounded-xl"
        >
          회원가입
        </Link>
        <Link
          to={ROUTES.login}
          className="typo-kr-body-medium bg-grayscale-050 text-grayscale-200 flex h-12 items-center justify-center rounded-xl"
        >
          로그인
        </Link>
      </div>
    </AuthLayout>
  );
}
