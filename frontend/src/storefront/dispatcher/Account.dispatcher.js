import {
    signIn as signInMutation,
    signUp as signUpMutation,
    updateAccount as updateAccountMutation,
    changePassword as changePasswordMutation
} from '../query/Account.query'
import { showNotification } from './Notification.dispatcher'

export const signIn = async ({ dispatch, client, history }, payload) => {
    const account = await signInMutation(client, payload)

    if (account) {
        dispatch({ type: 'SIGN_IN', payload: { account } })
        dispatch({ type: 'LOAD_CART', payload: { account } })
        showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully signed in.' })
        history.push('/account')
    } else {
        showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to sign in.' })
    }
}

export const signUp = async ({ dispatch, client, history }, payload) => {
    const account = await signUpMutation(client, payload)

    if (account) {
        dispatch({ type: 'SIGN_UP', payload: { account } })
        showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully signed up.' })
        history.push('/account')
    } else {
        showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to sign up.' })
    }
}

export const signOut = async ({ dispatch }) => {
    dispatch({ type: 'SIGN_OUT' })
    dispatch({ type: 'CLEAR_CART' })
    showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully signed out.' })
}

export const updateAccount = async ({ dispatch, client }, payload) => {
    const account = await updateAccountMutation(client, payload)

    if (account) {
        dispatch({ type: 'UPDATE_ACCOUNT', payload: { account } })
        showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully update your account.' })
    } else {
        showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to update your account.' })
    }
}

export const changePassword = async ({ dispatch, client }, payload) => {
    const status = await changePasswordMutation(client, payload)

    if (status) {
        dispatch({ type: 'CHANGE_PASSWORD' })
        showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully changed your password.' })
    } else {
        showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to change your password.' })
    }
}
