type StatItem = {
  label: string;
  value: number;
};

type UserStatCardsProps = {
  savedBookmarkCount: number;
  completedBookmarkCount: number;
  totalViewCount: number;
};

export function UserStatCards({
  savedBookmarkCount,
  completedBookmarkCount,
  totalViewCount,
}: UserStatCardsProps) {
  const stats: StatItem[] = [
    { label: "저장 링크", value: savedBookmarkCount },
    { label: "완료 링크", value: completedBookmarkCount },
    { label: "총 조회수", value: totalViewCount },
  ];

  return (
    <div className="flex w-full items-center gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-grayscale-white flex h-[84px] flex-1 flex-col items-center justify-center gap-1 rounded-xl"
        >
          <p className="text-grayscale-800 text-[20px] leading-[1.5] font-medium tracking-[-0.5px]">
            {stat.value}
          </p>
          <p className="typo-kr-caption-regular text-grayscale-200 tracking-[-0.3px]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
