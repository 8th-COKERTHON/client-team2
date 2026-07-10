import type { NotificationFilter } from "@/features/notification/types";

type FilterTab = {
  value: NotificationFilter;
  label: string;
};

const FILTER_TABS: FilterTab[] = [
  { value: "all", label: "전체" },
  { value: "unread", label: "읽지 않음" },
];

type NotificationFilterTabsProps = {
  filter: NotificationFilter;
  unreadCount: number;
  onFilterChange: (filter: NotificationFilter) => void;
};

export function NotificationFilterTabs({
  filter,
  unreadCount,
  onFilterChange,
}: NotificationFilterTabsProps) {
  return (
    <div className="flex items-center gap-2">
      {FILTER_TABS.map((tab) => {
        const isActive = filter === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onFilterChange(tab.value)}
            className={`typo-kr-detail-medium flex h-9 items-center justify-center gap-1 rounded-[10px] px-3.5 leading-none tracking-[-0.35px] ${
              isActive
                ? "bg-grayscale-800 text-grayscale-white"
                : "bg-grayscale-050 text-grayscale-200"
            }`}
          >
            {tab.label}
            {tab.value === "unread" && unreadCount > 0 && (
              <span className="typo-kr-caption-medium bg-main text-grayscale-050 flex size-5 translate-y-[1.5px] items-center justify-center rounded-full tracking-[-0.3px]">
                {unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
