import { ThreeCircles } from "react-loader-spinner";
import { environment_ } from "../shared/types/shared.types";

function BilgeDisplay(props: { data: environment_ }) {
  return props.data !== undefined ? (
    <div className="flex justify-center py-10">
      {props.data[0].bilgeStatus ? <div>true</div> : <div>false</div>}
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
export default BilgeDisplay;
