import { gql, useQuery } from '@apollo/client'

export const GET_BLOCK = gql`
    query GetBlock($code: String!) {
        allBlocks(filter: { code: $code }) {
            id
            code,
            isEnabled
            content
        }
    }
`

export function GetBlock(variables) {
    const { loading, error, data: { allBlocks: [block] = [] } = {} } = useQuery(GET_BLOCK, { variables })

    if (loading || error) {
        return null
    }

    return block
}

export default GetBlock
