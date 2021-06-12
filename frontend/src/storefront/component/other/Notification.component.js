import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'

export function Alert(props) {
    return <MuiAlert elevation={ 6 } variant="filled" {...props} />
}

export function Notification() {
    const { open, severity = '', message } = useSelector((state) => state.NotificationReducer)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch({
            type: 'HIDE_NOTIFICATION'
        })
    }

    return (
        <Snackbar open={ open } autoHideDuration={ 2000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity={ severity.toLowerCase() }>
                { message }
            </Alert>
        </Snackbar>
    )
}

export default Notification
