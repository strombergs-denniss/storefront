export const reviewTypeDef = `
    type Query {
        customerReview(id: ID!) : Review
        allCustomerReviews : [Review]
        allProductReviews(product_id: ID!) : [Review]
    }

    type Mutation {
        createCustomerReview(
            title: String!,
            content: String!,
            rating: Int!,
            product_id: ID!
        ) : Review
        updateCustomerReview(
            id: ID!,
            title: String!,
            content: String!,
            rating: Int!
        ) : Review
        deleteCustomerReview(id: ID!) : Boolean
    }
`

export default reviewTypeDef
