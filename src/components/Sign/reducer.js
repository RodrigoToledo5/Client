import { GET_COUNTRIES, POST_SIGN_IN, FLAG_LOG } from "./actions";

const initialState = {
  countries: [],  // guarda paises traidos de la api
  postSingIn: "", // info del user recien registrado
  flagLog: false, // flag usado para evitar asincronismos despues de registrarse
};

export default function reducerSign(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case POST_SIGN_IN:
      return {
        ...state,
        postSingIn: action.payload,
      };
    case FLAG_LOG:
      return {
        ...state,
        flagLog: action.payload,
      };
    default:
      return state;
  }
}
