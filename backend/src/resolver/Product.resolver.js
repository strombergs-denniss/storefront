export const productResolver = {
    Query: {
        ProductByUrlKey: async function(_, data, { models }) {
            try {
                return await models.Product.findOne({
                    include: [
                        {
                            model: models.Category
                        },
                        {
                            model: models.AttributeSet,
                            include: [
                                {
                                    model: models.Attribute,
                                    where: {
                                        isEnabled: true
                                    }
                                }
                            ]
                        }
                    ],
                    where: {
                        urlKey: data.urlKey,
                        isEnabled: true
                    }
                })
            } catch (error) {
                console.error(error)

                return null
            }
        }
    }
}

export default productResolver
