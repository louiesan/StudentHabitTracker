import { useContext, useState, useRef } from "react";
import useOutsideClicker from "../../hooks/useOutsideClicker";
import { HabitsContext } from "../../context/habitContext";
import Categories from "./modalComp/category";
import Time from "./modalComp/Time";
import { nanoid } from "nanoid";

export default function HabitModal() {
  const { setModal, icons, setAllHabits, showList, setShowList } =
    useContext(HabitsContext);
  const [habits, setHabits] = useState({
    id: nanoid(),
    habit: "",
    category: "Study",
    icon: "LucideBookType",
    time: "30Min",
    value: 1800000,
  });

  const category = [
    {
      category: "Study",
      icon: "LucideBookType",
    },
    {
      category: "Workout",
      icon: "Target",
    },
    {
      category: "Meditiation",
      icon: "RadarIcon",
    },
    {
      category: "Hobby",
      icon: "Gamepad2",
    },
    {
      category: "Others",
      icon: "RadarIcon",
    },
  ];

  const time = [
    {
      time: "15Min",
      value: 900000,
    },
    {
      time: "30Min",
      value: 1800000,
    },
    {
      time: "1h",
      value: 3600000,
    },
    {
      time: "1.5h",
      value: 5400000,
    },
    {
      time: "2h",
      value: 7200000,
    },
  ];

  const ref = useRef(null);
  useOutsideClicker(ref, () => setModal(false));
  console.log(habits);

  function hundleSubmit(e) {
    e.preventDefault();
    if (habits.habit.length < 3) return;
    setAllHabits((pre) => [...pre, habits]);
    setModal(false);
  }

  return (
    <div
      ref={ref}
      className="drop-shadow-lg drop-shadow-black z-50 min-w-xs w-xs h-fit bg-white rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <form className="relative w-full h-fit p-2.5 flex flex-col gap-1.5">
        <header className="w-full h-fit">
          <h1 className="text-base text-black font-medium">Add New Habit</h1>
          <p className="text-sm text-gray-400 font-medium">
            Create a new habit to track. Set a daily goal to stay motivated.
          </p>
        </header>
        <label className="text-base text-black font-medium" htmlFor="habit">
          Add Habit:
        </label>
        <input
          required
          placeholder="eg: Learn Python"
          className="outline-none bg-[#eee] placeholder:text-gray-500 placeholder:font-medium placeholder:text-sm rounded-md p-1"
          value={habits.habit}
          onChange={(e) =>
            setHabits((pre) => ({ ...pre, habit: e.target.value }))
          }
          type="text"
          name="habit"
          id="habit"
        />
        <label
          className="text-base text-black font-medium"
          htmlFor="categories"
        >
          Category:
        </label>
        <div
          onClick={() => setShowList("category")}
          id="categories"
          className="cursor-pointer relative px-2.5 py-1.5 w-full h-fit bg-[#eee] rounded-md flex justify-start gap-2.5 items-center"
        >
          {icons[habits.icon]}
          {habits.category}
        </div>
        {showList === "category" && (
          <Categories handler={setHabits} categories={category} />
        )}
        <label className="text-base text-black font-medium" htmlFor="time">
          Timer:
        </label>
        <div
          onClick={() => setShowList("time")}
          id="time"
          className="cursor-pointer relative px-2.5 py-1.5 w-full h-fit bg-[#eee] rounded-md flex justify-start gap-2.5 items-center"
        >
          {habits.time}
        </div>
        {showList === "time" && <Time handler={setHabits} time={time} />}

        <div className="w-full h-fit flex flex-row justify-end items-center gap-2.5 mt-5">
          <button
            onClick={hundleSubmit}
            className="w-20 h-fit px-2.5 py-1.5 rounded-md font-bold text-white bg-black/90 hover:bg-white/90 hover:text-black transition-all ease-in-out duration-300 cursor-pointer"
          >
            Add
          </button>
          <button
            onClick={() => setModal(false)}
            className="w-20 h-fit px-2.5 py-1.5 rounded-md font-bold text-white bg-black/90 hover:bg-white/90 hover:text-black transition-all ease-in-out duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
