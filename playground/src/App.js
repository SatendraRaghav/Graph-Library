import React from 'react'
import { Graph } from 'auth-component-library';
import { letterFrequency } from "@visx/mock-data";

const App = () => {
  const Product1 = [
    { x: "2015", y: 200 },
    { x: "2016", y: 1200 },
    { x: "2017", y: 1500 },
    { x: "2018", y: 500 }
  ];
  const Product2 = [
    { x: "2015", y: 700 },
    { x: "2016", y: 1000 },
    { x: "2017", y: 450 },
    { x: "2018", y: 3600 }
  ];
  const Product3 = [
    { x: "2015", y: 200 },
    { x: "2016", y: 700 },
    { x: "2017", y: 1000 },
    { x: "2018", y: 500 }
  ];
  const value = {
    type: "Mixgraph",
    data: letterFrequency,
    content: {
      header: "Line Graph Dynamic",
      bottomLabel: "Name of Employe",
      leftLabel: "Value",
      tooltipDataKey: ["MAMA New Project"],

      xAxisValue: "",
      yAxisValue: "",

    },
    style: {
      containerStyle: {
        background: "linear-gradient(to left,#F1FFAD,#BEADFF)", width: "50%", height: "400px",
        borderRadius: "20px", padding: "10px 0 2px 0"
      },
      headerStyle: { textAlign: "center", padding: "5px 0 15px 0" },

      labelStyle: {
        labelColor: "red",
      },
      barStyle: {
        mediumValueColor: "yellow",
        highValueColor: "green",
        lowValueColor: "red"
      }
      ,
      lineStyle: {
        colorRange: ["rgba(0,250,41,1)",
          "rgba(200,0,31,0.9)",
          "rgba(25,200,205,0.6)"],
      },

      pieStyle: {
        colorRange: ["rgba(0,250,41,1)",
          "rgba(200,0,31,0.9)",
          "rgba(25,200,205,0.6)"],
        outerRadius: 0,
        innerRadius: 50,
        cornerRadius: 15,
        padAngle: 0.006,
      }
    }
  }
  let value2 = JSON.stringify(value)

  return (
    <div>

      <Graph value={value2} />
    </div>
  )
}

export default App