import { validateAccess } from '../base/Resolver'

export const orderResolver = {
    Query: {
        customerOrder: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                return await models.Order.findOne({ where: { id: data.id, customer_id: customer.id }, include: [
                    {
                        model: models.Address
                    },
                    {
                        model: models.OrderItem,
                        include: models.Product
                    }
                ]})
            } catch (error) {
                console.error(error)

                return null
            }
        },
        allCustomerOrders: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                return await models.Order.findAll({ where: { customer_id: customer.id } })
            } catch (error) {
                console.error(error)

                return null
            }
        }
    },
    Mutation: {
        updateOrder: async function(_, data, { models, role, token }) {
            const hasAccess = await validateAccess(models, 'updateOrder', role, token)
            
            if (!hasAccess) {
                return null
            }

            try {
                const entity = await models.Order.findOne({ where: { id: data.id } })
                const totalDeliveryDifference = data.totalDelivery - entity.totalDelivery
                Object.assign(entity, data)
                entity.total += totalDeliveryDifference

                await entity.save()

                return entity
            } catch (error) {
                console.error(error)

                return false
            }
        },
    }
}

export default orderResolver
