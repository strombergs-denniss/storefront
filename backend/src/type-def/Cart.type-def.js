export const cartTypeDef = `
    scalar Totals

    type CartItem {
        Product: Product
    }

    type CartData {
        item : CartItem
        totals: Totals
    }

    type Mutation {
        addProduct(product_id: ID!, quantity: Int!) : CartData
        removeProduct(product_id: ID!, quantity: Int!) : CartData
    }
`

export default cartTypeDef
