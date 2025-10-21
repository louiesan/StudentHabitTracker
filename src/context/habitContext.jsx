import { createContext, useEffect, useState } from "react";
import { Gamepad2, LucideBookType, RadarIcon, Target } from "lucide-react";

import useLocalStorage from "../hooks/useLocalStorage";

export const HabitsContext = createContext(null);

export default function GlobalContext({ children }) {
  const [modal, setModal] = useState(false);
  const [player, setPlayer] = useState(false);
  const [allHabits, setAllHabits] = useLocalStorage("allhabits", []);
  const [finished, setFinished] = useLocalStorage("finished", []);
  const [todayProg, setTodayProg] = useLocalStorage("progress", 0);
  const [showList, setShowList] = useState("");
  const [atmospherePlayer, setAtmospherePlayer] = useState(false);
  const icons = {
    LucideBookType: <LucideBookType />,
    Target: <Target />,
    RadarIcon: <RadarIcon />,
    Gamepad2: <Gamepad2 />,
  };

  function removeHabit(habit) {
    if (allHabits.find((e) => e.id === habit.id)) {
      const id = habit.id;
      const newHabits = allHabits.filter((e) => e.id !== id);
      const newFinished = finished.filter((e) => e.id !== id);
      setAllHabits(newHabits);
      setFinished(newFinished);
    }
  }

  useEffect(() => {
    if (allHabits && allHabits.length <= 0) {
      setTodayProg(0);
    }
  }, [allHabits]);

  return (
    <HabitsContext.Provider
      value={{
        icons,
        modal,
        setModal,
        allHabits,
        setAllHabits,
        showList,
        setShowList,
        finished,
        setFinished,
        todayProg,
        setTodayProg,
        removeHabit,
        player,
        setPlayer,
        atmospherePlayer,
        setAtmospherePlayer,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}
