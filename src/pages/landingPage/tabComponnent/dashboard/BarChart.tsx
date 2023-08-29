import React from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { styled } from '@mui/material/styles';

interface prop{
  BarChartData:{[key:string]:any}[]
}

const BarChart:React.FC<prop>=({BarChartData}) => {

  const MyBarChartitels = BarChartData.map(x => x.product.name)

    const month = BarChartData.map(x => x.month + "/" + x.year)
    

  const MyBarChartData = BarChartData.map(x => [x.month + "/" + x.year, x.totalQuantity])
    console.log(MyBarChartData);

    const MyDiv = styled('div')({
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
  });

  const MyLabel = styled('label')({
     fontSize: 20,
     paddingTop: 130,
  }); 

    return (
      MyBarChartData.length > 0 ?
        <Chart
          width={"100%"}
          height={"280px"}
          chartType="ColumnChart"
          data={[ 
            MyBarChartitels.length > 0 ? [...MyBarChartitels] : [""],
            //["Duration", "Photo Album", "Collage","Framed Image","Video Clip","Blessing Card"],
            ["04/23", 20, 38, 15],
            ["05/23", 10, 10, 15],
            ["06/23", 10, 10, 15],
          ]}
          options={{
            chartArea: { width: "50%" },
            isStacked: true,
            vAxis: {
              title: "",
              gridlines: { color: "none" },
              textPosition: "none"
            },
            bars: "vertical",
            colors: [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW],
            backgroundColor: PALLETE.GRAY,
          }}
          rootProps={{ "data-testid": "3" }}
        />
        :<MyDiv><MyLabel>No data</MyLabel></MyDiv>
      );
}
export default BarChart
