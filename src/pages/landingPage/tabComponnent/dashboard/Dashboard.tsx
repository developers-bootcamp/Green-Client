import React, { useState, useEffect } from "react";
import PieChart from './PieChart';
import LineGraph from './LineGraph';
import BarChart from './BarChart';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { PALLETE } from '../../../../config/config';
import CreateNewBoard from "./CreateNewBoard";


const Dashboard: React.FC = () => {

  const [BarChartData, setBarChartData] = useState([]);

  const [LineGraphData, setLineGraphData] = useState([]);

  const [pieChartData, setPieChartData] = useState([]);

  const fetchData = async () => {
    const responses = await Promise.all([
      //fetch('http://localhost:8080/Graph/'),
      fetch('http://localhost:8080/Graph/getDeliverCancelOrders'),
      fetch('http://localhost:8080/Graph/topEmployee'),
    ]);

    const data:any = await Promise.all(responses.map((response) => response.json()));

    // setBarChartData(data[0])

    setLineGraphData(data[0])
    //2
    setPieChartData(data[1])
    
  };

  useEffect(() => {
    fetchData();
  }, []);


  const Item = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: 5,
    borderRadius: 15,
  });

      return (
        <>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6} >
                  {/* <Item><BarChart/></Item> */}
                </Grid>
                <Grid xs={6}>
                  <Item><PieChart pieChartData = {pieChartData}/></Item>
                </Grid>
                <Grid xs={6}>
                  <Item><LineGraph LineGraphData = {LineGraphData}/></Item>
                </Grid>
                <Grid xs={6}>
                  <Item><CreateNewBoard></CreateNewBoard></Item>
                </Grid>
          </Grid>
          <br></br>
      </>
      );
}
export default Dashboard