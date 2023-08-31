import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { MyDiv } from "./Dashboard.style";

export const options = {
  chartArea: { width: "50%" },
  isStacked: true,
  title:"Top products",
  bars: "vertical",
  colors: [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW],
  backgroundColor: PALLETE.GRAY,
}

const BarChart:React.FC = () => {
      
  const [BarChartData, setBarChartData] = useState([
    {
      "month": 1,
      "year": 2023,
      "products": [
        {
          "product": "Product 1",
          "quantity": 20
        },
        {
          "product": "Product 2",
          "quantity": 40
        },
        {
          "product": "Product 3",
          "quantity": 50
        },
        {
          "product": "Product 4",
          "quantity": 60
        },
        {
          "product": "Product 5",
          "quantity": 30
        }
      ]
    },
    {
      "month": 2,
      "year": 2023,
      "products": [
        {
          "product": "Product 1",
          "quantity": 10
        },
        {
          "product": "Product 2",
          "quantity": 20
        },
        {
          "product": "Product 3",
          "quantity": 30
        },
        {
          "product": "Product 4",
          "quantity": 40
        },
        {
          "product": "Product 5",
          "quantity": 80
        }
      ]
    },
    {
      "month": 3,
      "year": 2023,
      "products": [
        {
          "product": "Product 1",
          "quantity": 40
        },
        {
          "product": "Product 2",
          "quantity": 70
        },
        {
          "product": "Product 3",
          "quantity": 10
        },
        {
          "product": "Product 4",
          "quantity": 15
        },
        {
          "product": "Product 5",
          "quantity": 10
        }
      ]
    },
  ]);

  // useEffect(() => {
  //   getTopProduct().then(res => {
  //         setBarChartData(res.data)
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }, []);

 
    const products =  BarChartData.map((monthlyProductSalesResult) => {
      return monthlyProductSalesResult.products.map((productData) => {
        return productData.product;
      });
    }).slice(-1).flat();

    const monthAndQuantity =BarChartData.map((monthlyProductSalesResult) => {
      return [
       monthlyProductSalesResult.month > 10 ? monthlyProductSalesResult.month + "/" + String(monthlyProductSalesResult.year).slice(2):
        "0" + monthlyProductSalesResult.month + "/" + String(monthlyProductSalesResult.year).slice(2),
        ...monthlyProductSalesResult.products.map((productData) => productData.quantity),
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
