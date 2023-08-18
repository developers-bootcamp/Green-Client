import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { LeftSide, MyImg, MySideTxt, RightSide } from "./GlobalModal.styles"

const GlobalModal = (props: any) => {
    return <>
        <Dialog fullWidth maxWidth={'md'} open={props.isOpen} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogContent sx={{ p: 0, height: '42rem' }} style={{ borderRadius: '100px' }}>
                <LeftSide>
                    <DialogTitle sx={{ fontSize: 30, pl: "3rem", paddingLeft: "3rem" }}>{props.header}</DialogTitle>
                    <DialogContent style={{ paddingRight: "3rem", paddingLeft: "3rem" }}>{props.children}</DialogContent>
                </LeftSide >
                <RightSide>
                    <MyImg src={props.img} alt={props.img}></MyImg>
                    <MySideTxt><h3>{props.sideTxt}</h3></MySideTxt>
                </RightSide>
            </DialogContent>
        </Dialog>
    </>
}

export default GlobalModal