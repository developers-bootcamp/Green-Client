import React from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';


const BarChart: React.FC = (props) => {

    return (
        <Chart
          width={"100%"}
          height={"280px"}
          chartType="ColumnChart"
          data={[
            ["Duration", "Photo Album", "Collage","Framed Image","Video Clip","Blessing Card"],
            ["04/23", 20, 38, 15, 30, 20],
            ["05/23", 10, 10, 15, 30, 20],
            ["06/23", 10, 10, 15, 30, 20],
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
      );
}
export default BarChart
