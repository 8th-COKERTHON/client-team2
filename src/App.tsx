import { AppRouter } from "@/app/router";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ROUTES } from "@/constants/routes";
import { useLocation } from "react-router";

const ROUTES_WITHOUT_BOTTOM_NAV: string[] = [
  ROUTES.splash,
  ROUTES.authEntry,
  ROUTES.login,
  ROUTES.signup,
  ROUTES.signupComplete,
];

function App() {
  const { pathname } = useLocation();
  const shouldShowBottomNavigation = !ROUTES_WITHOUT_BOTTOM_NAV.includes(pathname);

  return (
    <div className={shouldShowBottomNavigation ? "pb-[104px]" : undefined}>
      <AppRouter />
      {shouldShowBottomNavigation ? <BottomNavigation /> : null}
    </div>
  );
}

export default App;
