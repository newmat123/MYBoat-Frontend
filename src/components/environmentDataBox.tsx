import React from "react";
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
    <div className="text-center">loading...</div>
  );
}

export default EnvironmentDataBox;
