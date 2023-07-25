import React from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';

export const data = [
    ["Year", "Order Failed", "Orders Done"],
    ["02/23", 100, 300],
    ["03/23", 117, 260],
    ["04/23", 360, 112],
    ["05/23", 103, 140],
    ["05/23", 100, 300],
  ];
  
  export const options = {
    curveType: "function",
    legend: { position: "bottom" },
    colors: [PALLETE.BLUE, PALLETE.RED],
    backgroundColor: PALLETE.GRAY,
  };

const LineGraph: React.FC = () => {
    return (
        <Chart
          chartType="LineChart"
          width="100%"
          height="280px"
          data={data}
          options={options}
        />
      );
}
export default LineGraph