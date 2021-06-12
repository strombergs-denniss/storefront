import { gql, useQuery } from '@apollo/client'

export const GET_PAGE = gql`
    query GetPage($urlKey: String!) {
        pages: allPages(filter: { urlKey: $urlKey, isEnabled: true }) {
            id
            urlKey,
            content
        }
    }
`

export const GET_ALL_PAGES = gql`
    query GetAllPages {
        pages: allPages(filter: { isEnabled: true }) {
            id
            urlKey
            title
        }
    }
`

export function GetPage(variables) {
    const { loading, error, data: { pages: [page] = [] } = {} } = useQuery(GET_PAGE, { variables })

    if (loading || error) {
        return null
    }

    return page
}

export function GetAllPages(variables) {
    const { loading, error, data: { pages } = {} } = useQuery(GET_ALL_PAGES, { variables })

    if (loading || error) {
        return null
    }

    return pages
}

export default GetPage
