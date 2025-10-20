import { CalendarClock, CircleDot, Flame, ListChecks } from "lucide-react";
import { useContext } from "react";
import { HabitsContext } from "../../context/habitContext";

export default function Progress() {
  const { todayProg, finished, allHabits } = useContext(HabitsContext);
  const streak = 0;
  return (
    <div className="w-full h-fit max-h-52 max-w-full lg:max-h-none lg:overflow-y-visible overflow-y-scroll lg:h-52 p-2.5 my-auto flex flex-row flex-wrap items-center justify-between bg-white/80 border content-start lg:content-center border-white shadow-lg inset-shadow-black inset-shadow-lg rounded-md gap-2.5">
      <div className="w-full h-fit lg:w-40 lg:h-40 bg-white flex flex-col justify-around items-center p-2.5 rounded-md border-gray-600">
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h1 className="text-sm text-black font-medium">Today's Progress</h1>
          <CircleDot color="orange" size={20} />
        </div>
        <div className="w-full h-fit text-left">
          <h1 className="text-lg text-black font-medium">
            {(todayProg / (1000 * 60 * 60)).toFixed(1)}h
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            {(finished.length * 100) / allHabits.length
              ? ((finished.length * 100) / allHabits.length).toFixed(0)
              : 0}
            % of daily goals
          </p>
        </div>
      </div>
      <div className="w-full h-fit lg:w-40 lg:h-40 bg-white flex flex-col justify-around items-center p-2.5 rounded-md border-gray-600">
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h1 className="text-sm text-black font-medium">Weekly Average</h1>
          <CalendarClock color="blue" size={20} />
        </div>
        <div className="w-full h-fit text-left">
          <h1 className="text-lg text-black font-medium">
            {(todayProg / (1000 * 60) / 7).toFixed(1)}min
          </h1>
          <p className="text-sm text-gray-400 font-medium">Average this week</p>
        </div>
      </div>
      <div className="w-full h-fit lg:w-40 lg:h-40 bg-white flex flex-col justify-around items-center p-2.5 rounded-md border-gray-600">
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h1 className="text-sm text-black font-medium">Active Today</h1>
          <ListChecks color="lightgreen" size={20} />
        </div>
        <div className="w-full h-fit text-left">
          <h1 className="text-lg text-black font-medium">{finished?.length}</h1>
          <p className="text-sm text-gray-400 font-medium">
            of {allHabits?.length} total habits
          </p>
        </div>
      </div>
      <div className="w-full h-fit lg:w-40 lg:h-40 bg-white flex flex-col justify-around items-center p-2.5 rounded-md border-gray-600">
        <div className="w-full h-fit flex flex-row justify-between items-center">
          <h1 className="text-sm text-black font-medium">Best Streak</h1>
          <Flame color="red" size={20} />
        </div>
        <div className="w-full h-fit text-left">
          <h1 className="text-lg text-black font-medium">
            {finished.length && finished.length === allHabits.length
              ? streak + 1
              : 0}
          </h1>
          <p className="text-sm text-gray-400 font-medium">Streaks</p>
        </div>
      </div>
    </div>
  );
}
