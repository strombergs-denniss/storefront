import { getItem, setItem } from '../../base/Utility'

export const initialState = {
    items: {},
    totals: {
        totalTax: 0,
        subtotal: 0,
        total: 0
    }
}

export function CartReducer(state = getItem('CART') || initialState, action) {
    const { items } = state
    const { type, payload: { item, totals, account } = {} } = action

    switch (type) {
        case 'ADD_PRODUCT_TO_CART':
            const out = {
                ...state,
                items: {
                    ...items,
                    [item.id]: item
                },
                totals
            }
            setItem('CART', out)

            return out
        case 'REMOVE_PRODUCT_FROM_CART':
            if (item.quantity) {
                const out = {
                    ...state,
                    items: {
                        ...items,
                        [item.id]: item
                    },
                    totals
                }
                setItem('CART', out)

                return out
            } else {
                const { [item.id]: a, ...other } = items
                const out = {
                    ...state,
                    items: {
                        ...other
                    },
                    totals
                }
                setItem('CART', out)

                return out
            }
        case 'CLEAR_CART':
            setItem('CART', initialState)

            return initialState
        case 'LOAD_CART':
            const out2 = {
                ...state,
                items: {},
                totals: {
                    totalTax: account.totalTax,
                    subtotal: account.subtotal,
                    total: account.total
                }
            }
            account.items.map((item) => out2.items[item.id] = item)
            setItem('CART', out2)

            return out2
        default:
            return state
    }
}

export default CartReducer
