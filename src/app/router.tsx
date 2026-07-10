import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthEntryPage } from "@/pages/AuthEntryPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { NotificationListPage } from "@/pages/notification/NotificationListPage";
import { SplashPage } from "@/pages/SplashPage";
import { SignupPage } from "@/pages/SignupPage";
import { SignupCompletePage } from "@/pages/SignupCompletePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.notifications} element={<NotificationListPage />} />
      <Route path={ROUTES.splash} element={<SplashPage />} />
      <Route path={ROUTES.authEntry} element={<AuthEntryPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.signup} element={<SignupPage />} />
      <Route path={ROUTES.signupComplete} element={<SignupCompletePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
