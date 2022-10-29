import React from "react";
import {
  AnimatedAxis,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  AnimatedGrid
} from "@visx/xychart";

const DrawGraph = ({ value }) => {
  const data = value.data;
  const arr = (value.content.xAxisValue && value.content.yAxisValue) ? [xAxisValue, yAxisValue] : Object.keys(data[0][0]);

  const accessors = { xAccessor: (d) => d[arr[0]], yAccessor: (d) => d[arr[1]] };
  return (
    <XYChart height={300} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="left" label={value.content.leftLabel} left={72} labelOffset={32} stroke={value.style.labelStyle.labelColor} />
      <AnimatedAxis orientation="bottom" label={value.content.bottomLabel} stroke={value.style.labelStyle.labelColor} />
      <AnimatedGrid columns={true} numTicks={value.data[0].length} />
      {
        value.data.map((elem, i) => {
          return (
            <AnimatedLineSeries
              dataKey={value.content.tooltipDataKey[i]}
              data={elem}
              stroke={value.style.lineStyle.colorRange[i]}
              {...accessors}
            />)
        })
      }

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {", "}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}
          </div>
        )}
      />
    </XYChart>
  );
};

export default DrawGraph;
