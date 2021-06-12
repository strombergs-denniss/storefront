import { gql, useQuery } from '@apollo/client'

export const GET_PRODUCT = gql`
    query Product($urlKey: String!) {
        product: ProductByUrlKey(urlKey: $urlKey) {
            id
            sku
            name
            price
            stockQuantity
            specialDiscountType
            specialDiscountValue
            specialTaxRate
            shortDescription
            longDescription
            baseImage
            thumbnailImage
            otherImages
            attributeValues
            attributeSet: AttributeSet {
                attributes: Attributes {
                    id
                    code
                    label
                    type
                    attributeOptions
                    attributeGroup
                }
            }
        }
    }
`

export const GET_ATTRIBUTE_SET = `
    query AttributeSet($id: ID!) {
        attributeSet: AttributeSet(id: $id) {
            attributes: Attributes {
                id
                code
                label
                type
                attributeOptions
                attributeGroup
            }
        }
    }
`


export const UPLOAD_MEDIA = `
    mutation UploadMedia($name: String!, $data: String!) {
        url: uploadMedia(name: $name, data: $data)
    }
`

export function GetProduct(variables) {
    const { loading, error, data: { product } = {} } = useQuery(GET_PRODUCT, { variables })

    if (loading || error) {
        return null
    }

    return product
}

export default GetProduct
