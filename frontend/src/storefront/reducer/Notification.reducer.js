export const initialState = {
    open: false,
    severity: 'info',
    message: ''
}

export function NotificationReducer(state = initialState, action) {
    const { type, payload: { severity, message } = {} } = action

    switch (type) {
        case 'SHOW_NOTIFICATION':
            return {
                open: true,
                severity,
                message
            }
        case 'HIDE_NOTIFICATION':
            return {
                open: false
            }
        default:
            return state
    }
}

export default NotificationReducer
