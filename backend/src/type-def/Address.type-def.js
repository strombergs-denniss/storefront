export const addressTypeDef = `
    type Query {
        customerAddress(id: ID!) : Address
        allCustomerAddresses : [Address]
    }

    type Mutation {
        createCustomerAddress(
            firstName: String!,
            lastName: String!,
            phoneNumber: String!,
            country: String!,
            city: String!,
            province: String,
            street1: String!,
            street2: String,
            postalCode: String!
        ) : Address
        updateCustomerAddress(
            id: ID!,
            firstName: String!,
            lastName: String!,
            phoneNumber: String!,
            country: String!,
            city: String!,
            province: String,
            street1: String!,
            street2: String,
            postalCode: String!
        ) : Address
        deleteCustomerAddress(id: ID!) : Boolean
    }
`

export default addressTypeDef
