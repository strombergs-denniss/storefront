import { gql, useQuery } from '@apollo/client'

export const GET_ALL_CUSTOMER_ORDERS = gql`
    query GetAllOrders {
        orders: allCustomerOrders {
            id
            reference
            date
            status
            totalDelivery
            totalTax
            subtotal
            total
        }
    }
`

export const GET_CUSTOMER_ORDER = gql`
    query GetCustomerOrder($id: ID!) {
        order: customerOrder(id: $id) {
            id
            reference
            date
            status
            totalDelivery
            totalTax
            subtotal
            total
            address: Address {
                id
                firstName
                lastName
                phoneNumber
                country
                city
                province
                street1
                street2
                postalCode
            }
            items: OrderItems {
                quantity
                totalTax
                subtotal
                total
                product: Product {
                    urlKey
                    name
                }
            }
        }
    }
`
export function GetAllCustomerOrders(variables) {
    const { loading, error, data: { orders } = {} } = useQuery(GET_ALL_CUSTOMER_ORDERS, { variables })

    if (loading || error) {
        return null
    }

    return orders
}

export function GetCustomerOrder(variables) {
    const { loading, error, data: { order } = {} } = useQuery(GET_CUSTOMER_ORDER, { variables })

    if (loading || error) {
        return null
    }

    return order
}
