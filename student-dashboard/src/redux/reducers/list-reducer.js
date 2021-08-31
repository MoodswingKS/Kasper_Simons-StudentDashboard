import * as actionTypes from "./types.js";
import { fetchData } from "../../fetchData.js";

const initialState = [];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STUDENT_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const getStudentList = async (dispatch) => {
  const data = await fetchData();
  const allNames = data.map((name) => name.Student);
  const nameList = [...new Set(allNames)];
  dispatch({ type: "STUDENT_LIST", payload: nameList });
};

export default listReducer;
