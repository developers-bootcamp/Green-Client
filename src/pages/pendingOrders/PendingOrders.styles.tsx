import { PALLETE } from '../../config/config';
import { styled } from '@mui/system';

export const MainDialog = styled('div')({
    marginTop: '50px',
    border: '3px solid',
    borderRadius: '15px',
});

export const AllData = styled('div')({
    textAlign: 'start',
    justifyItems: 'center',
    borderTopLeftRadius: '15px',
    borderBottomLeftRadius: '15px',
    paddingRight: '50px',
});

export const rightGrid = styled('div')({
    textAlign: 'center',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
    backgroundColor: 'rgb(216, 223, 225)',

})

export const text = styled('div')({
    margin: 'normal',
    borderRadius: ' 15px',
    width: '80%',
})

export const signUpWrapper = styled('div')({
    textAlign: 'end'
})

export const signUpButton = styled('div')({
    position: 'absolute',
    backgroundColor: PALLETE.YELLOW,
    color: 'EB9F6E !important',
    width: '40%',
    borderRadius: '15px',
})

export const pic = styled('div')({
    height: '60%',
    width: '90%',
    marginTop: '30%'
})