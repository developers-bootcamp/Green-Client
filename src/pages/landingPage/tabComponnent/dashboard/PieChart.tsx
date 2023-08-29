import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config'; 
import { styled } from '@mui/material/styles';

  export const options = {
    colors: [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW],
    backgroundColor: PALLETE.GRAY
  };

  interface prop{
    PieChartData:{[key:string]:any}[]
  }
  
  const PieChart:React.FC<prop>=({PieChartData})=>{
    
    const MyPieChartData = PieChartData.map(x => [x.user.fullName, x.countOfDeliveredOrders])
    console.log(MyPieChartData);

    const data = [
      ["Employee name", "Count Of Delivered Orders"],
      ...MyPieChartData
    ];

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
        MyPieChartData.length > 0 ?
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"280px"}
        />
        :<MyDiv><MyLabel>No data</MyLabel></MyDiv>
      )
}
export default PieChart