import * as actionTypes from "./types.js";
import { fetchData } from "../../fetchData.js";

const initialState = [];

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSIGNMENT_LIST:
      return action.payload;
    default:
      return state;
  }
};

export const getAssignmentList = async (dispatch) => {
  const data = await fetchData();
  const allAssignments = data.map((assignment) => assignment.Opdracht);
  const allOpdrachten = [...new Set(allAssignments)];
  dispatch({ type: "ASSIGNMENT_LIST", payload: allOpdrachten });
};

export default assignmentReducer;
