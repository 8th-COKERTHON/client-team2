import splashLogo from "@/assets/icons/character_basic.png";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/constants/routes";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.authEntry);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="bg-grayscale-800 min-h-dvh">
      <div className="bg-grayscale-background relative mx-auto flex min-h-dvh w-full max-w-[375px] flex-col items-center px-5 pt-[162px] pb-[56px]">
        <img src={splashLogo} alt="logo" className="h-[188px] w-[133px]" />

        <h1 className="font-dandan typo-kr-heading-semibold text-main mt-2">
          적재적소
        </h1>

        <p className="typo-kr-detail-medium text-grayscale-100 absolute bottom-[104px] left-1/2 -translate-x-1/2">
          @적재적소
        </p>

        <div className="bg-grayscale-700 pointer-events-none absolute bottom-2 left-1/2 h-1 w-[134px] -translate-x-1/2 rounded-full" />
      </div>
    </main>
  );
}
