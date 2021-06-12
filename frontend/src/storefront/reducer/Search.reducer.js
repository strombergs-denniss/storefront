const initialState = {
    perPage: 12,
    sort: 'NO_ORDER',
    page: 1,
    attributeValues: {},
    minPrice: 0,
    maxPrice: 100000
}

export function SearchReducer(state = initialState, action) {
    const { attributeValues } = state
    const { type, payload: { code, values, sort, page, minPrice, maxPrice } = {} } = action

    switch (type) {
        case 'SET_PAGE':
            return {
                ...state,
                page
            }
        case 'SET_SORT':
            return {
                ...state,
                sort
            }
        case 'SET_ATTRIBUTE_VALUES':
            return {
                ...state,
                attributeValues: {
                    ...attributeValues,
                    [code]: values
                }
            }
        case 'SET_PRICE_RANGE':
            return {
                ...state,
                minPrice,
                maxPrice
            }
        case 'RESET_FILTERS':
            return initialState
        default:
            return state
    }
}

export default SearchReducer
