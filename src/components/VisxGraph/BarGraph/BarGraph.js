import React from "react";
import DrawBarGraph from "./DrawBarGraph";
import { ParentSize } from "@visx/responsive";


const BarGraph = ({data0,xAxisData,yAxisData}) => {
  let GraphRender = (
    <ParentSize>
      {(parent) => (
        <DrawBarGraph
          parentWidth={parent.width}
          parentHeight={400}
          parentTop={20}
          parentLeft={15}
          data0={data0}
          xAxisData={xAxisData}
          yAxisData={yAxisData}
          // this is the referer to the wrapper component
          parentRef={parent.ref}
          // this function can be called inside MySuperCoolVisxChart to cause a resize of the wrapper component
          resizeParent={parent.resize}
        />
      )}
    </ParentSize>
  );

  return <div className="App">
    <h1 style={{textAlign:"center",textDecoration:"underline"}}>Bar graph By Visx</h1>
    {GraphRender}
    </div>;
};
export default BarGraph;
