import React from "react";
import PieChart from './PieChart';
import LineGraph from './LineGraph';
import BarChart from './BarChart';
import Grid from '@mui/material/Unstable_Grid2';
import CreateNewBoard from "./CreateNewBoard";
import { Item } from "./Dashboard.style";

const Dashboard: React.FC = () => {

      return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6} >
                  <Item><BarChart/></Item>
                </Grid>
                <Grid xs={6}>
                  <Item><PieChart/></Item>
                </Grid>
                <Grid xs={6}>
                  <Item><LineGraph/></Item>
                </Grid>
                <Grid xs={6}>
                  <Item><CreateNewBoard></CreateNewBoard></Item>
                </Grid>
          </Grid>
      );
}
export default Dashboard