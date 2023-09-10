import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PendingOrders from './tabComponnent/pendingOrders/PendingOrders';
import CatalogManager from './tabComponnent/CatalogManager';
import UsersManagement from './tabComponnent/UsersManagement';
import { MyTab } from './TabsComponent.styles';
import {useNavigate } from "react-router-dom";

import Dashboard from './tabComponnent/dashboard/Dashboard';

interface TabPanelProps {
  children?: React.ReactNode;
}

function TabPanel({children}: TabPanelProps) {
  
  const navigate = useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem("token") === null){
      navigate("/");
    }
  },[])
    

  return (
    <div>
        <Box sx={{ p: 8 }}>
          <Typography>{children}</Typography>
        </Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsComponent:React.FC=()=> {
  const [numOfOpenTab, setnumOfOpenTab] = React.useState(0);
  const ComponentArray=[PendingOrders,Dashboard,CatalogManager,UsersManagement];
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setnumOfOpenTab(newValue);
  };
  let SelectedComponent=ComponentArray[numOfOpenTab];
  return (
    <>
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs variant="fullWidth"  value={numOfOpenTab} onChange={handleTabChange}>
          <MyTab label="Pending Orders" {...a11yProps(0)} />
          <MyTab label="Dashboard" {...a11yProps(1)}  />
          <MyTab label="Catalog Manager" {...a11yProps(2)} />
          <MyTab label="Users' Management" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel>
        <SelectedComponent name={SelectedComponent.displayName} type={SelectedComponent.name}/>
      </TabPanel>
      </Box>
      </>
  );
}
export default TabsComponent;