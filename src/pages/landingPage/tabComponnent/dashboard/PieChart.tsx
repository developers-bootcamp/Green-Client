import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config'; 
import {topEmployee} from "../../../../apiCalls/graphCalls";
import { MyDiv } from "./Dashboard.style";

  export const options = {
    title:"Top employees",
    colors: [PALLETE.BLUE, PALLETE.RED, PALLETE.GREEN, PALLETE.ORANGE,  PALLETE.YELLOW],
    backgroundColor: PALLETE.GRAY
  };
  
  const PieChart:React.FC = () => {

    const [PieChartData, setPieChartData] = useState([]);

    useEffect(() => {
      topEmployee().then(res => {
        setPieChartData(res.data)
      }
    ).catch(err => {
      console.error(err)
    })
    }, []);

    const keys = PieChartData.map((object) => Object.keys(object)).slice(-1);

    const MyPieChartData =  PieChartData.map((employee:any) => [
      employee.user.fullName,
      employee.countOfDeliveredOrders,
    ]);

    const data = [
      ...keys,
      ...MyPieChartData
    ];

    return (
        PieChartData.length > 0 ?
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"280px"}
        />
        :<MyDiv>No data</MyDiv>
      )
}
export default PieChart