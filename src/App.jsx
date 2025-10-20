import { Music, Shell, Trophy } from "lucide-react";
import Calendary from "./component/calendar/Calendar";
import Habits from "./component/habits/Habits";
import { useContext } from "react";
import { HabitsContext } from "./context/habitContext";
import HabitModal from "./component/habitmodal/HabitModal";
import Progress from "./component/progress/Progress";
import HabitCard from "./component/habits/HabitCard";
import Barr from "./component/chart/Bar";
import Lines from "./component/chart/Line";
import Player from "./component/player/Player";
import Relaxing from "./component/relaxSound/Relaxing";

function App() {
  const { modal, player, setPlayer, atmospherePlayer, setAtmospherePlayer } =
    useContext(HabitsContext);
  return (
    <>
      {modal && <HabitModal />}
      <Player />

      <div
        className={`${
          modal || player ? "blur-lg" : "blur-none"
        } relative w-full h-fit flex flex-col gap-1.5 transition-all duration-300 ease-in-out`}
      >
        <header className="w-full h-fit px-2.5 py-1.5 text-left flex justify-between items-center">
          <h1 className="font-bold text-3xl text-white">Studenty</h1>
          <div className="w-fit h-fit flex gap-1.5 items-center justify-center">
            <div
              onClick={() => setPlayer((pre) => !pre)}
              className="group w-fit h-fit flex items-center justify-center gap-2.5 bg-white rounded-full cursor-pointer p-1.5 text-center hover:bg-orange-400 transition-all duration-300 ease-in"
            >
              <Music className="group-hover:text-white text-orange-400 transition-all duration-300 ease-in" />
            </div>
            <div
              onClick={() => setAtmospherePlayer((pre) => !pre)}
              className="group relative w-fit h-fit flex items-center justify-center gap-2.5 bg-white rounded-full cursor-pointer p-1.5 text-center hover:bg-orange-400 transition-all duration-300 ease-in"
            >
              <Relaxing />
              <Shell className="group-hover:text-white text-orange-400 transition-all duration-300 ease-in" />
            </div>
          </div>
        </header>
        <div className="w-full h-fit flex flex-row justify-around md:justify-between gap-2.5 flex-wrap sm:flex-nowrap">
          <Habits />
          <Progress />
        </div>
        <div className="w-full h-fit  grid grid-cols-1 sm:grid-cols-2  justify-around md:justify-between gap-2.5 flex-wrap sm:flex-nowrap">
          <div className="w-full h-full max-h-64 overflow-y-scroll max-w-xl p-2.5 bg-white/90 border border-black/80 rounded-md ">
            <Lines />
          </div>
          <div className="w-full h-full max-h-64 max-w-xl p-2.5 bg-white/90 border border-black/80 rounded-md ">
            <Barr />
          </div>
        </div>
        <div className="w-full h-fit flex flex-row justify-around md:justify-between gap-2.5 flex-wrap sm:flex-nowrap">
          <HabitCard />
        </div>
      </div>
    </>
  );
}

export default App;
