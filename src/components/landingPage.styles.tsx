import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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