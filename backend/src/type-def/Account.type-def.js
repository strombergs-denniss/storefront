export const accountTypeDef = `
    type Mutation {
        signIn(email: String!, password: String!) : Customer
        signUp(email: String!, password: String!, firstName: String!, lastName: String!) : Customer
        updateAccount(email: String!, firstName: String!, lastName: String!) : Customer
        changePassword(oldPassword: String!, newPassword: String!) : Boolean
    }
`

export default accountTypeDef
