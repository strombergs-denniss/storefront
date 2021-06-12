export const showNotification = ({ dispatch }, payload) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload })
}

export const hideNotification = ({ dispatch }) => {
    dispatch({ type: 'SHOW_NOTIFICATION' })
}
