import React, { useState } from "react";
import DrawBarGraph from '../BarGraph/DrawBarGraph'
import { ParentSize } from "@visx/responsive";
import DrawMixGraph from "./DrawMixGraph";
import NewBarLineGraph from "./NewBarLineGraph";

const MixGraph = () => {
  const [width, setWidth] = useState();
  let MixBarGraphRender = (
    <ParentSize>
      {(parent) => (
        <div className="MixgraphContaine">
        <NewBarLineGraph
          parentWidth={parent.width}
          parentHeight={400}
          parentTop={15}
          parentLeft={15}
          parentRef={parent.ref}
          resizeParent={parent.resize}
        />
        </div>
      )}
    </ParentSize>
  );


  return (
    <>
   
    <div style={{}}>
       <h1 style={{textAlign:"center",textDecoration:"underline"}}>Mix Line-Bar graph By Visx</h1>
      <div style={{position:"relative"}}>{MixBarGraphRender}</div>
    
    </div>
   
    </>
  );
};

export default MixGraph;
