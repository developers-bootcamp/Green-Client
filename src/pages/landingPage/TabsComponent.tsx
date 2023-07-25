import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PendingOrders from './tabComponnent/PendingOrders';
import CatalogManager from './tabComponnent/CatalogManager';
import UsersManagement from './tabComponnent/UsersManagement';
import Dashboard from './tabComponnent/dashboard/Dashboard';
import { useStyles } from './TabsComponent.styles';
interface TabPanelProps {
  children?: React.ReactNode;
}

function TabPanel({children}: TabPanelProps) {
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
  const classes = useStyles()
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setnumOfOpenTab(newValue);
  };
  let SelectedComponent=ComponentArray[numOfOpenTab];
  return (
    <>
    <Box sx={{ width: '100%',height:'100%',backgroundColor:"white"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs variant="fullWidth"  value={numOfOpenTab} onChange={handleTabChange}>
          <Tab style={{textTransform: "none",fontSize:"125%",color: "black"}}label="Pending Orders" {...a11yProps(0)} />
          <Tab style={{textTransform: "none",fontSize:"125%",color: "black"}}label="Dashboard" {...a11yProps(1)}  />
          <Tab style={{textTransform: "none",fontSize:"125%",color: "black"}}label="Catalog Manager" {...a11yProps(2)} />
          <Tab style={{textTransform: "none",fontSize:"125%",color: "black"}}label="Users' Management" {...a11yProps(3)} />
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