import React from "react";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const DrawBarGraph = ({ parentWidth, data0, parentHeight, parentLeft, parentTop, xAxisData, yAxisData }) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true
  });
  const handleMouse = (event, datum) => {
    console.log(`datum - ${datum}`);
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum[xAxisData] + " = " + datum[yAxisData]
    });
  };

  const data2 = JSON.parse(data0)
  const font = parentWidth > 240 ? parentWidth / 80 : "5px";
  const xMax = parentWidth - 5 * parentLeft;
  const yMax = parentHeight - parentTop * 2;
  const x = (d) => d[xAxisData];
  const y = (d) => +d[yAxisData];
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data2.map(x),
    padding: 0.4
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data2.map(y))]
  });
  function compose(scale, accessor) {
    return (data) => scale(accessor(data));
  }
  const xPoint = compose(xScale, x);

  const yPoint = compose(yScale, y);
  return (
    <>
      <svg
        ref={containerRef}
        className="BarGraphContainer"
        width={parentWidth}
        height={parentHeight}
      >
        <Group left={70} top={-35}>
          <AxisLeft
            scale={yScale}
            top={0}
            label="Spend Hours"
            tickLabelProps={(e) => ({
              fill: "#ff0b3b",
              fontSize: font,
              textAnchor: "end",
              x: -10,
              y: yScale(e) ?? 0
            })}
          />
          {data2.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            const fillBarColor =
              barHeight < 40 ? "red" : "green";
            return (
              <>
                <Bar
                  key={`bar-${barHeight}`}
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill={fillBarColor}
                  onMouseOver={(e) => handleMouse(e, d)}
                  onMouseOut={hideTooltip}
                />
              </>
            );
          })}

          <AxisBottom
            numTicks={data2.length}
            top={yMax}
            scale={xScale}
            label="Name of Employee"
            tickLabelProps={() => ({
              fill: "blacks",
              fontSize: font,
              textAnchor: "middle"
            })}
          />
        </Group>
      </svg>
      {tooltipOpen && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
         <div style={{backgroundColor:"black",color:"white",padding:"10px"}}>{tooltipData}</div> 
        </TooltipInPortal>
      )}
    </>
  );
};

export default DrawBarGraph;
