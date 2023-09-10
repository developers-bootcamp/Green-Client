import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { MyDiv } from "./Dashboard.style";
import { topProduct } from "../../../../apiCalls/graphCalls";

export const options = {
  chartArea: { width: "50%" },
  isStacked: true,
  title:"Top products",
  bars: "vertical",
  colors: [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW],
  backgroundColor: PALLETE.GRAY,
}

const BarChart:React.FC = () => {
      
  const [BarChartData, setBarChartData] = useState([]);
    
  

  useEffect(() => {
    topProduct().then(res => {
      console.log(res.data);
      
          setBarChartData(res.data)
      }).catch(err => {
        console.error(err,"lll")
      })
    }, []);

 
    const products =  BarChartData.map((monthlyProductSalesResult:any) => {
      debugger;
      return monthlyProductSalesResult.products.map((productData:any) => {
        return productData.product;
      });
    }).slice(-1).flat();

    const monthAndQuantity =BarChartData.map((monthlyProductSalesResult:any) => {
      return [
       monthlyProductSalesResult.month > 10 ? monthlyProductSalesResult.month + "/" + String(monthlyProductSalesResult.year).slice(2):
        "0" + monthlyProductSalesResult.month + "/" + String(monthlyProductSalesResult.year).slice(2),
        ...monthlyProductSalesResult.products.map((productData:any) => productData.quantity),
      ];
    });

    const data =[ 
      ["products",...products],
      ...monthAndQuantity
    ]

    return (
      BarChartData.length > 0 ?
        <Chart
          width={"100%"}
          height={"280px"}
          chartType="ColumnChart"
          data={data}
          options={options}
          rootProps={{ "data-testid": "3" }}
        />
        :<MyDiv>No data</MyDiv>
      );
}
export default BarChart
