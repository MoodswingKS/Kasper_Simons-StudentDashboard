import * as actionTypes from './reducers/types';

// export const showData = (data) => {
//     return {
//         type: actionTypes.SHOW_DATA,
//         payload: {
//             data: data
//         }
//     }
// }

export const showData = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SHOW_DATA,
            payload: data
        })
    }
}