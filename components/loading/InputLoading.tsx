import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const InputLoading = () => {
  let [color] = useState("#fff");
  return <PulseLoader color={color} loading={true} size={8} margin={2} />;
};

export default InputLoading;
