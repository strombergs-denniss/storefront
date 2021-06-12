export const userTypeDef = `
    type Mutation {
        signInUser(username: String!, password: String!) : User
        updateUser(
            currentPassword: String!
        ) : User
    }
`

export default userTypeDef
