import { useState, CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const style: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  height: "100vh",
};

const Loading = () => {
  let [color] = useState("#239695");
  return (
    <div style={style}>
      <SyncLoader color={color} loading={true} size={25} margin={5} />
    </div>
  );
};

export default Loading;
