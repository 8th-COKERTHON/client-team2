import type { Tag } from "@/features/link/types";

type TagBadgeProps = {
  tag: Tag;
};

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="rounded-md bg-main-100 px-1 py-0.5 text-[14px] leading-[1.5] font-medium text-main-300">
      # {tag.name.replace(/^#\s*/, "")}
    </span>
  );
}
