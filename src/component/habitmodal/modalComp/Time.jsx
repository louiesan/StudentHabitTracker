import { useContext, useRef } from "react";
import { HabitsContext } from "../../../context/habitContext";
import useOutsideClicker from "../../../hooks/useOutsideClicker";

export default function Time({ time, handler }) {
  const { setShowList } = useContext(HabitsContext);
  const ref = useRef(null);
  useOutsideClicker(ref, () => setShowList(""));
  function handleClick(e) {
    handler((pre) => ({
      ...pre,
      time: e.time,
      value: e.value,
    }));
    setShowList("");
  }

  return (
    <ul
      ref={ref}
      className="z-10 absolute top-[70%] left-[3%] drop-shadow-sm drop-shadow-black w-[95%] h-fit bg-[#eee]  rounded-md"
    >
      {time.map((e, i) => (
        <li
          key={i}
          onClick={() => handleClick(e)}
          className="cursor-pointer px-2.5 py-1.5 w-full hover:opacity-80 hover:bg-black/70 h-fit bg-[#eee] rounded-md flex justify-start gap-2.5 items-center transition-all duration-300 ease-in-out"
        >
          {e.time}
        </li>
      ))}
    </ul>
  );
}
