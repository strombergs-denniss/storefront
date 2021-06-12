import pascalcase from 'pascalcase'

const fieldPermissions = {
    allBlocks: 'PUBLIC',
    allPages: 'PUBLIC',
    allCategories: 'PUBLIC',
    allPaymentMethods: 'PUBLIC',
    allShippingMethods: 'PUBLIC',
    allReviews: 'PUBLIC',
    Config: 'PUBLIC',
    AttributeSet: 'PUBLIC'
}

export function validateFieldPermission(fieldName, role) {
    const fieldPermission = fieldPermissions[fieldName]

    switch (role) {
        case 'CLIENT':
            return fieldPermission === 'CLIENT' || fieldPermission === 'PUBLIC'
        default:
            return fieldPermission === 'PUBLIC'
    }
}

export async function validateAccess(models, fieldName, role, token) {
    switch (role) {
        case 'ADMIN':
            const admin = await models.User.findOne({ where: { token } })

            if (!admin) {
                return false
            }

            return true
        case 'CLIENT':
            const client = await models.Customer.findOne({ where: { token } })

            if (!client) {
                return validateFieldPermission(fieldName, 'PUBLIC')
            }

            return validateFieldPermission(fieldName, role)
        default:
            return validateFieldPermission(fieldName, role)
    }
}

export function generateResolver(model) {
    const singularName = pascalcase(model.name)
    const pluralName = pascalcase(model.tableName)
    const getName = singularName
    const getAllName = 'all' + pluralName
    const getAllMetaName = '_all' + pluralName + 'Meta'
    const createName = 'create' + singularName
    const updateName = 'update' + singularName
    const deleteName = 'delete' + singularName

    return {
        Query: {
            [getName]: async function(_, data, { models, role, token }) {
                const hasAccess = await validateAccess(models, getName, role, token)
                
                if (!hasAccess) {
                    return null
                }

                try {
                    return await models[singularName].findByPk(data.id, { include: { all: true }, attributes: { exclude: ['password'] }, })
                } catch (error) {
                    console.error(error)

                    return null
                }
            },
            [getAllName]: async function(_, data, { models, role, token }) {
                const hasAccess = await validateAccess(models, getAllName, role, token)
                
                if (!hasAccess) {
                    return null
                }

                try {
                    const { ids, ...other } = data.filter || {}
                    const filter = ids ? { id: ids, ...other } : data.filter

                    return await models[singularName].findAll({
                        attributes: { exclude: ['password'] },
                        limit: data.perPage || 100000,
                        offset: data.page * data.perPage || 0,
                        order: data.sortField && data.sortOrder ? [[data.sortField, data.sortOrder]] : [],
                        include: {
                            all: true
                        },
                        where: filter
                    })
                } catch (error) {
                    console.error(error)

                    return null
                }
            },
            [getAllMetaName]: async function(_, data, { models, role, token }) {
                const hasAccess = await validateAccess(models, getAllMetaName, role, token)
                
                if (!hasAccess) {
                    return null
                }

                try {
                    const { ids, ...other } = data.filter || {}
                    const filter = ids ? { id: ids, ...other } : filter

                    return {
                        count: await models[singularName].count({
                            limit: data.perPage || 100000,
                            offset: data.page * data.perPage || 0,
                            order: data.sortField && data.sortOrder ? [[data.sortField, data.sortOrder]] : [],
                            where: filter
                        })
                    }
                } catch (error) {
                    console.error(error)

                    return null
                }
            }
        },
        Mutation: {
            [createName]: async function(_, data, { models, role, token }) {
                const hasAccess = await validateAccess(models, createName, role, token)
                
                if (!hasAccess) {
                    return null
                }

                try {
                    return await models[singularName].create(data)
                } catch (error) {
                    console.error(error)

                    return null
                }
            },
            [updateName]: async function(_, data, { models, role, token }) {
                const hasAccess = await validateAccess(models, updateName, role, token)
                
                if (!hasAccess) {
                    return null
                }

                try {
                    const entity = await models[singularName].findOne({ where: { id: data.id }, attributes: { exclude: ['password'] } })
                    Object.assign(entity, data)

                    await entity.save()

                    return entity
                } catch (error) {
                    console.error(error)

                    return false
                }
            },
            [deleteName]: async function(_, data, { models, role, token }) {
                const hasAccess = await validateAccess(models, deleteName, role, token)

                if (!hasAccess) {
                    return null
                }

                try {
                    const entity = await models[singularName].findOne({ where: { id: data.id } })
                    await entity.destroy()

                    return entity
                } catch (error) {
                    console.error(error)

                    return false
                }
            }
        }
    }
}

export function generateResolvers(models) {
    return models.map(generateResolver)
}
