import { ThreeCircles } from "react-loader-spinner";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { environment_, environmentByDays_ } from "../shared/types/shared.types";

const getHour = (str: string | undefined) => {
  return str !== undefined ? str.split("T")[1].split(":")[0] : "null";
};

const relevantLabels = (data: environmentByDays_) => {
  if (data === undefined) {
    return [];
  }
  const labels: string[] = Array.from(
    new Set(
      data.flatMap((innerArray) =>
        innerArray.map((item) => getHour(item.timestamp))
      )
    )
  );
  return labels.sort();
};

const processData = (data: environment_, hours: string[]) => {
  if (data === undefined) {
    return;
  }
  const dataList: (number | null)[] = hours.map((hour) => {
    const indexInB = data.findIndex((item) => getHour(item.timestamp) === hour);
    return indexInB !== -1
      ? data[indexInB].temperature ??
          data[indexInB].heat ??
          data[indexInB].humidity ??
          null
      : null;
  });
  return dataList;
};

function EnvironmentDisplay(props: { data: environmentByDays_ }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Environment Chart",
      },
    },
    scales: {
      y: {
        //should be changeable
        suggestedMin: 20,
        suggestedMax: 25,
      },
    },
  };

  const labels = relevantLabels(props.data);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Today",
        data: processData(props.data ? props.data[0] : undefined, labels),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "yesterday",
        data: processData(props.data ? props.data[1] : undefined, labels),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return props.data !== undefined ? (
    <div className="flex justify-center relative">
      <div className=" bg-[#252525] rounded-full px-2 absolute top-2 right-2">
        {props.data[0][0].temperature} {props.data[0][0].temperature && "C"}
        {props.data[0][0].heat} {props.data[0][0].heat && "C"}
        {props.data[0][0].humidity} {props.data[0][0].humidity && "%"}
      </div>
      <Line options={options} data={data} className=" max-h-[65vh] max-w-5xl" />
    </div>
  ) : (
    <div className="flex justify-center py-10">
      <ThreeCircles
        height="60"
        width="60"
        color="#006700"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}

export default EnvironmentDisplay;
