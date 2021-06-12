import { fetchGraphQl, getItem, setItem, removeItem } from '../../base/Utility'

const SIGN_IN_USER = `
    mutation SingInUser($username: String!, $password: String!) {
        user: signInUser(username: $username, password: $password) {
            id
            username
            email
            firstName
            lastName
            token
        }
    }
`

const authProvider = {
    login: async ({ username, password }) => {
        const user = await fetchGraphQl(SIGN_IN_USER, { username, password }, 'user')

        if (user) {
            setItem('USER', user)

            return Promise.resolve()
        }

        return Promise.reject()
    },
    logout: () => {
        removeItem('USER')

        return Promise.resolve()
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
        const user = getItem('USER') || {}
        const { token } = user

        return token ? Promise.resolve() : Promise.reject()
    },
    getPermissions: () => Promise.reject(),
    getIdentity: () => {
        const user = getItem('USER') || {}
        const { firstName, lastName } = user

        return Promise.resolve({ fullName: `${ firstName} ${ lastName }` })
    }
}

export default authProvider
