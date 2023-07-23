import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate} from 'react-router-dom';
export default function LoginStyles() {

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
    const navigate = useNavigate();

    return (
    <>
        <Button variant="contained" color="primary" onClick={() => { navigate("/signUp") }} disableElevation>
            signUp
        </Button>
    </>
    )
}