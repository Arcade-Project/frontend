export const isAuthenticated = (boolean) => {
    return {
        type: 'AUTHENTICATION',
        payload: boolean
    }
}

export const setErrorMessage = (msg) => {
    return {
        type: 'ERROR_MESSAGE',
        payload: msg
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}