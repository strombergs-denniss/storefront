import { gql } from '@apollo/client'

export const ADD_PRODUCT = gql`
    mutation AddProduct($productId: ID!, $quantity: Int!) {
        cartItem: addProduct(product_id: $productId, quantity: $quantity) {
            item {
                id
                quantity
                product: Product {
                    id
                    urlKey
                    sku
                    name
                    price
                    stockQuantity
                    specialDiscountType
                    specialDiscountValue
                    specialTaxRate
                    baseImage
                    thumbnailImage
                    otherImages
                }
            }
            totals
        }
    }
`

export const REMOVE_PRODUCT = gql`
    mutation RemoveProduct($productId: ID!, $quantity: Int!) {
        cartItem: removeProduct(product_id: $productId, quantity: $quantity) {
            item {
                id
                quantity
                product: Product {
                    id
                    urlKey
                    sku
                    name
                    price
                    stockQuantity
                    specialDiscountType
                    specialDiscountValue
                    specialTaxRate
                    baseImage
                    thumbnailImage
                    otherImages
                }
            }
            totals
        }
    }
`

export const CLEAR_CART = gql`
    mutation ClearCart {
        clearCart
    }
`

export function addProduct(client, variables) {
    return client.mutate({
        mutation: ADD_PRODUCT,
        variables
    }).then(({ data }) => data?.cartItem)
}

export function removeProduct(client, variables) {
    return client.mutate({
        mutation: REMOVE_PRODUCT,
        variables
    }).then(({ data }) => data?.cartItem)
}

export function clearCart(client, variables) {
    return client.mutate({
        mutation: CLEAR_CART,
        variables
    }).then(({ data }) => data)
}
