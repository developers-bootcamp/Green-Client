import React, { useState } from "react";
import PieChart from './PieChart';
import LineGraph from './LineGraph';
import BarChart from './BarChart';
import Grid from '@mui/material/Unstable_Grid2';
import { Item, DashboardGeneratorItem } from "./Dashboard.style";
import CreateNewBoard from "./CreateNewBoard";
import Dialog from '@mui/material/Dialog';
import DashboardGenerator from "./DashboardGenerator";

const Dashboard: React.FC = () => {

  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

      return (
        <>
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
                  <Item onClick={handleClickOpen}><CreateNewBoard/></Item>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth
                  >
                  <DashboardGeneratorItem>
                    <DashboardGenerator/>
                  </DashboardGeneratorItem>
                  </Dialog>
                </Grid>
          </Grid>
          <br></br>
      </>
      );
}
export default Dashboard