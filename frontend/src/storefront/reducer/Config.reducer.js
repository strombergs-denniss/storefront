export const initialState = {}

export function ConfigReducer(state = initialState, action) {
    const { type, payload: { config } = {} } = action

    switch (type) {
        case 'SET_CONFIG':
            if (config) {
                return config
            }

            return state
        default:
            return state
    }
}

export default ConfigReducer
