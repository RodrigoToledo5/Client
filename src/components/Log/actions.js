import axios from "axios";
import { API } from "../..";

export const POST_LOG = 'POST_LOG';
export const INFO_USER = 'INFO_USER';
export const DESLOG = 'DESLOG';
export const REDIRECT = 'REDIRECT';
export const SET_PATIENT = 'SET_PATIENT';
export const SET_CITA = 'ACT_CITA';



export const postLogIn = (email)=>{
    return async (dispatch) => {
    const res = await axios({
            method: 'POST',
            url: `${API}/login`,
            data: {email}
        })
    dispatch({ type: POST_LOG, payload:  res.data })
}}

export const getInfo = (user)=>{
    return async (dispatch) => {
    const res = await axios({
            method: 'POST',
            url: `${API}/info`,
            data: user
        })
    dispatch({ type: INFO_USER, payload:  res.data })
}}

export const redirect=(route)=>(dispatch)=>{
    dispatch({ type: REDIRECT, payload:route})
}

export const setPatient=(patient)=>(dispatch)=>{
    dispatch({ type: SET_PATIENT, payload:patient})
}

export const desLog=()=>(dispatch)=>{
    dispatch({ type: DESLOG})
}

export const setCita=(cita)=>(dispatch)=>{
    dispatch({ type: SET_CITA, payload:cita})
}

