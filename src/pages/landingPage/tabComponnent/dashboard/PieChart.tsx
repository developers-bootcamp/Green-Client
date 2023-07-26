import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config'; 

  export const options = {
    colors: [PALLETE.GREEN, PALLETE.ORANGE, PALLETE.BLUE, PALLETE.RED, PALLETE.YELLOW],
    backgroundColor: PALLETE.GRAY
  };

  
  const PieChart:React.FC=()=>{

    const data = [
      ["Employee name", "Count Of Delivered Orders"],
      ["Work", 6],
      ["Eat", 4],
      ["Commute", 3],
      ["Watch TV", 2],
      ["Sleep", 1],
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