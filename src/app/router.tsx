import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthEntryPage } from "@/pages/AuthEntryPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { SignupCompletePage } from "@/pages/SignupCompletePage";
import { SignupPage } from "@/pages/SignupPage";
import { SplashPage } from "@/pages/SplashPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.splash} element={<SplashPage />} />
      <Route path={ROUTES.authEntry} element={<AuthEntryPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signup} element={<SignupPage />} />
      <Route path={ROUTES.signupComplete} element={<SignupCompletePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
