type LogoPlaceholderProps = {
  size?: "sm" | "lg";
};

export function LogoPlaceholder({ size = "lg" }: LogoPlaceholderProps) {
  const sizeClass = size === "lg" ? "size-[134px]" : "size-20";

  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded-2xl bg-grayscale-100 text-grayscale-300`}
      aria-label="임시 로고"
      role="img"
    >
      <span className="typo-kr-caption-regular">Logo</span>
    </div>
  );
}
