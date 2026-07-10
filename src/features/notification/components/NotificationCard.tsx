import { useState } from "react";

import { formatDateToSlash } from "@/utils/date";
import type { NotificationGroup } from "@/features/notification/types";

type NotificationCardProps = {
  notificationGroup: NotificationGroup;
};

export function NotificationCard({ notificationGroup }: NotificationCardProps) {
  const { notificationCount, isRead, latestNotificationAt, notificationItems } =
    notificationGroup;
  const [isExpanded, setIsExpanded] = useState(false);

  if (notificationItems.length === 0) {
    return null;
  }

  const latestItem = notificationItems[0];
  const hasMultiple = notificationCount > 1;
  const canExpand = hasMultiple && notificationItems.length > 1;

  const handleToggle = (): void => {
    setIsExpanded((prev) => !prev);
  };

  if (canExpand && isExpanded) {
    return (
      <li className="bg-grayscale-white w-full rounded-xl p-4">
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={true}
          className="flex w-full flex-col gap-4"
        >
          {notificationItems.map((item) => (
            <div
              key={item.notificationId}
              className="flex h-[42px] w-full items-center gap-4"
            >
              <div className="bg-grayscale-050 size-[42px] shrink-0 rounded-lg" />

              <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
                <p className="typo-kr-detail-semibold text-grayscale-900 w-full truncate text-left tracking-[-0.35px]">
                  {item.title}
                </p>
                <p className="typo-kr-caption-regular text-grayscale-300 w-full truncate text-left tracking-[-0.3px]">
                  {item.message}
                </p>
              </div>

              <p className="typo-kr-caption-regular text-grayscale-200 shrink-0 tracking-[-0.3px] whitespace-nowrap">
                {formatDateToSlash(item.sentAt)}
              </p>
            </div>
          ))}
        </button>
      </li>
    );
  }

  const summary = (
    <>
      <div
        className={`size-[42px] shrink-0 rounded-lg ${
          isRead ? "bg-grayscale-050" : "bg-subcolor-300"
        }`}
      />

      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5">
        <p className="typo-kr-detail-semibold text-grayscale-900 w-full truncate text-left tracking-[-0.35px]">
          {latestItem.title}
        </p>
        <p className="typo-kr-caption-regular text-grayscale-300 w-full truncate text-left tracking-[-0.3px]">
          {latestItem.message}
        </p>
      </div>

      <div
        className={`flex h-full shrink-0 flex-col items-end ${
          hasMultiple ? "justify-between" : "justify-center"
        }`}
      >
        <p className="typo-kr-caption-regular text-grayscale-200 tracking-[-0.3px] whitespace-nowrap">
          {formatDateToSlash(latestNotificationAt)}
        </p>

        {hasMultiple && (
          <span
            className={`typo-kr-caption-medium rounded-md px-1.5 py-px tracking-[-0.3px] ${
              isRead
                ? "bg-grayscale-050 text-grayscale-200"
                : "bg-subcolor-200 text-subcolor-600"
            }`}
          >
            {notificationCount}건
          </span>
        )}
      </div>
    </>
  );

  if (canExpand) {
    return (
      <li
        className={`w-full rounded-xl ${
          isRead ? "bg-grayscale-white" : "bg-subcolor-100"
        }`}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={false}
          className="flex w-full items-center gap-4 p-4"
        >
          {summary}
        </button>
      </li>
    );
  }

  return (
    <li
      className={`flex w-full items-center gap-4 rounded-xl p-4 ${
        isRead ? "bg-grayscale-white" : "bg-subcolor-100"
      }`}
    >
      {summary}
    </li>
  );
}
