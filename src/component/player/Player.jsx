import { ChevronFirst, ChevronLast, Pause, Play, X } from "lucide-react";
import {
  nasheedOne,
  nasheedTwo,
  nasheedThree,
  firstNasheed,
  secondNasheed,
  thirdNasheed,
} from "../../assets/imageNash";
import { useContext, useEffect, useRef, useState } from "react";
import { HabitsContext } from "../../context/habitContext";

export default function Player() {
  const { setPlayer, player } = useContext(HabitsContext);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [index, setIndex] = useState(0);
  const visibility = {
    display: player ? "flex" : "none",
  };

  function handlePlay() {
    audioRef.current.play();
    audioRef.current.volume = 0.1;
    setIsPlaying(true);
  }
  function handlePause() {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  function hundlePlayPause() {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }

  function hundleUpdateTime() {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration ? audioRef.current.duration : 0);
  }

  function handleChange(e) {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  }

  function hundleNext() {
    index === nasheeds.length - 1 ? setIndex(0) : setIndex((pre) => pre + 1);
    setIsPlaying(false);
  }
  function hundlePrev() {
    index === 0 ? setIndex(nasheeds.length - 1) : setIndex((pre) => pre - 1);
    setIsPlaying(false);
  }

  const nasheeds = [
    {
      name: "Al-Hayat Slowed Reverb",
      src: firstNasheed,
      img: nasheedOne,
    },
    {
      name: "Hona Maroo Nasheed Slowed",
      src: secondNasheed,
      img: nasheedTwo,
    },
    {
      name: "Ya Ummi Slowed Reverb",
      src: thirdNasheed,
      img: nasheedThree,
    },
  ];

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", hundleUpdateTime);

    () => {
      audioRef.current.removeEventListener("timeupdate", hundleUpdateTime);
    };
  }, []);

  return (
    <div
      style={visibility}
      className="animate-showlist z-50 absolute w-fit h-fit top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white/90 border border-white drop-shadow-black drop-shadow-lg transition-all duration-100 ease-in-out"
    >
      <div className="p-2.5 flex flex-col items-center justify-evenly gap-1.5 z-50 relative w-3xs max-h-[400px] h-[400px]  ">
        <button
          style={visibility}
          onClick={() => setPlayer(false)}
          className="absolute top-1 right-1 cursor-pointer p-1 bg-red-200 rounded-full hover:bg-red-400 hover:text-white transition-all duration-100 ease-in-out"
        >
          <X />
        </button>
        <img
          className="w-40 h-40 rounded-md"
          src={nasheeds[index].img}
          alt="nasheedCover"
        />
        <h1 className="text-xl font-bold captilize">{nasheeds[index].name}</h1>
        <div className="w-full h-fit flex flex-col items-center justify-center">
          <input
            min="0"
            onChange={handleChange}
            value={currentTime}
            max={duration}
            className="slider appearance-none w-full bg-rose-400 h-2 rounded-md"
            type="range"
          />
          <div className="w-full h-fit flex flex-row items-center justify-between">
            <span>{`${Math.floor(currentTime / 60)}:${Math.floor(
              currentTime % 60
            )
              .toString()
              .padStart(2, "0")}`}</span>
            <span>{`${Math.floor(duration / 60)}:${Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}`}</span>
          </div>
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-2.5">
          <button
            onClick={hundleNext}
            className="flex justify-center items-center font-bold cursor-pointer w-12 h-12 rounded-full bg-purple-400 text-black"
          >
            <ChevronFirst />
          </button>
          <button
            onClick={hundlePlayPause}
            className="flex justify-center items-center font-bold cursor-pointer w-14 h-14 rounded-full bg-purple-400 text-black"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button
            onClick={hundlePrev}
            className="flex justify-center items-center font-bold cursor-pointer w-12 h-12 rounded-full bg-purple-400 text-black"
          >
            <ChevronLast />
          </button>
        </div>
        <audio ref={audioRef} src={nasheeds[index].src} loop />
      </div>
    </div>
  );
}
