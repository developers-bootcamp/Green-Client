import React from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { styled } from '@mui/material/styles';

interface prop{
  LineGraphData:{[key:string]:any}[]
}
  
  export const options = {
    curveType: "function",
    legend: { position: "bottom" },
    colors: [PALLETE.BLUE, PALLETE.RED],
    backgroundColor: PALLETE.GRAY,
  };

  const MyDiv = styled('div')({
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
});

const MyLabel = styled('label')({
   fontSize: 20,
   paddingTop: 130,
}); 


  const LineGraph:React.FC<prop>=({LineGraphData}) => {

    const MyLineGraphData = LineGraphData.map(x => [x.month, x.cancelled, x.delivered])
    
    console.log(MyLineGraphData);

    const data = [
      ["month", "Orders Failed", "Orders Done"],
      ...MyLineGraphData
    ];

    return (
      MyLineGraphData.length > 0 ?
        <Chart
          chartType="LineChart"
          width="100%"
          height="280px"
          data={data}
          options={options}
        />
        :<MyDiv><MyLabel>No data</MyLabel></MyDiv>
      );
}
export default LineGraph