import React from "react";
import DrawPieGraph from "./DrawPieGraph";
import { ParentSize } from "@visx/responsive";



const PieGraph = ({ value }) => {
  let PieRender = (
    <ParentSize>
      {(parent) => (
        <DrawPieGraph
          parentWidth={parent.width}
          parentHeight={value.style.containerStyle.height}
          parentRef={parent.ref}
          resizeParent={parent.resize}
          value={value}
        />
      )}
    </ParentSize>
  );
  return <div style={value.style.containerStyle}>
    <div style={value.style.headerStyle}>{value.content.header}</div>
    {PieRender}</div>;
};

export default PieGraph;
