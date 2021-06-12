export const reviewResolver = {
    Query: {
        customerReview: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                return await models.Review.findOne({ where: { id: data.id, customer_id: customer.id } })
            } catch (error) {
                console.error(error)

                return null
            }
        },
        allCustomerReviews: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token } })

                if (!customer) {
                    return null
                }
                

                return await models.Review.findAll({ where: { customer_id: customer.id }, include: models.Product })
            } catch (error) {
                console.error(error)

                return null
            }
        },
        allProductReviews: async function(_, data, { models }) {
            try {
                return await models.Review.findAll({ where: { product_id: data.product_id }, include: models.Customer, order: [
                    ['date', 'DESC']
                ]})
            } catch (error) {
                console.error(error)

                return null
            }
        }
    },
    Mutation: {
        createCustomerReview: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                const product = await models.Order.findOne({ where: { customer_id: customer.id }, include: {
                    model: models.OrderItem,
                    where: {
                        product_id: data.product_id
                    }
                } })

                if (!product) {
                    return null
                }

                return await models.Review.create({
                    ...data,
                    customer_id: customer.id
                })
            } catch (error) {
                console.error(error)

                return null
            }
        },
        updateCustomerReview: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                const entity = await models.Review.findOne({ where: { id: data.id, customer_id: customer.id } })
                Object.assign(entity, data)
                await entity.save()

                return entity
            } catch (error) {
                console.error(error)

                return null
            }
        },
        deleteCustomerReview: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }})

                if (!customer) {
                    return null
                }

                const entity = await models.Review.findOne({ where: { id: data.id, customer_id: customer.id } })
                await entity.destroy()

                return true
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default reviewResolver
