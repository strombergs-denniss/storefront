import { setItem, getItem } from '../../base/Utility'

export const initialState = {}

export function CheckoutReducer(state = getItem('CHECKOUT') || initialState, action) {
    const { type, payload } = action

    switch (type) {
        case 'SET_ADDRESS':
            const out = {
                ...state,
                address: payload
            }

            setItem('CHECKOUT', out)

            return out
        case 'SET_SHIPPING_METHOD':
            const out2 = {
                ...state,
                shippingMethodId: payload
            }

            setItem('CHECKOUT', out2)

            return out2
        case 'SET_PAYMENT_METHOD':
            const out3 = {
                ...state,
                paymentMethodId: payload
            }

            setItem('CHECKOUT', out3)

            return out3
        default:
            return state
    }
}

export default CheckoutReducer
