import { Route, Routes } from "react-router";

import { ROUTES } from "@/constants/routes";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { NotificationListPage } from "@/pages/notification/NotificationListPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.notifications} element={<NotificationListPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
