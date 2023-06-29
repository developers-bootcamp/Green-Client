import { Theme, createStyles, makeStyles } from "@material-ui/core";

export default function SignUpStyles() {
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

    return <>
    </>
}