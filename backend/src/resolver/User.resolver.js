import { compareHash, encryptPassword, generateToken } from '../base/Auth'
import { validateAccess } from '../base/Resolver'

export const userResolver = {
    Mutation: {
        signInUser: async function(_, data, { models }) {
            try {
                const user = await models.User.findOne({ where: {
                    username: data.username
                }})

                if (user && compareHash(user.password, data.password)) {
                    user.token = generateToken(user)
                    await user.save()
                    return user
                }

                return null
            } catch (error) {
                console.error(error)

                return null
            }
        },
        createUser: async function(_, data, { models, role, token }) {
            const hasAccess = await validateAccess(models, 'createUser', role, token)

            if (!hasAccess) {
                return null
            }

            try {
                data.password = encryptPassword(data.password)

                return await models.User.create(data)
            } catch (error) {
                console.error(error)

                return null
            }
        },
        updateUser: async function(_, data, { models }) {
            try {
                const user = await models.User.findOne({ where: {
                    id: data.id
                }})

                if (user && compareHash(user.password, data.currentPassword)) {
                    user.username = data.username
                    user.firstName = data.firstName
                    user.lastName = data.lastName
                    user.email = data.email

                    if (data.password) {
                        user.password = encryptPassword(data.password)
                    }

                    await user.save()
                    user.password = null

                    return user
                }

                return null
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default userResolver
