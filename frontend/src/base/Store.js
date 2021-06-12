import { createBrowserHistory } from 'history'
import { createStore } from 'redux'
import createRootReducer from './Reducer'

export const history = createBrowserHistory()

export default function configureStore(initialState) {
    return createStore(
        createRootReducer(history),
        initialState
    )
}
