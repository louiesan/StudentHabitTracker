import { useContext } from "react";
import { HabitsContext } from "../../context/habitContext";
import { icons, Trash } from "lucide-react";

export default function HabitRows({ habits }) {
  const { finished, removeHabit, icons } = useContext(HabitsContext);
  const index = finished.findIndex((e) => e.id === habits.id);

  return (
    <div
      className={`p-1.5 overflow-hidden relative w-full h-16 flex flex-row flex-nowrap items-center justify-start gap-2.5 rounded-md border border-black ${
        index !== -1 ? "bg-green-300/80" : "bg-white"
      }`}
    >
      <div className="w-10 h-full bg-gray-300 rounded-md flex items-center justify-center">
        {icons[habits.icon]}
      </div>
      <div className="w-fit h-fit content-center">
        <h1 className="font-semibold text-lg font-[system-ui] capitalize">
          {habits.habit}
        </h1>
        <p className="text-gray-400 font-medium text-sm">
          Category: {habits.category} | Goal: {habits.time.toLowerCase()}
        </p>
      </div>
      <button
        onClick={() => removeHabit(habits)}
        className="absolute right-1 sm:hover:right-1 sm:-right-4 cursor-pointer hover:text-red-400 rounded-md shadow-black shadow-xs p-1.5 transition-all duration-300 ease-in hover:bg-black"
      >
        <Trash />
      </button>
    </div>
  );
}
