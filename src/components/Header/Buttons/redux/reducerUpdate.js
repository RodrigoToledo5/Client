import { UPDATE_PROFILE,GET_ESPECIALITIES } from "./actionUpdate";

const initialState = {
  succes: {},  //estado
  specialities:[]
};

export default function reducerUpdate(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        succes: action.payload,
      };
    case GET_ESPECIALITIES:
      return {
        ...state,
        specialities:state.specialities.concat(action.payload),
      };
    default:
      return state;
  }
}
