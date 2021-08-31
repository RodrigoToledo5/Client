import { ADD_PATIENT, GET_MYPATIENTS, REMOVE_MYPATIENTS, CLEAR_MY_PATIENTS } from "./actions";

const initialState={
    MyPatientsList:[],
    reset: 0
}

export default function reducerAddPatients (state=initialState, action){
    switch (action.type) {
        case ADD_PATIENT:
            return {
                ...state,
                reset: state.reset + 1,
                MyPatientsList: action.payload.pacientes
            }
        case GET_MYPATIENTS:
            return {
                ...state,
                reset: 0,
                MyPatientsList: action.payload.pacientes
            }
        case REMOVE_MYPATIENTS:
            return {
                ...state,
                reset: state.reset + 1
            }
        case CLEAR_MY_PATIENTS:
            return {
                ...state,
                MyPatientsList: []
            }
        default:
            return state
    }

}