import React from "react";
import DrawBarGraph from "./DrawBarGraph";
import { ParentSize } from "@visx/responsive";

const BarGraph = ({ value }) => {

  let GraphRender = (
    <ParentSize>
      {(parent) => (
        <DrawBarGraph
          parentWidth={parent.width}
          parentHeight={value.style.containerStyle.height}
          parentTop={20}
          parentLeft={15}
          value={value}
          parentRef={parent.ref}
          resizeParent={parent.resize}
        />
      )}
    </ParentSize>
  );

  return <div style={value.style.containerStyle}>
    <div style={value.style.headerStyle}>{value.content.header}</div>
    {GraphRender}
  </div>;
};
export default BarGraph;
