import { GET_PATIENT, GET_EARNINGS } from "./actions";

const initialState={
    patients:[],
    earnings:[]
}

export default function reducerSearchPatients (state=initialState, action){
    switch (action.type) {
        case GET_PATIENT:
            return {
                ...state,
                patients: action.payload
            }
        case GET_EARNINGS:
            return {
                ...state,
                earnings: action.payload
            }

        default:
            return state
    }

}