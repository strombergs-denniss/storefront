export const computeTotals = async (models, customer) => {
    const items = await models.CartItem.findAll({ where: { customer_id: customer.id }, include: [models.Product] })
    const totalTax = items.reduce((acc, val) => (acc + val.totalTax), 0)
    const subtotal = items.reduce((acc, val) => (acc + val.subtotal), 0)
    const total = subtotal + totalTax

    customer.totalTax = totalTax
    customer.subtotal = subtotal
    customer.total = total
    await customer.save()

    return {
        totalTax,
        subtotal,
        total
    }
}

export const computeItemTotals = (item) => {
    const { Product: { specialDiscountType, specialDiscountValue, price, specialTaxRate } = {}, quantity } = item
    const subtotal = price * quantity
    const discountedValue = specialDiscountType === 'PERCENT' ? subtotal - subtotal * specialDiscountValue : subtotal - specialDiscountValue

    item.subtotal = discountedValue > 0 ? discountedValue : subtotal
    item.totalTax = item.subtotal * specialTaxRate / 100
    item.total = item.totalTax + item.subtotal
}

export const cartResolver = {
    Mutation: {
        addProduct: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token } })

                if (!customer) {
                    return null
                }

                const [cartItem, isCreated] = await models.CartItem.findOrCreate({
                    where: {
                        customer_id: customer.id,
                        product_id: data.product_id
                    },
                    defaults: {
                        ...data,
                        customer_id: customer.id
                    },
                    include: [
                        models.Product
                    ]
                })

                if (!isCreated) {
                    cartItem.quantity += data.quantity
                    computeItemTotals(cartItem)
                    await cartItem.save()

                    return {
                        item: cartItem,
                        totals: await computeTotals(models, customer)
                    }
                }

                const out = await models.CartItem.findByPk(cartItem.id, { include: [models.Product] })
                computeItemTotals(out)
                await out.save()

                return {
                    item: out,
                    totals: computeTotals(models, customer)
                }
            } catch (error) {
                console.error(error)

                return null
            }
        },
        removeProduct: async function(_, data, { models, token }) {
            try {
                const customer = await models.Customer.findOne({ where: { token } })
                
                if (!customer) {
                    return null
                }

                const product = await models.CartItem.findOne({
                    where: {
                        customer_id: customer.id,
                        product_id: data.product_id
                    },
                    include: [
                        models.Product
                    ]
                })

                if (product) {
                    product.quantity -= data.quantity
                    computeItemTotals(product)

                    if (product.quantity <= 0) {
                        await product.destroy()
                    } else {
                        await product.save()
                    }
                }

                return {
                    item: product,
                    totals: await computeTotals(models, customer)
                }
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default cartResolver
