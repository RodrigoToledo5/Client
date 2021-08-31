import { GET_PROFESIONAL } from "./actions";

const initialState = {
  profesionales: [],  // guarda paises traidos de la api
};

export default function reducerSearchProfesional(state = initialState, action) {
  switch (action.type) {
    case GET_PROFESIONAL:
      return {
        ...state,
        profesionales: action.payload,
      };
    default:
      return state;
  }
}
