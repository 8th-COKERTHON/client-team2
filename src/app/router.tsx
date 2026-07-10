import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthEntryPage } from "@/pages/AuthEntryPage";
import { CollectionDetailPage } from "@/pages/CollectionDetailPage";
import { HomePage } from "@/pages/HomePage";
import { LinkDetailPage } from "@/pages/LinkDetailPage";
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
      <Route path={ROUTES.collectionDetail(":tagId")} element={<CollectionDetailPage />} />
      <Route path={ROUTES.linkDetail(":linkId")} element={<LinkDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
