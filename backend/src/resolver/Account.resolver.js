import { compareHash, encryptPassword, generateToken } from '../base/Auth'

export const accountResolver = {
    Mutation: {
        signIn: async function(_, data, { models }) {
            try {
                const customer = await models.Customer.findOne({ where: {
                    email: data.email,
                }, include: { model: models.CartItem, include: [models.Product] }})

                if (customer && !compareHash(customer.password, data.password)) {
                    return null
                }

                customer.token = generateToken(customer)
                await customer.save()

                return customer
            } catch (error) {
                console.error(error)

                return null
            }
        },
        signUp: async function(_, data, { models }) {
            try {
                const customer = await models.Customer.create(data)
                customer.token = generateToken(customer)
                customer.password = encryptPassword(customer.password)
                await customer.save()

                return customer
            } catch (error) {
                console.error(error)

                return null
            }
        },
        changePassword: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (customer) {
                    if (compareHash(customer.password, data.oldPassword)) {
                        customer.password = encryptPassword(data.newPassword)
                        await customer.save()
                        return true
                    }
                }

                return false
            } catch (error) {
                console.error(error)

                return null
            }
        },
        updateAccount: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})
                
                if (customer) {
                    customer.email = data.email
                    customer.firstName = data.firstName
                    customer.lastName = data.lastName
                    await customer.save()
                    
                    return customer
                }

                return null
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default accountResolver
