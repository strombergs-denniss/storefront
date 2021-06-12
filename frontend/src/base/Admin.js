import { useState, useEffect } from 'react'
import { createBrowserHistory } from 'history'
import { Admin as ReactAdmin, Resource } from 'react-admin'
import buildGraphQLProvider from 'ra-data-graphql-simple'
import PageResource from '../admin/resource/Page/PageResource.component'
import BlockResource from '../admin/resource/Block/BlockResource.component'
import AttributeResource from '../admin/resource/Attribute/AttributeResource.component'
import AttributeSetAttributeResource from '../admin/resource/AttributeSetAttribute/AttributeSetAttributeResource.component'
import UserResource from '../admin/resource/User/UserResource.component'
import AttributeSetResource from '../admin/resource/AttributeSet/AttributeSetResource.component'
import ProductResource from '../admin/resource/Product/ProductResource.component'
import CustomerGroupResource from '../admin/resource/CustomerGroup/CustomerGroupResource.component'
import CustomerResource from '../admin/resource/Customer/CustomerResource.component'
import OrderItemResource from '../admin/resource/OrderItem/OrderItemResource.component'
import OrderResource from '../admin/resource/Order/OrderResource.component'
import InvoiceResource from '../admin/resource/Invoice/InvoiceResource.component'
import CategoryResource from '../admin/resource/Category/CategoryResource.component'
import ProductCategoryResource from '../admin/resource/ProductCategory/ProductCategoryResource.component'
import ReviewResource from '../admin/resource/Review/ReviewResource.component'
import Layout from '../admin/component/Layout.component'
import AddressResource from '../admin/resource/Address/AddressResource.component'
import authProvider from '../admin/component/AuthProvider.component'
import LoginPage from '../admin/component/LoginPage.component'
import ConfigResource from '../admin/resource/Config/ConfigResource.component'
import PaymentMethodResource from '../admin/resource/PaymentMethod/PaymentMethodResource.component'
import ShippingMethodResource from '../admin/resource/ShippingMethod/ShippingMethodResource.component'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import CustomerCustomerGroupResource from '../admin/resource/CustomerCustomerGroup/CustomerCustomerGroupResource.component'
import { CONFIG } from './Config'
import { getItem } from './Utility'

const httpLink = createHttpLink({
    uri: CONFIG.API + '/graphql'
})

const authLink = setContext((_, { headers }) => {
    const user = getItem('USER') || {}
    const { token } = user

    return {
        headers: {
            ...headers,
            role: token ? 'ADMIN' : 'PUBLIC',
            authentication: token ? token : ''
        }
    }
})

const history = createBrowserHistory({ basename: 'admin' })

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export function Admin() {
    const [dataProvider, setDataProvider] = useState(null)

    useEffect(() => {
        const onMount = async () => {
            const dataProvider = await buildGraphQLProvider({
                client
            })

            setDataProvider(() => dataProvider)
        }

        onMount()

        return () => {}
    }, [])

    if (!dataProvider) {
        return null
    }

    return (
        <ReactAdmin
            dataProvider={ dataProvider }
            history={ history }
            layout={ Layout }
            authProvider={ authProvider }
            loginPage={ LoginPage }
        >
            <Resource { ...UserResource } />
            <Resource { ...AttributeResource } />
            <Resource { ...AttributeSetResource } />
            <Resource { ...AttributeSetAttributeResource } />
            <Resource { ...BlockResource } />
            <Resource { ...PageResource } />
            <Resource { ...ProductResource } />
            <Resource { ...CustomerGroupResource } />
            <Resource { ...CustomerResource } />
            <Resource { ...AddressResource } />
            <Resource { ...OrderItemResource } />
            <Resource { ...OrderResource } />
            <Resource { ...InvoiceResource } />
            <Resource { ...CategoryResource } />
            <Resource { ...ProductCategoryResource } />
            <Resource { ...ReviewResource } />
            <Resource { ...ConfigResource } />
            <Resource { ...PaymentMethodResource } />
            <Resource { ...ShippingMethodResource } />
            <Resource { ...CustomerCustomerGroupResource } />
        </ReactAdmin>
    )
}

export default Admin
