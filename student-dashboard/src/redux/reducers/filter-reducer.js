import { fetchData } from "../../fetchData.js";
import * as actionTypes from "./types.js";

const initialState = [];

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_LIST:
      const newList = action.payload;
      return {
        filtered: [...newList],
      };
    default:
      return state;
  }
};

export const filterList = async (dispatch, item) => {
  const data = await fetchData();
  if (item === "Student") {
    const response = data.sort((a, b) => a.Student.localeCompare(b.Student));
    return dispatch({ type: "FILTER_LIST", payload: response });
  } else if (item === "Opdracht") {
    const response = data.sort((a, b) => a.Opdracht.localeCompare(b.Opdracht));
    return dispatch({ type: "FILTER_LIST", payload: response });
  } else if (item === "Moeilijkheid") {
    const response = data.sort((a, b) => b.Moeilijkheid - a.Moeilijkheid);
    return dispatch({ type: "FILTER_LIST", payload: response });
  } else {
    const response = data.sort((a, b) => b.Plezier - a.Plezier);
    return dispatch({ type: "FILTER_LIST", payload: response });
  }
};

export default filterReducer;
