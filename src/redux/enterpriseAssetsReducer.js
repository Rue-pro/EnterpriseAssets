import { assetsAPI } from '../api/api'
import { initializeApp } from './appReducer'
const SET_ENTERPRISE_ASSETS = 'SET_ENTERPRISE_ASSETS'
const SET_OPERATION_RESULT = 'SET_OPERATION_RESULT'

let initialState = {
    monetaryAssets: [],
    nonMonetaryAssets: [],
    operationResult: {
        message: null,
        type: null
    }
}

export const enterpriseAssetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ENTERPRISE_ASSETS:
            let newState = { ...state }
            newState[action.assetsType] = action.assets
            return newState
        case SET_OPERATION_RESULT:
            return {
                ...state,
                operationResult: {
                    message: action.message,
                    type: action.assetType
                }
            }
        default:
            return state
    }
}

export const setEnterpriseAssets = (assets, assetsType) => {
    return {
        type: SET_ENTERPRISE_ASSETS,
        assets,
        assetsType
    }
}
export const setOperationResult = (message, assetType) => {
    return {
        type: SET_OPERATION_RESULT,
        message,
        assetType
    }
}
export const getEnterpriseAssets = (type) => dispatch => {
    return assetsAPI.getAssets(type)
    .then(response => {
        if(response.resultCode === 0)
            dispatch(setEnterpriseAssets(response.data, type))
    })
}

export const addEnterpriseAsset = (assetData, type) => dispatch => {
    return assetsAPI.addAsset(assetData, type)
    .then(response => {
        if (response.resultCode === 0) 
            dispatch(initializeApp())
    })
}

export const deleteEnterpriseAsset = (assetId, type) => dispatch => {
    return assetsAPI.deleteAsset(assetId, type)
    .then(response => {
        if (response.resultCode === 0) 
            dispatch(initializeApp())
    })
}

export const updateEnterpriseAsset = (assetId, assetData, type) => dispatch => {
    return assetsAPI.updateAsset(assetId, assetData, type)
    .then(response => {
        if (response.resultCode === 0) 
            dispatch(initializeApp())
    })
}