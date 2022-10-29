import React from "react";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { localPoint } from "@visx/event";


const DrawBarGraph = ({ value, parentWidth, parentHeight, parentLeft, parentTop }) => {
  const data = value.data;
  const arr = (value.content.xAxisValue && value.content.yAxisValue) ? [xAxisValue, yAxisValue] : Object.keys(data[0]);
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
      tooltipData: datum[arr[0]] + " = " + datum[arr[1]]
    });
  };


  const xMax = parentWidth - 5 * parentLeft;
  const yMax = parentHeight - parentTop * 2;
  const x = (d) => d[arr[0]];
  const y = (d) => +d[arr[1]];
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y))]
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
        width={parentWidth}
        height={parentHeight}
      >
        <Group left={70} top={-30} >
          <AxisLeft
            scale={yScale}
            top={0}
            label={value.content.leftLabel}
            labelOffset={45}
            tickLabelProps={(e) => ({
              fill: value.style.labelStyle.labelColor,
              fontSize: parentWidth > 450 ? parentWidth / 90 : parentWidth / 50,
              textAnchor: "end",
              x: -10,
              y: yScale(e) ?? 0
            })}
          />
          {data.map((d, i) => {
            const barHeight = yMax - yPoint(d);
            const fillBarColor = barHeight < 25 ? value.style.barStyle.lowValueColor : (barHeight > 75 ? value.style.barStyle.highValueColor : value.style.barStyle.mediumValueColor);
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
            numTicks={data.length}
            top={yMax}
            scale={xScale}
            label={value.content.bottomLabel}
            tickLabelProps={() => ({
              fill: value.style.labelStyle.labelColor,
              fontSize: parentWidth > 450 ? parentWidth / 90 : parentWidth / 50,
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
          <div style={value.style.tooltipStyle}>{tooltipData}</div>
        </TooltipInPortal>
      )}
    </>
  );
};

export default DrawBarGraph;
