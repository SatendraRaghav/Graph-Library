import React from "react";
import DrawLineGraph from "./DrawLineGraph";

const LineGraph = ({value}) => {
  return (
    <div style={value.style.containerStyle}>
     <div style={value.style.headerStyle}>{value.content.header}</div>
      <DrawLineGraph
       value={value}
      />
    </div>
  );
};

export default LineGraph;
