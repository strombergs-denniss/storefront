import { getItem, setItem } from '../../base/Utility'

export const initialState = {
    token: ''
}

export function AccountReducer(state = getItem('ACCOUNT') || initialState, action) {
    const { type, payload: { account } = {} } = action

    switch (type) {
        case 'SIGN_IN':
            if (account) {
                setItem('ACCOUNT', account)

                return account
            }

            return state
        case 'SIGN_UP':
            if (account) {
                setItem('ACCOUNT', account)

                return account
            }

            return state
        case 'SIGN_OUT':
            setItem('ACCOUNT', initialState)

            return initialState
        case 'UPDATE_ACCOUNT':
            const out = {
                ...state,
                ...account
            }
            setItem('ACCOUNT', out)

            return out
        case 'CHANGE_PASSWORD':
            return state
        default:
            return state
    }
}

export default AccountReducer
