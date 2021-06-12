import { gql, useQuery } from '@apollo/client'

export const SEARCH = gql`
    query Search(
        $categoryUrlKey: String,
        $search: String,
        $minPrice: Float,
        $maxPrice: Float,
        $attributeValues: String,
        $page: Int,
        $perPage: Int,
        $sort: String
    ) {
        search(
            categoryUrlKey: $categoryUrlKey,
            search: $search,
            minPrice: $minPrice,
            maxPrice: $maxPrice,
            attributeValues: $attributeValues,
            page: $page,
            perPage: $perPage,
            sort: $sort
        ) {
            category: Category {
                id
                name
                content
            }
            products: Products {
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
            attributes: Attributes {
                id
                code
                label
                type
            }
            aggregations: Aggregations {
                count
                minPrice
                maxPrice
                filterValues
            }
        }
    }
`

export function Search(variables) {
    const { loading, error, data: { search } = {} } = useQuery(SEARCH, { variables, fetchPolicy: 'no-cache' })

    if (loading || error) {
        return null
    }

    return search
}
