export function generateReference() {
    return Math.random().toString(36).substring(2).toUpperCase()
}

export const checkoutResolver = {
    Query: {
        submitOrder: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token }, include: [models.CartItem] })

                if (!customer) {
                    return false
                }

                const address = await models.Address.findOne({ where: { id: data.address_id, customer_id: customer.id } })

                if (!address) {
                    return null
                }

                const order = await models.Order.create({
                    reference: generateReference(),
                    totalDelivery: 0,
                    totalTax: customer.totalTax,
                    subtotal: customer.subtotal,
                    total: customer.total,
                    customer_id: customer.id,
                    address_id: address.id
                })

                customer.CartItems.forEach(async (cartItem) => {
                    const product = await models.Product.findByPk(cartItem.product_id)

                    if (product) {
                        product.stockQuantity -= cartItem.quantity
                        product.soldAmount += cartItem.quantity
                        await product.save()

                        await models.OrderItem.create({
                            quantity: cartItem.quantity,
                            totalTax: cartItem.totalTax,
                            subtotal: cartItem.subtotal,
                            total: cartItem.total,
                            product_id: cartItem.product_id,
                            order_id: order.id
                        })
                    }
                })

                return order.reference
            } catch (error) {
                console.error(error)

                return null
            }
        }
    },
    Mutation: {
        generateInvoice: async function(_, data, { models, token }) {
            try {
                const user = await models.User.findOne({ where: { token } })

                if (!user) {
                    return null
                }

                const order = await models.Order.findByPk(data.order_id)

                if (!order) {
                    return null
                }

                const values = {
                    totalDelivery: order.totalDelivery,
                    totalTax: order.totalTax,
                    subtotal: order.subtotal,
                    total: order.total
                }

                const invoice = await models.Invoice.findOne({ where: { order_id: order.id } }).then(async (invoice) => {
                    if (invoice) {
                        return await invoice.update(values)
                    }

                    return await models.Invoice.create({
                        ...values,
                        order_id: order.id,
                    })
                })

                return !!invoice
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default checkoutResolver
