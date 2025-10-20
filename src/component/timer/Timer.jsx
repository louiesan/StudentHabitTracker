import { Pause, Play, SquareStop } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { HabitsContext } from "../../context/habitContext";

export default function Timer({ time, setProgress, progress }) {
  const { setTodayProg } = useContext(HabitsContext);
  const [remaining, setRemaining] = useState(time);
  const [running, setRunning] = useState(false);
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);
  const timer = useRef(null);
  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setRemaining((pre) => pre - 1000);
        setProgress((pre) => pre + 1000);
        setTodayProg((pre) => pre + 1000);
      }, 1000);
    }
    return () => clearInterval(timer.current);
  }, [running]);

  useEffect(() => {
    if (remaining <= 0) {
      clearInterval(timer.current);
      setRunning(false);
    }
  }, [remaining]);

  return (
    <>
      <div className="w-full h-fit pb-1.5 pt-2.5 flex justify-center items-center text-2xl font-[Math] font-bold text-orange-400">
        {hours !== 0 && `${hours.toString().padStart(2, 0)}:`}
        {minutes.toString().padStart(2, 0)}:{seconds.toString().padStart(2, 0)}
      </div>
      <div className="w-full h-fit pt-1.5 pb-2.5 flex justify-center items-center gap-2.5">
        <button
          onClick={() => setRunning((pre) => !pre)}
          className="w-fit h-fit px-2.5 py-1.5 rounded-sm bg-amber-500 text-white cursor-pointer flex items-center justify-center gap-1.5"
        >
          {running ? (
            <>
              <Pause /> Pause
            </>
          ) : (
            <>
              <Play /> Start
            </>
          )}
        </button>
        {remaining !== time && (
          <button
            onClick={() => {
              setRunning(false);
              setRemaining(time);
            }}
            className="w-fit h-fit px-2.5 py-1.5 rounded-md text-white bg-indigo-400/80 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <>
              <SquareStop /> Reset
            </>
          </button>
        )}
      </div>
    </>
  );
}
