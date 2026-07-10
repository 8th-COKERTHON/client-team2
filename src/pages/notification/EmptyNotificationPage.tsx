import CharacterImg from "@/assets/icons/character_push1.png";

export default function EmptyNotificationPage() {
  return (
    <div className="bg-grayscale-background flex flex-col items-center justify-center pt-50">
      <img src={CharacterImg} className="h-[139px] w-[99px]" />
      <p className="text-UI/Grayscale/300">nothing...</p>
    </div>
  );
}
