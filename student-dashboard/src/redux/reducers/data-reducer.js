import * as actionTypes from './types.js'

export const INITIAL_STATE = {}

const showData = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SHOW_DATA:
            return{ ...state, results: action.results }
        default:
            return state
    }
}

export default showData