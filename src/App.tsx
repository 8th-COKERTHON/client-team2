import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { AppRouter } from "@/app/router";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ROUTES } from "@/constants/routes";
import { AUTH_REQUIRED_EVENT_NAME } from "@/services/authRedirectEvent";

const ROUTES_WITHOUT_BOTTOM_NAV: string[] = [
  ROUTES.splash,
  ROUTES.authEntry,
  ROUTES.login,
  ROUTES.signup,
  ROUTES.signupComplete,
  ROUTES.linkCreate,
];

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const shouldShowBottomNavigation =
    !ROUTES_WITHOUT_BOTTOM_NAV.includes(pathname);

  useEffect(() => {
    const handleAuthRequired = (): void => {
      if (
        pathname === ROUTES.login ||
        pathname === ROUTES.signup ||
        pathname === ROUTES.authEntry
      ) {
        return;
      }

      navigate(ROUTES.login, { replace: true });
    };

    window.addEventListener(AUTH_REQUIRED_EVENT_NAME, handleAuthRequired);

    return () => {
      window.removeEventListener(AUTH_REQUIRED_EVENT_NAME, handleAuthRequired);
    };
  }, [navigate, pathname]);

  return (
    <div className={shouldShowBottomNavigation ? "pb-[104px]" : undefined}>
      <AppRouter />
      {shouldShowBottomNavigation ? <BottomNavigation /> : null}
    </div>
  );
}

export default App;
