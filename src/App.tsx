// import { AppRouter } from "@/app/router";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="pb-[104px]">
      <HomePage />
      <BottomNavigation />
    </div>
  );
}

export default App;
