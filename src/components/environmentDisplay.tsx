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

import { environment_ } from "../shared/types/shared.types";

function EnvironmentDisplay(props: { data: environment_ }) {
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
  };

  const data = {
    labels: props.data?.map(
      (val) => val.timestamp?.split("T")[1].split(":")[0]
    ),
    datasets: [
      {
        label: "val",
        data: props.data?.map(
          (val) => val.temperature ?? val.heat ?? val.humidity
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map(() => 3),
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };

  return props.data !== undefined ? (
    <>
      <div className="flex justify-end px-4 pt-4">
        <div className=" bg-[#252525] rounded-full px-2">
          {props.data[0].temperature} {props.data[0].temperature && "C"}
          {props.data[0].heat} {props.data[0].heat && "C"}
          {props.data[0].humidity} {props.data[0].humidity && "%"}
        </div>
      </div>
      <div className="flex justify-center">
        <Line
          options={options}
          data={data}
          className=" max-h-[65vh] max-w-5xl"
        />
      </div>
    </>
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
