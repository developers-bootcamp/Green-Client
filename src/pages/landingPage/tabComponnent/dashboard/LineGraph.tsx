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
    

    const MyLineGraphData =  LineGraphData.map((element:any) => [
      element.month > 10 ? element.month + "/" + String(element.year).slice(2):
        "0" + element.month + "/" + String(element.year).slice(2),
      element.cancelled,
      element.delivered
    ]);

    const data = [
      ["date", "orders Failed", "orders Done"],
      ...MyLineGraphData
    ];
  
    return (
        LineGraphData.length > 0 ?
        <Chart
          chartType="LineChart"
          width="100%"
          height="15rem"
          data={data}
          options={options}
        />
        :<MyDiv>No data</MyDiv>
      );
}
export default LineGraph