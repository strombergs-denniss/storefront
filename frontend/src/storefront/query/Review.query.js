import { gql, useQuery } from '@apollo/client'

export const GET_ALL_CUSTOMER_REVIEWS = gql`
    query GetAllCustomerReviews {
        reviews: allCustomerReviews {
            id
            status
            date
            title
            content
            rating
            product: Product {
                id
                urlKey
                name
            }
        }
    }
`

export const GET_ALL_PRODUCT_REVIEWS = gql`
    query GetAllProductReviews($productId: ID!) {
        reviews: allProductReviews(product_id: $productId) {
            id
            status
            date
            title
            content
            rating
            customer: Customer {
                id
                firstName
                lastName
            }
        }
    }
`

export const GET_CUSTOMER_REVIEW = gql`
    query GetCustomerReview($id: ID!) {
        review: customerReview(id: $id) {
            id
            status
            date
            title
            content
            rating
            product: Product {
                id
                urlKey
                name
            }
        }
    }
`

export const CREATE_CUSTOMER_REVIEW = gql`
    mutation CreateCustomerReview(
        $title: String!,
        $content: String!,
        $rating: Int!,
        $productId: ID!
    ) {
        review: createCustomerReview(
            title: $title,
            content: $content,
            rating: $rating,
            product_id: $productId
        ) {
            id
            status
            date
            title
            content
            rating
            productId: product_id
        }
    }
`

export const UPDATE_CUSTOMER_REVIEW = gql`
    mutation UpdateCustomerReview(
        $id: ID!,
        $title: String!,
        $content: String!,
        $rating: Int!
    ) {
        review: updateCustomerReview(
            id: $id,
            title: $title,
            content: $content,
            rating: $rating
        ) {
            id
            title
            content
            rating
        }
    }
`

export const DELETE_CUSTOMER_REVIEW = gql`
    mutation DeleteCustomerReview($id: ID!) {
        status: deleteCustomerReview(id: $id)
    }
`

export function GetAllCustomerReviews(variables) {
    const { loading, error, data: { reviews } = {} } = useQuery(GET_ALL_CUSTOMER_REVIEWS, { variables })

    if (loading || error) {
        return null
    }

    return reviews
}

export function GetAllProductReviews(variables) {
    const { loading, error, data: { reviews } = {} } = useQuery(GET_ALL_PRODUCT_REVIEWS, { variables })

    if (loading || error) {
        return null
    }

    return reviews
}

export function GetCustomerReview(variables) {
    const { loading, error, data: { review } = {} } = useQuery(GET_CUSTOMER_REVIEW, { variables })

    if (loading || error) {
        return null
    }

    return review
}

export function createCustomerReview(client, variables) {
    return client.mutate({
        mutation: CREATE_CUSTOMER_REVIEW,
        variables
    }).then(({ data }) => data?.review)
}

export function updateCustomerReview(client, variables) {
    return client.mutate({
        mutation: UPDATE_CUSTOMER_REVIEW,
        variables
    }).then(({ data }) => data?.review)
}

export function deleteCustomerReview(client, variables) {
    return client.mutate({
        mutation: DELETE_CUSTOMER_REVIEW,
        variables
    }).then(({ data }) => data?.status)
}
