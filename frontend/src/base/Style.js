import { makeStyles } from '@material-ui/core'

export const STYLE = {
    form: makeStyles((theme) => ({
        root: {
            '& .MuiFormControl-root': {
                marginBottom: theme.spacing(2)
            }
        }
    }))
}

export default STYLE
