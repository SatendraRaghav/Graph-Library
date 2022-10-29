import React from 'react'
import BarGraph from './components/VisxGraph/BarGraph/BarGraph'
import LineGraph from './components/VisxGraph/LineGraph/LineGraph'
import PieGraph from './components/VisxGraph/PieGraph/PieGraph'
import MixGraph from './components/VisxGraph/MixGraph/MixGraph'

const Graph = ({value}) => {
    let valueObj = JSON.parse(value);
  return (
    <div style={{  fontFamily: "sans-serif",
        margin: 0,
        boxSizing: "border-box"}}>
       {
       (()=>{
        switch(valueObj.type){
            case "Bargraph":
                return <BarGraph value={valueObj}  />
            case "Linegraph":
                return <LineGraph value={valueObj} />
            case "Piegraph":
                    return <PieGraph value={valueObj} />
            case "Mixgraph":
                    return <MixGraph value={valueObj}/>
            default:
                return " "
        }
       })()}
    </div>
  )
}

export default Graph;