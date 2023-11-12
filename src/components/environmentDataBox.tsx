import React from "react";
import { ThreeCircles } from "react-loader-spinner";

import { environment_ } from "../shared/types/shared.types";

function EnvironmentDataBox(props: { data: environment_ }) {
  return props.data !== undefined ? (
    <div>
      {props.data.map((value) => (
        <React.Fragment key={value.timestamp}>
          <h2>
            hfjfj: {value.temperature}
            {value.heat}
            {value.humidity} C or %
          </h2>
        </React.Fragment>
      ))}
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

export default EnvironmentDataBox;
