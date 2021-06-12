import { Op } from 'sequelize'

const orderMap = {
    NAME_ASC: ['name', 'ASC'],
    NAME_DESC: ['name', 'DESC'],
    PRICE_ASC: ['price', 'ASC'],
    PRICE_DESC: ['price', 'DESC'],
    SOLD_AMOUNT_ASC: ['soldAmount', 'ASC'],
    SOLD_AMOUNT_DESC: ['soldAmount', 'DESC']
}

export const searchResolver = {
    Query: {
        search: async function(_, data, { sequelize, models }) {
            const attributeValues = (JSON.parse(data.attributeValues || '{}') || {})
            Object.keys(attributeValues).forEach((key) => attributeValues[key] = Object.values(attributeValues[key]))
            const order = orderMap[data.sort]
            const page = data.page ? data.page - 1 : 0
            const perPage = data.perPage|| 100000

            try {
                const category = await models.Category.findOne({
                    where: {
                        urlKey: data.categoryUrlKey || '',
                        isEnabled: true
                    }
                })
                const products = await models.Product.findAll({
                    include: category?.id ? [
                        {
                            model: models.Category,
                            where: {
                                id: category?.id
                            }
                        }
                    ] : [],
                    where: {
                        isEnabled: true,
                        name: {
                            [Op.iLike]: '%' + (data.search || '') + '%'
                        }
                    },
                    order: order ? [order] : []
                })

                const filterValues = {}
                products.forEach((product) => {
                    const { attributeValues } = product

                    for (const attributeCode in attributeValues) {
                        const attributeValue = attributeValues[attributeCode]

                        if (!filterValues[attributeCode]) {
                            filterValues[attributeCode] = {}
                        }

                        filterValues[attributeCode][attributeValue] = true
                    }
                })
                const attributeCodes = Object.keys(filterValues)
                const attributes = models.Attribute.findAll({
                    where: {
                        code: attributeCodes
                    }
                })

                const prices = []

                const finalProducts = products.filter(
                    ({ attributeValues: values, price }) => {
                        let matches = true
                        const keys = Object.keys(values)

                        for (const key of keys) {
                            const attributeValueArray = attributeValues[key]

                            if (attributeValueArray) {
                                if (Object.keys(attributeValueArray).length) {
                                    matches = matches && attributeValueArray.indexOf(values[key].toString()) > -1
                                }
                            }

                            if (!matches) {
                                return false
                            }
                        }

                        prices.push(price)

                        return matches && price >= (data.minPrice || 0) && price <= (data.maxPrice || 100000)
                    }
                )

                // Not very efficient, but for now will be good
                const count = finalProducts.length
                const minPrice = prices.length ? Math.min(...prices) : 0
                const maxPrice = prices.length ? Math.max(...prices) : 100000

                return {
                    Category: category,
                    Products: finalProducts.slice(page * perPage, page * perPage + perPage),
                    Attributes: attributes,
                    Aggregations: {
                        count,
                        minPrice,
                        maxPrice,
                        filterValues
                    }
                }
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default searchResolver
