import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { enterpriseAssetsReducer } from './enterpriseAssetsReducer'
import { appReducer } from './appReducer'

let reducers = combineReducers({
    enterpriseAssetsReducer,
    appReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.state=store.getState()
export default store