import { addProduct, removeProduct } from '../query/Cart.query'
import { showNotification } from './Notification.dispatcher'

export const addProductToCart = async ({ dispatch, client }, payload) => {
    const item = await addProduct(client, payload)

    if (item) {
        dispatch({ type: 'ADD_PRODUCT_TO_CART', payload: item })
        showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully added a product to the cart.' })
    } else {
        showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to add a product to the cart.' })
    }
}

export const removeProductFromCart = async ({ dispatch, client }, payload) => {
    const item = await removeProduct(client, payload)

    if (item) {
        dispatch({ type: 'REMOVE_PRODUCT_FROM_CART', payload: item })
        showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully removed a product from the cart.' })
    } else {
        showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to remove a product from the cart.' })
    }
}
