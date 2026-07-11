import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import completedLogo from "@/assets/icons/character_auth_completed.png";

const AUTO_NAVIGATE_DELAY_MS = 2000;

export function SignupCompletePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.login);
    }, AUTO_NAVIGATE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AuthLayout>
      <section className="flex min-h-[560px] flex-col items-center justify-center text-center">
        <div className="-rotate-[14deg]">
          <img src={completedLogo} />
        </div>

        <h1 className="text-grayscale-900 mt-8 text-[18px] leading-[150%] font-semibold">
          준비가 모두 끝났어요!
        </h1>

        <p className="typo-kr-body-medium text-grayscale-200 mt-1">
          <span className="text-main">적재적소</span>에 오신 것을 환영합니다.
        </p>
      </section>
    </AuthLayout>
  );
}
