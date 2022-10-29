import React from "react";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { useTooltipInPortal } from "@visx/tooltip";
import {
  AnimatedLineSeries,
  XYChart,
  Tooltip
} from "@visx/xychart";

const NewBarLineGraph = ({ value, parentWidth, parentHeight, parentLeft, parentTop }) => {
  let data = value.data;
  const arr = (value.content.xAxisValue && value.content.yAxisValue) ? [xAxisValue, yAxisValue] : Object.keys(data[0]);
  const accessors = { xAccessor: (d) => d[arr[0]], yAccessor: (d) => d[arr[1]] };

  const { containerRef } = useTooltipInPortal({
    detectBounds: true,
    scroll: true
  });


  const font = parentWidth > 240 ? parentWidth / 80 : "5px";
  const xMax = parentWidth - 5 * parentLeft;
  const yMax = parentHeight - parentTop * 2;
  const x = (d) => d[arr[0]];
  const y = (d) => +d[arr[1]];
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4,
  });

  const yScale = scaleLinear({
    range: [yMax, 70],
    round: false,
    domain: [0, Math.max(...data.map(y))]
  });
  function compose(scale, accessor) {
    return (data) => scale(accessor(data));
  }
  const xPoint = compose(xScale, x);

  const yPoint = compose(yScale, y);
  return (
    <>



      <div style={{ position: "absolute", top: 0, left: 20, zIndex: 2 }}>
        <XYChart height={parentHeight} width={parentWidth} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
          <AnimatedLineSeries
            dataKey={value.content.tooltipDataKey[0]}
            data={data}
            stroke={value.style.lineStyle.colorRange[0]}
            {...accessors}
          />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (
              <div >
                <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                  {tooltipData.nearestDatum.key}
                </div>
                {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                {"----"}
                {accessors.yAccessor(tooltipData.nearestDatum.datum)}
              </div>
            )}
          />
        </XYChart>
      </div>
      <svg
        ref={containerRef}
        style={{ position: "absolute", top: 0, left: 0 }}
        width={parentWidth}
        height={parentHeight}
      >
        <Group left={60} top={-20} >
          <AxisLeft
            scale={yScale}
            top={0}
            label={value.content.leftLabel}
            tickLabelProps={(e) => ({
              fill: value.style.labelStyle.labelColor,
              fontSize: font,
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

                  x={d === 1 ? 40 : xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}

                  fill={fillBarColor}
                />
                <circle
                  key={`circle-${barHeight}`}
                  r={6}
                  cx={xScale(x(d)) + xScale.bandwidth() / 2}

                  cy={yScale(y(d))}
                  stroke="rgba(33,133,233,0.9)"
                  fill="black"
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
              fontSize: font,
              textAnchor: "middle"
            })}
          />
        </Group>
      </svg>
    </>
  );
}

export default NewBarLineGraph;