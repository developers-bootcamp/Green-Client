import React, { useState, useEffect } from "react";
import PieChart from './PieChart';
import LineGraph from './LineGraph';
import BarChart from './BarChart';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { PALLETE, GET_TOP_PRODUCT, GET_DELIVER_CANCEL_ORDERS, GET_TOP_EMPLOYEE } from '../../../../config/config';
import CreateNewBoard from "./CreateNewBoard";


const Dashboard: React.FC = () => {

  const [BarChartData, setBarChartData] = useState([]);

  const [LineGraphData, setLineGraphData] = useState([]);

  const [PieChartData, setPieChartData] = useState([]);

  const fetchData = async () => {
    
    const responses = await Promise.all([
      fetch(`${GET_TOP_PRODUCT}`),
      fetch(`${GET_DELIVER_CANCEL_ORDERS}`),
      fetch(`${GET_TOP_EMPLOYEE}`),
      
    ]);

   const data:any = await Promise.all(responses.map((response) => response.json()));
    
    setBarChartData(data[0])

    setLineGraphData(data[1])
    
    setPieChartData(data[2])
    
  }

  useEffect(() => {
    fetchData();
  }, []);


  const Item = styled('div')({
    backgroundColor: PALLETE.GRAY,
    padding: 5,
    borderRadius: 15,
    height: 280,
  });

      return (
        <>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6} >
                  <Item><BarChart BarChartData = {BarChartData}/></Item>
                </Grid>
                <Grid xs={6}>
                  <Item><PieChart PieChartData = {PieChartData}/></Item>
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