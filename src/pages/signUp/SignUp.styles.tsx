import { PALLETE } from '../../config/config';
import { styled } from '@mui/system'

export const Text = styled('div')({
    margin: 'normal',
    borderRadius: ' 15px',
    width: '100% !important',
})

export const SignUpWrapper = styled('div')({
    textAlign: 'end',
})

export const SignUpButton = styled('div')({
    // position: 'absolute',
    backgroundColor: `${PALLETE.YELLOW} !important`,
    // color: 'EB9F6E !important',
    // width: '40%',
    // borderRadius: '15px',
})