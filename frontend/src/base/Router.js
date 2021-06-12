import { Provider } from 'react-redux'
import configureStore from './Store'
import Admin from './Admin'
import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { setContext } from '@apollo/client/link/context'
import StoreFront from './Storefront'
import { CONFIG } from './Config'
import { getItem } from './Utility'

const store = configureStore()

const httpLink = createHttpLink({
    uri: CONFIG.API + '/graphql'
})

const authLink = setContext((_, { headers }) => {
    const account = getItem('ACCOUNT') || {}
    const { token } = account

    return {
        headers: {
            ...headers,
            role: token ? 'CLIENT' : 'PUBLIC',
            authentication: token ? token : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export function Router() {

    return (
        <BrowserRouter>
            <Provider store={ store }>
                <ApolloProvider client={ client }>
                    { window.location.pathname.includes('admin') ? null : <StoreFront /> }
                </ApolloProvider>
            </Provider>
            <Route path="/admin" render={ () => (<Admin/>) }/>
        </BrowserRouter>
    )
}

export default Router
