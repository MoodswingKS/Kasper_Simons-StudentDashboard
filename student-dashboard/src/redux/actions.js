import * as actionTypes from './reducers/types';

export const showData = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SHOW_DATA,
            payload: data
        })
    }
}

