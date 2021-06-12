import { gql, useQuery } from '@apollo/client'

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        account: signIn(email: $email, password: $password) {
            id
            email
            firstName
            lastName
            token
            totalTax
            subtotal
            total
            items: CartItems {
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
        }
    }
`

export const UPDATE_ACCOUNT = gql`
    mutation UpdateAccount(
        $email: String!,
        $firstName: String!,
        $lastName: String!
    ) {
        account: updateAccount(
            email: $email,
            firstName: $firstName,
            lastName: $lastName
        ) {
            email
            firstName
            lastName
        }
    }
`
export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
        status: changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
`

export const SIGN_OUT= gql`
    mutation SignOut {
        status: signOut
    }
`

export const SIGN_UP = gql`
    mutation SignUp(
        $email: String!,
        $password: String!,
        $firstName: String!,
        $lastName: String!
    ) {
        account: signUp(
            email: $email,
            password: $password,
            firstName: $firstName,
            lastName: $lastName
        ) {
            id
            email
            firstName
            lastName
            token
            totalTax
            subtotal
            total
        }
    }
`

export function signIn(client, variables = {}) {
    return client.mutate({
        mutation: SIGN_IN,
        variables
    }).then(({ data }) => data?.account)
}

export function singOut(client, variables = {}) {
    return client.mutate({
        mutation: SIGN_OUT,
        variables
    }).then(({ data }) => data.status)
}

export function signUp(client, variables = {}) {
    return client.mutate({
        mutation: SIGN_UP,
        variables
    }).then(({ data }) => data?.account)
}

export function changePassword(client, variables = {}) {
    return client.mutate({
        mutation: CHANGE_PASSWORD,
        variables
    }).then(({ data }) => data?.status)
}

export function updateAccount(client, variables = {}) {
    return client.mutate({
        mutation: UPDATE_ACCOUNT,
        variables
    }).then(({ data }) => data.account)
}
