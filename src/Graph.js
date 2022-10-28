import React from 'react'
import BarGraph from './components/VisxGraph/BarGraph/BarGraph'
import LineGraph from './components/VisxGraph/LineGraph/LineGraph'
import PieGraph from './components/VisxGraph/PieGraph/PieGraph'
import MixGraph from './components/VisxGraph/MixGraph/MixGraph'

const Graph = ({type,data0,xAxisData,yAxisData}) => {
  return (
    <div style={{  fontFamily: "sans-serif",
        margin: 0,
        boxSizing: "border-box"}}>
       {
       (()=>{
        switch(type){
            case "BarGraph":
                return <BarGraph data0={data0} xAxisData={xAxisData} yAxisData={yAxisData} />
            case "LineGraph":
                return <LineGraph data0={data0} xAxisData={xAxisData} yAxisData={yAxisData}/>
            case "PieGraph":
                    return <PieGraph data0={data0} />
            case "MixGraph":
                    return <MixGraph data0={data0} xAxisData={xAxisData} yAxisData={yAxisData}/>
            default:
                return(
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <h1>Please select type of graph</h1>
                    </div>
                )
        }
       })()}
    </div>
  )
}

export default Graph;