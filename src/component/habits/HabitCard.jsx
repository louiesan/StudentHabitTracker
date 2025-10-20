import { useContext } from "react";
import { HabitsContext } from "../../context/habitContext";
import HabitProgress from "./HabitProgress";

export default function HabitCard() {
  const { allHabits } = useContext(HabitsContext);
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center sm:justify-start gap-2.5">
      {allHabits && allHabits.length > 0 ? (
        allHabits.map((e) => <HabitProgress key={e.id} habit={e} />)
      ) : (
        <div className="w-full col-span-4 text-center content-center text-xl font-bold text-black">
          You're Habits will appear here once you add them!
        </div>
      )}
    </div>
  );
}
