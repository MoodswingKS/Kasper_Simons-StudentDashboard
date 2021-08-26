import * as actionTypes from './types.js'


const showData = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.SHOW_DATA:
            return{ state: [...action.payload] }
        default:
            return state
    }
}

export default showData