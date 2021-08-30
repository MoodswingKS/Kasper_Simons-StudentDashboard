import * as actionTypes from './types.js'

const initialState = []

const locationReducer = (state = initialState, action) => {
    if (action.type === actionTypes.LOCATION_PUSH) {

        return action.payload
    }
    return state
}

export const getLocation = (dispatch) => {
    const location = window.location.href
    
    dispatch({ type: 'LOCATION_PUSH', payload: location })
}

export default locationReducer