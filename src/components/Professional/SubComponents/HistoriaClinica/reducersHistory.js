import { GET_HISTORIA } from "./actions";

const initialState={
    history:{}
}

export default function reducerHistory (state=initialState, action){
    switch (action.type) {
        case GET_HISTORIA:
            return {
                ...state,
                history: action.payload
            }
        default:
            return state
    }

}