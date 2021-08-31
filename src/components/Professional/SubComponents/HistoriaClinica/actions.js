import axios from "axios";
import { API } from "../../../..";

export const GET_HISTORIA = 'GET_HISTORIA';

export const searchHistory = (idPaciente)=>{
    
        return async (dispatch) => {
            const res=await axios.get(`${API}/medicalRecord?idPaciente=${idPaciente}`)
        dispatch({ type: GET_HISTORIA, payload:  res.data })
        
    }
}