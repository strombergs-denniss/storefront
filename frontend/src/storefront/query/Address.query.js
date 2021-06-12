import { gql, useQuery } from '@apollo/client'

export const GET_ALL_CUSTOMER_ADDRESSES = gql`
    query GetAllCustomerAddresses {
        addresses: allCustomerAddresses {
            id
            firstName
            lastName
            phoneNumber
            country
            city
            province
            street1
            street2
            postalCode
        }
    }
`

export const GET_CUSTOMER_ADDRESS = gql`
    query GetCustomerAddress($id: ID!) {
        address: customerAddress(id: $id) {
            id
            firstName
            lastName
            phoneNumber
            country
            city
            province
            street1
            street2
            postalCode
        }
    }
`

export const CREATE_CUSTOMER_ADDRESS = gql`
    mutation CreateCustomerAddress(
        $firstName: String!,
        $lastName: String!,
        $phoneNumber: String!,
        $country: String!,
        $city: String!,
        $province: String!,
        $street1: String!,
        $street2: String!,
        $postalCode: String!
    ) {
        address: createCustomerAddress(
            firstName: $firstName,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            country: $country,
            city: $city,
            province: $province,
            street1: $street1,
            street2: $street2,
            postalCode: $postalCode
        ) {
            id
            firstName
            lastName
            phoneNumber
            country
            city
            province
            street1
            street2
            postalCode
        }
    }
`

export const UPDATE_CUSTOMER_ADDRESS = gql`
    mutation UpdateCustomerAddress(
        $id: ID!,
        $firstName: String!,
        $lastName: String!,
        $phoneNumber: String!,
        $country: String!,
        $city: String!,
        $province: String!,
        $street1: String!,
        $street2: String!,
        $postalCode: String!
    ) {
        address: updateCustomerAddress(
            id: $id,
            firstName: $firstName,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            country: $country,
            city: $city,
            province: $province,
            street1: $street1,
            street2: $street2,
            postalCode: $postalCode
        ) {
            id
            firstName
            lastName
            phoneNumber
            country
            city
            province
            street1
            street2
            postalCode
        }
    }
`

export const DELETE_CUSTOMER_ADDRESS = gql`
    mutation DeleteCustomerAddress($id: ID!) {
        status: deleteCustomerAddress(id: $id)
    }
`

export function GetAllCustomerAddresses(variables) {
    const { loading, error, data: { addresses } = {} } = useQuery(GET_ALL_CUSTOMER_ADDRESSES, { variables })

    if (loading || error) {
        return null
    }

    return addresses
}

export function GetCustomerAddress(variables) {
    const { loading, error, data: { address } = {} } = useQuery(GET_CUSTOMER_ADDRESS, { variables })

    if (loading || error) {
        return null
    }

    return address
}

export function createCustomerAddress(client, variables) {
    return client.mutate({
        mutation: CREATE_CUSTOMER_ADDRESS,
        variables
    }).then(({ data }) => data?.address)
}

export function updateCustomerAddress(client, variables) {
    return client.mutate({
        mutation: UPDATE_CUSTOMER_ADDRESS,
        variables
    }).then(({ data }) => data?.address)
}

export function deleteCustomerAddress(client, variables) {
    return client.mutate({
        mutation: DELETE_CUSTOMER_ADDRESS,
        variables
    }).then(({ data }) => data?.status)
}
