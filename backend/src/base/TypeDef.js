import pascalcase from 'pascalcase'

export const typeMap = {
    BOOLEAN: 'Boolean!',
    INTEGER: 'Int!',
    FLOAT: 'Float!',
    STRING: 'String!',
    JSONB: 'JSON!',
    TEXT: 'String!',
    DATE: 'Date!'
}

export function generateFields(model, tabSize, tabCount) {
    let fields = ''

    for (const attributeKey in model.rawAttributes) {
        const attributeValue = model.rawAttributes[attributeKey]
        const type = attributeKey.includes('Id') || attributeKey.includes('_id') ? "ID!" : typeMap[attributeValue.type.key]

        if (attributeKey !== 'id' && !attributeValue._autoGenerated) {
            fields += ' '.repeat(tabSize * tabCount) + attributeKey + ': ' + (attributeValue.defaultValue !== undefined ? type.replace('!', '') : type) + '\n'
        }
    }

    return fields.trimStart().slice(0, -1)
}

export function generateAssociations(model, tabSize, tabCount) {
    let associations = ''

    for (const associationKey in model.associations) {
        const associationValue = model.associations[associationKey]
        const left = associationValue.associationType.includes('Many') ? '[' : ''
        const right = associationValue.associationType.includes('Many') ? ']' : ''

        associations += ' '.repeat(tabSize * tabCount) + associationKey + ': ' + left + pascalcase(associationValue.target.name) + right + '\n'
    }

    return associations.trimStart().slice(0, -1)
}

export function generateAssociationsReferences(model, tabSize, tabCount) {
    let associations = ''

    for (const associationKey in model.associations) {
        const associationValue = model.associations[associationKey]

        if (associationValue.associationType == 'BelongsToMany') {
            associations += ' '.repeat(tabSize * tabCount) + pascalcase(associationValue.target.name) + 'Id' + ': ' + 'ID' + '\n'
        }
    }

    return associations.trimStart().slice(0, -1)
}


export function generateTypeDef(model) {
    const singularName = pascalcase(model.name)
    const pluralName = pascalcase(model.tableName)
    const fields1 = generateFields(model, 4, 3)
    const fields2 = generateFields(model, 4, 4)
    const associations = generateAssociations(model, 4, 3)
    const assoc2 = generateAssociationsReferences(model, 4, 3)

    const a = `
        scalar Date
        scalar JSON

        type ${ singularName } {
            id: ID!
            ${ fields1.replace(/!/g, '') }
            ${ associations }
        }

        type ListMetadata {
            count: Int
        }

        input ${ singularName }Filter {
            id: ID
            ids: [ID]
            ${ fields1.replace(/!/g, '') }
            ${ (assoc2.match(/ProductId/gi) || []).length > 1 ? '' : assoc2 }
        }

        input ${ singularName }Input {
            id: ID!
            ${ fields1 }
        }

        type Query {
            ${ singularName }(id: ID!): ${ singularName }

            all${ pluralName }(
                page: Int
                perPage: Int
                sortField: String
                sortOrder: String
                filter: ${ singularName }Filter
            ): [${ singularName }]

            _all${ pluralName }Meta(
                page: Int
                perPage: Int
                filter: ${ singularName }Filter
            ): ListMetadata
        }

        type Mutation {
            create${ singularName }(
                ${ fields2 }
            ): ${ singularName }

            update${ singularName }(
                id: ID!
                ${ fields2 }
            ): ${ singularName }

            delete${ singularName }(id: ID!): ${ singularName }
        }
    `

    return a
}
