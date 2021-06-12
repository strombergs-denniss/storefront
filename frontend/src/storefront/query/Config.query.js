import { gql, useQuery } from '@apollo/client'

export const GET_CONFIG = gql`
    query GetConfig {
        config: Config(id: 1) {
            currencySign
            currencySignPosition
        }
    }
`

export function GetConfig() {
    const { loading, error, data: { config } = {} } = useQuery(GET_CONFIG, {})

    if (loading || error) {
        return null
    }

    return config
}
