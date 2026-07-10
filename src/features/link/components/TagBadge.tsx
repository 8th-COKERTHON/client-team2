import type { Tag } from "@/features/link/types";

type TagBadgeProps = {
  tag: Tag;
  tone?: "default" | "muted";
};

export function TagBadge({ tag, tone = "default" }: TagBadgeProps) {
  const toneClass =
    tone === "muted"
      ? "bg-grayscale-000 text-grayscale-100"
      : "bg-main-100 text-main-300";

  return (
    <span className={`rounded-md px-1 py-0.5 text-[14px] leading-[1.5] font-medium ${toneClass}`}>
      # {tag.name.replace(/^#\s*/, "")}
    </span>
  );
}
