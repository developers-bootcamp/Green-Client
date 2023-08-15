import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config'; 

  export const options = {
    colors: [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW],
    backgroundColor: PALLETE.GRAY
  };

  interface prop{
    pieChartData:{[key:string]:any}[]
  }
  
  const PieChart:React.FC<prop>=({pieChartData})=>{

    const MyPieChartData = pieChartData.map(x => [x.User.fullName, x.countOfDeliveredOrders])
    console.log(MyPieChartData);

    const data = [
      ["Employee name", "Count Of Delivered Orders"],
      ...MyPieChartData
    ];
    
    return (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"280px"}
        />
      )
}
export default PieChart