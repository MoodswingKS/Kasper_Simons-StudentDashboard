import * as actionTypes from './reducers/types';

export const showData = (results) => {
    return {
        type: actionTypes.SHOW_DATA,
        payload: {
            data: results
        }
    }
}