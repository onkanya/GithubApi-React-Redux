import { createStore } from 'redux'

const initialState = {
    isLoding: false,
    users: [],
    info: {},
    repos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADER':
            return {
                ...state,
                isLoding: action.status
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_USER_INFO':
            return {
                ...state,
                info: action.info
            }
        case 'SET_USER_REPOS':
            return {
                ...state,
                repos: action.repos
            }
        default:
            return state
    }
}

export default createStore(
    reducer
)