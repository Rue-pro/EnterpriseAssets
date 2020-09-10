import { getEnterpriseAssets } from './enterpriseAssetsReducer'
const INITIALIZING_SUCCESS = 'SET_INITIALIZED'

let initialState = {
    inititialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZING_SUCCESS:
            return {
                ...state,
                inititialized: true
            }
        default:
            return state
    }
}

export const initializingSuccess = () => {
    return {
        type: INITIALIZING_SUCCESS
    }
}

export const initializeApp = () => dispatch => {
    dispatch(getEnterpriseAssets('monetaryAssets')).then(() => {
        dispatch(getEnterpriseAssets('nonMonetaryAssets')).then(() => {
            dispatch(initializingSuccess())
        })
    })
}