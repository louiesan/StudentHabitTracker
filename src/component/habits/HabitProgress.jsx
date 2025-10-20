import { useContext, useEffect, useState } from "react";
import { HabitsContext } from "../../context/habitContext";
import Timer from "../timer/Timer";

export default function HabitProgress({ habit }) {
  const [progress, setProgress] = useState(0);
  const { finished, setFinished, setTodayProg, icons, todayProg } =
    useContext(HabitsContext);
  const index = finished.findIndex((e) => e.id === habit.id);

  const style = {
    width:
      index !== -1 ? "100%" : `${Math.floor((progress * 100) / habit.value)}%`,
  };

  useEffect(() => {
    if (progress >= habit.value) {
      finished.find((e) => e.id === habit.id)
        ? null
        : setFinished((pre) => [...pre, habit]);
    }
  }, [progress]);

  useEffect(() => {
    index !== -1 ? setProgress(habit.value) : null;
  }, []);
  return (
    <div
      className={`w-full sm:w-3xs h-fit flex flex-col items-center justify-center gap-2.5 border border-black/70 rounded-md p-2.5 ${
        index !== -1 ? "bg-green-300/80" : "bg-white"
      }`}
    >
      <div className="w-full h-full flex justify-start gap-2.5 items-center">
        <div className="w-10 h-full bg-gray-300 rounded-md flex items-center justify-center">
          {icons[habit.icon]}
        </div>
        <div className="w-fit h-fit content-center">
          <h1 className="font-semibold text-lg font-[system-ui] capitalize">
            {habit.habit}
          </h1>
          <p className="text-gray-400 font-medium text-sm">
            Category: {habit.category}
          </p>
        </div>
      </div>
      <div className="w-full h-fit flex flex-row flex-wrap justify-between items-center">
        <h4>{Math.floor(progress / (1000 * 60))} min completed</h4>
        <h4>Goal: {habit.time}</h4>
      </div>
      <div className="relative w-full h-2.5 rounded-full bg-gray-400 overflow-hidden ">
        <span
          style={style}
          className="absolute top-0 left-0 w-0 h-2.5 bg-amber-300 transition-all ease-in-out duration-300"
        ></span>
      </div>
      <div className="w-full h-fit bg-gray-300 rounded-md flex flex-row flex-wrap">
        <Timer
          progress={progress}
          setProgress={setProgress}
          time={habit.value}
        />
      </div>
      <div className="w-full h-fit flex flex-row flex-nowrap justify-around items-center">
        <button
          onClick={() => {
            setProgress((pre) => pre + 1800000);
            setTodayProg((pre) => pre + 1800000);
          }}
          className="cursor-pointer w-fit h-fit px-1.5 py-1 rounded-md text-center text-black border border-black "
        >
          +30min
        </button>
        <button
          onClick={() => {
            setProgress((pre) => pre + 3600000);
            setTodayProg((pre) => pre + 3600000);
          }}
          className="cursor-pointer w-fit h-fit px-1.5 py-1 rounded-md text-center text-black border border-black "
        >
          +1h
        </button>
        <button
          onClick={() => {
            setProgress((pre) => pre + 900000);
            setTodayProg((pre) => pre + 900000);
          }}
          className="cursor-pointer w-fit h-fit px-1.5 py-1 rounded-md text-center text-black border border-black "
        >
          +15min
        </button>
      </div>
    </div>
  );
}
