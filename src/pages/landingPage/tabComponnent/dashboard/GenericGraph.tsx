import React ,{useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import { PALLETE } from '../../../../config/config';
import { theGenericGraph } from "../../../../apiCalls/graphCalls";
import { NoDataGenericDiv } from "./Dashboard.style";

interface props{
  collection:string | null,
  groupBy:string | null
}

const GenericGraph: React.FC<props> = ({collection, groupBy}) => {

  const options = {
  
    title: collection + " " + groupBy,
    legend: {
      position: "none"
    },
    backgroundColor: PALLETE.GRAY,
  };

  const [genericGraph, setGenericGraph] = useState([])
  const color = PALLETE.BLUE
  const colors = [PALLETE.GREEN, PALLETE.RED, PALLETE.YELLOW, PALLETE.ORANGE, PALLETE.BLUE]
    
  useEffect(() => {
    if(collection && groupBy){
      theGenericGraph(collection, groupBy).then(res => {
        setGenericGraph(res.data)
      }).catch(err => {
        console.error(err)
      })
    }
    }, [collection,groupBy]);

  let MyGenericGraphData:any[];

  switch (groupBy) {
    case "monthYear":
      MyGenericGraphData = genericGraph.map((element:any, index) => [
        element.field,
        element.count,
        genericGraph.length > 5 ?  color : colors[index % 5]
      ]);
      break;
    case "employee":
      MyGenericGraphData = genericGraph.map((element:any, index) => [
        element.field.fullName,
        element.count,
        genericGraph.length > 5 ?  color : colors[index % 5]
      ]);
      break;
    case "customer":
      MyGenericGraphData = genericGraph.map((element:any, index) => [
        element.field.fullName,
        element.count,
        genericGraph.length > 5 ?  color : colors[index % 5]
      ]);
      break;
    case "category":
      MyGenericGraphData = genericGraph.map((element:any, index) => [
        element.field.name,
        element.count,
        genericGraph.length > 5 ?  color : colors[index % 5]
      ]);
      break;
    default:
      MyGenericGraphData = genericGraph.map((element:any, index) => [
        element.field.name,
        element.count,
        genericGraph.length > 5 ?  color : colors[index % 5]
      ]);
      break;
  }

  const data = [
    ["field", "count", { role: "style" }],
    ...MyGenericGraphData
  ];
  

  return (
    MyGenericGraphData.length > 0 ?
        <Chart 
        chartType="ColumnChart" 
        height="30rem" 
        data={data}
        options={options}
        />
        :<NoDataGenericDiv>No data</NoDataGenericDiv>
  );
}
export default GenericGraph