type PushPermissionModalProps = {
  isSubmitting: boolean;
  onAllow: () => void;
  onLater: () => void;
};

export function PushPermissionModal({
  isSubmitting,
  onAllow,
  onLater,
}: PushPermissionModalProps) {
  return (
    <div className="fixed inset-0 z-[80] mx-auto flex w-full max-w-[430px] items-center justify-center bg-[#0c0c0e]/60 px-[30px]">
      <section
        className="flex w-[315px] flex-col items-center gap-[11px] overflow-hidden rounded-[20px] bg-white p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="push-permission-title"
        aria-describedby="push-permission-description"
      >
        <div className="flex h-[101px] w-full flex-col items-center justify-center gap-2.5 text-center">
          <h2
            id="push-permission-title"
            className="w-[200px] text-[18px] leading-[1.5] font-semibold tracking-[-0.45px] text-grayscale-800"
          >
            푸쉬 알림 설정
          </h2>
          <p
            id="push-permission-description"
            className="w-[200px] text-[14px] leading-[1.5] font-medium tracking-[-0.35px] text-grayscale-300"
          >
            새로운 소식과 중요한 알림을 놓치지 않도록 알림을 허용해 주세요.
          </p>
        </div>

        <div className="flex w-full gap-2.5">
          <button
            type="button"
            onClick={onLater}
            disabled={isSubmitting}
            className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-grayscale-050 p-2.5 text-[16px] leading-[1.5] font-medium tracking-[-0.4px] text-grayscale-200 disabled:opacity-60"
          >
            나중에
          </button>
          <button
            type="button"
            onClick={onAllow}
            disabled={isSubmitting}
            className="flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-main p-2.5 text-[16px] leading-[1.5] font-medium tracking-[-0.4px] text-grayscale-000 disabled:opacity-60"
          >
            알림 허용
          </button>
        </div>
      </section>
    </div>
  );
}
