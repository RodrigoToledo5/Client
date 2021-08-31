import axios from "axios";
import { API } from "../..";

export const GET_APPOINTMENT_PATIENT = 'GET_APPOINTMENT_PATIENT';
export const GET_PROFESSIONAL = 'GET_PROFESSIONAL';

export const getAppointment =  (pacienteId, get)=>{
   return  async (dispatch)=>{
         await axios({
            method: 'POST',
            url: `${API}/cita`,
            data: 
            { 
            pacienteId: pacienteId, 
            get: get
            }
        }).then((res)=> dispatch({type:GET_APPOINTMENT_PATIENT, payload: res.data})) 
   }
}

export const getProfessional = (pacienteId) => {
   return async (dispatch) =>{
      const professionals = await axios.get(`${API}/relation?pacienteId=${pacienteId}`);
      dispatch({type:GET_PROFESSIONAL, payload: professionals.data})
   }
}
