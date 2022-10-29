import React from "react";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { GradientPinkBlue } from "@visx/gradient";
import { letterFrequency } from "@visx/mock-data";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";


const DrawPieGraph = ({ value, parentWidth, parentHeight }) => {
  const letters = value.data;
  const arr = (value.content.xAxisValue && value.content.yAxisValue) ? [xAxisValue, yAxisValue] : Object.keys(letters[0]);
  const frequency = (d) => d[arr[1]];
  const getLetterFrequencyColor = scaleOrdinal({
    domain: letters.map((l) => l[arr[0]]),
    range: value.style.pieStyle.colorRange
  });
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip();
  const { TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true
  });
  const handleMouse = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum[arr[0]] + " = " + datum[arr[1]]
    });
  };

  const innerWidth = parentWidth - 40;
  const innerHeight = parentHeight - 40;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;
  const left = centerX + 20;
  const top = centerY + 20;
  const pieSortValues = (a, b) => a - b;
  return (
    <>
      <svg
        width={parentWidth}
        height={parentHeight}
        className="pieGraphContainer"
      >
        <GradientPinkBlue id="visx-pie-gradient" />
        <Group top={top} left={left}>
          <Pie
            data={letters}
            pieSortValues={pieSortValues}
            pieValue={frequency}
            outerRadius={radius - value.style.pieStyle.outerRadius}
            innerRadius={radius - value.style.pieStyle.innerRadius}
            cornerRadius={value.style.pieStyle.cornerRadius}
            padAngle={value.style.pieStyle.padAngle}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const letter = arc.data[arr[0]][0];
                const [centriodX, centriodY] = pie.path.centroid(arc);
                const arcPath = pie.path(arc);
                const arcFill = getLetterFrequencyColor(letter);
                return (
                  <g
                    key={`arc-${letter}-${index}`}
                    onMouseOut={hideTooltip}
                    onMouseOver={(e) => handleMouse(e, arc.data)}
                    className="pieTooltipHolder"
                  >
                    <path d={arcPath} fill={arcFill} />
                    <Text
                      x={centriodX}
                      y={centriodY}
                      dy={"0.33em"}
                      fontSize={14}
                      fill={value.style.labelStyle.labelColor}
                      textAnchor={"middle"}
                      pointerEvents={"none"}
                    >
                      {letter}
                    </Text>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop + 290}
          left={tooltipLeft - 90}
        >
          <div
            style={value.style.tooltipStyle}>{tooltipData}</div>
        </TooltipInPortal>
      )}
    </>
  );
};
export default DrawPieGraph;
