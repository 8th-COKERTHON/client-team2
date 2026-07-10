import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants/routes";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SplashPage } from "@/pages/SplashPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.splash} element={<SplashPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
