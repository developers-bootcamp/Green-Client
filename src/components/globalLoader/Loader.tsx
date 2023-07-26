// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/redux/store';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const Loader: React.FC = () => {
//   const isLoading = useSelector((state: RootState) => state.app?.isLoading || false);

//   const colors = ['#ff0000', '#6794CF', '#FAE282', '#EE696A', '#7ED787', '#EB9F6E',  '#0000ff'];
  
//   const [colorIndex, setColorIndex] = useState(0);

//   const updateColor = () => {
//     setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
//   };

//   useEffect(() => {
//     const colorInterval = setInterval(updateColor, 2000);

//     return () => clearInterval(colorInterval);
//   }, []);

//   if (!isLoading) {
//     return null;
//   }

//   const circularProgressStyle = {
//     color: colors[colorIndex],
//   };

//   return (
//     <div>
//       <Backdrop
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={isLoading}
//       >
//         <CircularProgress style={circularProgressStyle} />
//       </Backdrop>
//     </div>
//   );
// };

// export default Loader;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux/store';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.app?.isLoading || false);

  const colors = ['#ff0000', '#6794CF', '#FAE282', '#EE696A', '#7ED787', '#EB9F6E', '#0000ff'];
  
  const [colorIndex, setColorIndex] = useState(0);

  const updateColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  useEffect(() => {
    const colorInterval = setInterval(updateColor, 2000);

    return () => clearInterval(colorInterval);
  }, []);

  if (!isLoading) {
    return null;
  }

  const circularProgressStyle = {
    color: colors[colorIndex],
  };

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress style={circularProgressStyle} />
      </Backdrop>
    </div>
  );
};

export default Loader;
