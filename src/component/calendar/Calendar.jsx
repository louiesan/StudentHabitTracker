import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Calendary() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [allDays, setAllDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const prevEndDate = new Date(year, month, 0).getDate();

  function hundlePev() {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  }
  function hundleNext() {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  }

  function getDays() {
    try {
      let currentDays = [];
      for (let i = start; i > 0; i--) {
        currentDays.push(
          <li className=" text-center rounded-full font-medium text-base opacity-50">
            {prevEndDate - i + 1}
          </li>
        );
      }
      console.log(currentDays);

      for (let i = 1; i <= endDate; i++) {
        currentDays.push(
          <li
            className={` text-center rounded-full font-medium text-base ${
              i === date.getDate() && month === date.getMonth()
                ? "bg-black text-white"
                : "text-black"
            }`}
          >
            {i}
          </li>
        );
      }
      console.log(currentDays);

      for (let i = end; i < 6; i++) {
        currentDays.push(
          <li className=" text-center rounded-full font-medium text-base opacity-50">
            {i - end + 1}
          </li>
        );
      }
      setAllDays(currentDays);
      console.log(currentDays);
    } catch (e) {
      console.log(e, "Has Occured");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDays();
  }, [month]);
  return (
    <div className="w-full max-w-xs rounded-md flex-col p-2.5 bg-white">
      <div className="w-full h-fit flex items-center justify-between">
        <h1>
          {Months[month]} {year}
        </h1>
        <div className="w-fit h-fit flex gap-1.5 cursor-pointer">
          <ArrowLeft onClick={() => hundlePev()} />
          <ArrowRight onClick={() => hundleNext()} />
        </div>
      </div>
      <ul className="w-full h-fit grid grid-cols-7 gap-1.5 justify-center items-center">
        {days.map((e, i) => (
          <li
            key={i}
            className="w-auto text-base text-center font-bold text-black"
          >
            {e}
          </li>
        ))}
      </ul>
      <ul className="w-full h-fit grid grid-cols-7 gap-1.5">
        {loading ? (
          <div className="w-20 h-20 animate-spin border-2  border-black border-t-white"></div>
        ) : (
          allDays
        )}
      </ul>
    </div>
  );
}
