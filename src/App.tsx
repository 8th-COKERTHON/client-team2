import { AppRouter } from "@/app/router";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

function App() {
  return (
    <div className="pb-[104px]">
      <AppRouter />
      <BottomNavigation />
    </div>
  );
}

export default App;
