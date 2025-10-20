import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { HabitsContext } from "../../context/habitContext";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);
export default function Barr() {
  const { todayProg } = useContext(HabitsContext);
  const date = new Date();
  const day = date.getDay();
  const [weekProg, setWeekProg] = useState(Array.from({ length: 7 }).fill(0));
  useEffect(() => {
    setWeekProg((pre) =>
      pre.map((e, i) =>
        i === day ? (pre[day] = Math.round(todayProg / (1000 * 60))) : e
      )
    );
  }, [todayProg]);
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Today's Progress",
        data: weekProg,
        backgroundColor: [
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
  };

  return <Bar options={options} data={data} />;
}
