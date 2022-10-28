import React from 'react'
import { Graph } from 'auth-component-library';
import { letterFrequency } from "@visx/mock-data";

const App = () => {
  const d = JSON.stringify(letterFrequency)
  return (
    <div>
       <Graph type="BarGraph" data0={d} xAxisData={'letter'} yAxisData={'frequency'} />
       <Graph type= "LineGraph" />
     
         <Graph type= "PieGraph" />
         <Graph type="MixGraph"  />
       </div>
  )
}

export default App