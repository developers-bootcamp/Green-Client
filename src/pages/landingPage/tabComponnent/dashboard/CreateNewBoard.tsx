import React from "react";
import { PALLETE } from '../../../../config/config'; 
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const CreateNewBoard: React.FC = () => {

    const MyBox = styled(Box)({
        backgroundColor: PALLETE.GRAY,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    });

    const MyLabel = styled('label')({
       fontSize: 20,
       paddingTop: 100,
    }); 

    const MySpan = styled('span')({
        fontSize: 60,
        fontWeight: 400,
        paddingTop: 100,
        paddingRight: 10,
     }); 


    return (
        <MyBox>
            <MySpan>+</MySpan><MyLabel> create a new board</MyLabel>
        </MyBox>
      )
}
export default CreateNewBoard