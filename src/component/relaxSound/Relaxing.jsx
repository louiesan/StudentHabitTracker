import {
  CloudLightning,
  CloudRainWind,
  Shell,
  Trees,
  Waves,
} from "lucide-react";
import { useContext, useRef } from "react";
import { forest, rainThunder, rainonly, water } from "../../assets/imageNash";
import { HabitsContext } from "../../context/habitContext";

export default function Relaxing() {
  const { atmospherePlayer } = useContext(HabitsContext);
  const atmosphere = useRef(null);

  const hundleClick = (sound) => {
    if (sound) {
      atmosphere.current.src = sound;
      atmosphere.current.play();
      atmosphere.current.volume = 0.5;
    } else {
      atmosphere.current.pause();
    }
  };
  return (
    <ul
      className={`animate-showlist w-fit h-fit bg-amber-50 rounded-2xl flex flex-row items-center justify-center gap-2.5 absolute top-10 right-0 ${
        atmospherePlayer ? "flex" : "hidden"
      }`}
    >
      <li
        title="rain-only"
        onClick={() => hundleClick(rainonly)}
        className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-amber-200 transition-all duration-100 ease-in-out"
      >
        <CloudRainWind />
      </li>
      <li
        title="rain&thunder"
        onClick={() => hundleClick(rainThunder)}
        className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-amber-200 transition-all duration-100 ease-in-out"
      >
        <CloudLightning />
      </li>
      <li
        title="water-fall"
        onClick={() => hundleClick(water)}
        className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-amber-200 transition-all duration-100 ease-in-out"
      >
        <Waves />
      </li>
      <li
        title="natureSound"
        onClick={() => hundleClick(forest)}
        className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-amber-200 transition-all duration-100 ease-in-out"
      >
        <Trees />
      </li>
      <li
        title="none"
        onClick={() => hundleClick(null)}
        className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-amber-200 transition-all duration-100 ease-in-out"
      >
        <Shell />
      </li>
      <audio ref={atmosphere} loop></audio>
    </ul>
  );
}
