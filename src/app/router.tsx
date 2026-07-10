import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants/routes";
import { AuthEntryPage } from "@/pages/AuthEntryPage";
import { CollectionDetailPage } from "@/pages/CollectionDetailPage";
import { HomePage } from "@/pages/HomePage";
import { LinkCreatePage } from "@/pages/LinkCreatePage";
import { LinkDetailPage } from "@/pages/LinkDetailPage";
import { LinkEditPage } from "@/pages/LinkEditPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { NotificationListPage } from "@/pages/notification/NotificationListPage";
import { SplashPage } from "@/pages/SplashPage";
import { SignupPage } from "@/pages/SignupPage";
import { SignupCompletePage } from "@/pages/SignupCompletePage";
import { MyPage } from "@/pages/MyPage";

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
      <Route path={ROUTES.linkCreate} element={<LinkCreatePage />} />
<<<<<<< HEAD
      <Route path={ROUTES.linkEdit(":linkId")} element={<LinkEditPage />} />
      <Route path={ROUTES.collectionDetail(":tagId")} element={<CollectionDetailPage />} />
=======
      <Route
        path={ROUTES.collectionDetail(":tagId")}
        element={<CollectionDetailPage />}
      />
>>>>>>> 5bfebcb79ca02bcdfdc09a67f60af6b6dd253663
      <Route path={ROUTES.linkDetail(":linkId")} element={<LinkDetailPage />} />
      <Route path={ROUTES.myPage} element={<MyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
