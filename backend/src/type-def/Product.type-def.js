export const productTypeDef = `
    type Query {
        ProductByUrlKey(urlKey: String!) : Product
    }
`

export default productTypeDef
