import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { deliverCancelOrders } from "../../../../apiCalls/graphCalls";
import { MyDiv } from "./Dashboard.style";


  export const options = {
    title: "orders status",
    legend: { position: "top" },
    colors: [PALLETE.RED, PALLETE.BLUE],
    backgroundColor: PALLETE.GRAY,
  };

  const LineGraph:React.FC = () => {

    const [LineGraphData, setLineGraphData] = useState([]);
      
    useEffect(() => {
      deliverCancelOrders().then(res => {
          setLineGraphData(res.data)
      }).catch(err => {
        console.error(err)
      })
    }, []);

    const keys = LineGraphData.map((object) => Object.keys(object)).slice(-1);
    const values = LineGraphData.map((object) => Object.values(object));
    console.log(values);
    
    
    const data = [
      ...keys,
      ...values
    ];
  
    return (
        LineGraphData.length > 0 ?
        <Chart
          chartType="LineChart"
          width="100%"
          height="280px"
          data={data}
          options={options}
        />
        :<MyDiv>No data</MyDiv>
      );
}
export default LineGraph