export const searchTypeDef = `
    scalar FilterValues

    type Aggregations {
        count: Int
        minPrice: Float
        maxPrice: Float
        filterValues: FilterValues
    }

    type Search {
        Category: Category
        Products: [Product]
        Attributes: [Attribute]
        Aggregations: Aggregations
    }

    type Query {
        search(
            categoryUrlKey: String
            search: String
            minPrice: Float
            maxPrice: Float
            attributeValues: String
            page: Int
            perPage: Int
            sort: String
        ) : Search
    }
`

export default searchTypeDef
