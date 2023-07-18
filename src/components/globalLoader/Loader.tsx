import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@mui/material/Backdrop';

const Loader = () => {
  return <div>

<Backdrop
        sx={{ color: '#00000080;', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="primary" />
      </Backdrop></div>
};

export default Loader;
