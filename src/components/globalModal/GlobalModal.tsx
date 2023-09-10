import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { LeftSide, MyImg, MySideTxt, RightSide } from "./GlobalModal.styles"

const GlobalModal = (props: any) => {
    return <>
        <Dialog fullWidth maxWidth={props.myWidth || 'lg'} open={props.isOpen} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <Grid height={props.myHeight || '45rem'}>
                <DialogContent sx={{ p: 0 }}>
                    <LeftSide>
                        <DialogTitle sx={{ fontSize: 35, paddingLeft: "2rem" }}>{props.header}</DialogTitle>
                        <DialogContent style={{ paddingLeft: "3rem" }}>{props.children}</DialogContent>
                    </LeftSide >
                    <RightSide>
                        <MyImg src={props.img} alt={props.img} ></MyImg>
                        <MySideTxt><p>{props.sideTxt||'put here the side text'}</p></MySideTxt>
                    </RightSide>
                </DialogContent>
            </Grid>
        </Dialog>
    </>
}

export default GlobalModal