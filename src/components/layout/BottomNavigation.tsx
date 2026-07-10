import type { ReactNode } from "react";
import { Link, NavLink } from "react-router";

import { ROUTES } from "@/constants/routes";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
      <path
        d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
      <path
        d="M3 23C3 18.0294 7.02943 14 12 14C16.9706 14 21 18.0294 21 23H3Z"
        fill="currentColor"
      />
      <path
        d="M6.375 7.625C6.375 10.7328 8.89219 13.25 12 13.25C15.1078 13.25 17.625 10.7328 17.625 7.625C17.625 4.51719 15.1078 2 12 2C8.89219 2 6.375 4.51719 6.375 7.625Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
      <path
        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
        fill="currentColor"
      />
    </svg>
  );
}

type NavTabProps = {
  to: string;
  end?: boolean;
  label: string;
  children: ReactNode;
};

function NavTab({ to, end, label, children }: NavTabProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex w-8 flex-col items-center gap-0.5 ${isActive ? "text-main" : "text-grayscale-200"}`
      }
    >
      {children}
      <span className="typo-en-caption-small tracking-[-0.25px]">
        {label}
      </span>
    </NavLink>
  );
}

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 rounded-t-[30px] bg-grayscale-white pt-[15px] pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0px_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex w-full max-w-[240px] items-end justify-between">
        <NavTab to={ROUTES.home} end label="Home">
          <HomeIcon />
        </NavTab>

        <Link
          to={ROUTES.linkCreate}
          aria-label="링크 추가"
          className="flex size-12 items-center justify-center rounded-full bg-grayscale-800 text-grayscale-white shadow-[0px_10px_5px_rgba(0,0,0,0.08)]"
        >
          <AddIcon />
        </Link>

        <NavTab to={ROUTES.myPage} label="my">
          <MyIcon />
        </NavTab>
      </div>
    </nav>
  );
}
