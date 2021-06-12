export const ordersTypeDef = `
    type Query {
        customerOrder(id: ID!) : Order
        allCustomerOrders : [Order]
    }
`

export default ordersTypeDef
