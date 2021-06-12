import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import CartReducer from '../storefront/reducer/Cart.reducer'
import AccountReducer from '../storefront/reducer/Account.reducer'
import CheckoutReducer from '../storefront/reducer/Checkout.reducer'
import ConfigReducer from '../storefront/reducer/Config.reducer'
import NotificationReducer from '../storefront/reducer/Notification.reducer'
import SearchReducer from '../storefront/reducer/Search.reducer'

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    CartReducer,
    AccountReducer,
    CheckoutReducer,
    ConfigReducer,
    NotificationReducer,
    SearchReducer
})

export default createRootReducer
