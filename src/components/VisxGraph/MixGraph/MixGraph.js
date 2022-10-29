import React from "react";
import { ParentSize } from "@visx/responsive";
import NewBarLineGraph from "./NewBarLineGraph";

const MixGraph = ({value}) => {
  let MixBarGraphRender = (
    <ParentSize>
      {(parent) => (
        <div style={{position:"relative"}}>
        <NewBarLineGraph
          parentWidth={parent.width}
          parentHeight={parent.height}
          parentTop={15}
          parentLeft={15}
          parentRef={parent.ref}
          resizeParent={parent.resize}
          value={value}
        />
        </div>
      )}
    </ParentSize>
  );


  return (
    <>
   <div>
   <div style={{...value.style.headerStyle,background:value.style.containerStyle.background,width:value.style.containerStyle.width}}>{value.content.header}</div>
    <div style={{...value.style.containerStyle}} > 
       {MixBarGraphRender}
    </div>
   </div>
    </>
  );
};

export default MixGraph;
