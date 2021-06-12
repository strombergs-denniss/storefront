export const addressResolver = {
    Query: {
        customerAddress: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                return await models.Address.findOne({ where: { id: data.id, customer_id: customer.id } })
            } catch (error) {
                console.error(error)

                return null
            }
        },
        allCustomerAddresses: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                return await models.Address.findAll({ where: { customer_id: customer.id } })
            } catch (error) {
                console.error(error)

                return null
            }
        }
    },
    Mutation: {
        createCustomerAddress: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                return await models.Address.create({
                    ...data,
                    customer_id: customer.id
                })
            } catch (error) {
                console.error(error)

                return null
            }
        },
        updateCustomerAddress: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                const entity = await models.Address.findOne({ where: { id: data.id, customer_id: customer.id } })
                Object.assign(entity, data)
                await entity.save()

                return entity
            } catch (error) {
                console.error(error)

                return null
            }
        },
        deleteCustomerAddress: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                const entity = await models.Address.findOne({ where: { id: data.id, customer_id: customer.id } })
                entity.customer_id = null
                entity.save()

                return true
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default addressResolver
