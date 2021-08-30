import * as actionTypes from './types.js'
import { fetchData } from '../../fetchData.js'

const initialState = []

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_DATA:
            return action.payload
        default:
            return state
    }
}

export const fetchMoreData = async (dispatch, getState) => {
    const response = await fetchData()
    dispatch({ type: 'SHOW_DATA', payload: response })
}


export default dataReducer