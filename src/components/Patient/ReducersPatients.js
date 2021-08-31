import { GET_APPOINTMENT_PATIENT } from "./actions";
import { GET_PROFESSIONAL } from "./actions";

const initialState = {
    appointment:[],
    professionals:{}
}

export default function reducerPatient(state=initialState, action){
    switch (action.type) {
        case GET_APPOINTMENT_PATIENT:
            return {
                ...state,
                appointment: action.payload
            }
        case GET_PROFESSIONAL:
            return {
                ...state,
                professionals: action.payload
            } 
        default:
            return state
    }
}