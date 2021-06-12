import { gql, useQuery } from '@apollo/client'

export const GET_ALL_CATEGORIES = gql`
    query GetAllCategories {
        categories: allCategories(filter: { isEnabled: true, isInMenu: true }) {
            id
            isEnabled
            name
            urlKey
            isInMenu
            categoryId: category_id
        }
    }
`

export function GetAllCategories() {
    const { loading, error, data: { categories } = {} } = useQuery(GET_ALL_CATEGORIES, {})

    if (loading || error) {
        return null
    }

    return categories
}
