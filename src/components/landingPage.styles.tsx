import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
export default function LandingPageStyles() {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                    width: '25ch'
                },
            },
        }),
    );

    const classes = useStyles();

    return <>
    </>
}