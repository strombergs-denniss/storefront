import { CONFIG } from './Config'

export function setItem(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(error)
    }
}

export function getItem(key) {
    try {
        return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
        console.error(error)

        return null
    }
}

export function removeItem(key) {
    try {
        window.localStorage.removeItem(key)
    } catch (error) {
        console.error(error)
    }
}

export function fetchGraphQl(query, variables, key, role = 'PUBLIC') {
    const authentication = (role === 'ADMIN' ? getItem('USER') : (role === 'CLIENT' ? getItem('ACCOUNT') : {}))?.token

    return fetch(CONFIG.API + CONFIG.GRAPH_QL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Role': role,
            'Authentication': authentication
        },
        body: JSON.stringify({
            query,
            variables
        })
    }).then(data => data.json()).then(({ data }) => {
        if (key) {
            const { [key]: value } = data || {}

            return value
        }

        return data
    })
}

