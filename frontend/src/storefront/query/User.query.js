export const UPDATE_USER = `
    mutation UpdateUser(
        $id: ID!,
        $username: String!,
        $email: String!,
        $password: String,
        $firstName: String!,
        $lastName: String!,
        $currentPassword: String!
    ) {
        user: updateUser(
            id: $id,
            username: $username,
            email: $email,
            password: $password,
            firstName: $firstName,
            lastName: $lastName,
            currentPassword: $currentPassword
        ) {
            id
            username
            email
            firstName
            lastName
        }
    }
`
