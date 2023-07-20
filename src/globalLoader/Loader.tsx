import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux/store';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader: React.FC = () => {
  const isLoading = useSelector((state:RootState) => state.app?.isLoading || false);

  if (!isLoading) {
    return null;
  }

  return <div>
         <Backdrop
           sx={{ color: '#00000080;', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
           >
           <CircularProgress color="primary" />
         </Backdrop>
       </div>
}
export default Loader;
