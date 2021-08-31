import { POST_LOG, DESLOG, INFO_USER, REDIRECT, SET_PATIENT, SET_CITA } from "./actions";

const initialState = {
  user: {},                                 // mail y tipo del usuario logeado
  info: {},                                 // hard info del user creado
  redirect: null,                           // string para cambiar el renderizada de componentes de NavPanel
  actPatient: { fullName: null, id: null }, // paciente usado para NuevaCita, cargado desde el boton de Mis Pacientes
  actCita: {},                              // cita usada para finalDate
};

export default function reducerLog(state = initialState, action) {
  switch (action.type) {
    case POST_LOG:
      return {
        ...state,
        user: action.payload,
      };
    case DESLOG: {
      return {
        ...state,
        user: {},
      };
    }
    case INFO_USER: {
      return {
        ...state,
        info: action.payload,
      };
    }
    case REDIRECT: {
      return {
        ...state,
        redirect: action.payload,
      };
    }
    case SET_PATIENT: {
      return {
        ...state,
        actPatient: action.payload,
      };
    }
    case SET_CITA: {
      return {
        ...state,
        actCita: action.payload,
      };
    }
    default:
      return state;
  }
}
