import { useContext, useState } from "react";
import { HabitsContext } from "../../context/habitContext";
import HabitRows from "./HabitRow";

export default function Habits() {
  const { setModal, allHabits } = useContext(HabitsContext);

  return (
    <div className="min-w-xs w-full h-fit  sm:w-xs sm:h-52 bg-white/80 border content-center border-white shadow-lg inset-shadow-black inset-shadow-lg rounded-md p-2.5">
      <div className="w-full h-full max-h-52 content-start overflow-y-scroll">
        {allHabits && allHabits.length > 0 ? (
          <div className="w-full h-fit flex flex-col gap-1.5">
            <div className="w-full h-fit flex flex-row items-center justify-between">
              <h1 className="p-1.5 bg-black text-white font-bold rounded-md">
                Your Daily Habits
              </h1>
              <button
                onClick={() => setModal(true)}
                className="py-1.5 px-2.5 font-normal font-[System-ui] bg-black rounded-lg text-white cursor-pointer hover:bg-white border hover:font-bold hover:border-black hover:text-black transition-all ease-in-out duration-500"
              >
                Add Habit
              </button>
            </div>
            <ul className="w-full h-fit flex flex-col gap-1">
              {allHabits.map((e) => (
                <HabitRows key={e.id} habits={e} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="w-full h-full text-center flex flex-col gap-2.5 justify-around">
            <h1 className="text-3xl font-bold ">You have no habits yet!</h1>
            <h4 className="text-2xl font-medium ">Go and Add ones:</h4>
            <button
              onClick={() => setModal(true)}
              className="py-1.5 px-2.5 font-normal font-[System-ui] bg-black rounded-lg text-white cursor-pointer hover:bg-white border hover:font-bold hover:border-black hover:text-black transition-all ease-in-out duration-500"
            >
              Add Habit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
