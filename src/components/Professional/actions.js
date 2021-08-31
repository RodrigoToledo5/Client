import axios from "axios";
import { API } from "../..";
export const GET_PROFESIONAL = 'GET_PROFESIONAL';
export const GET_PATIENT = 'GET_PATIENT';
export const ADD_PATIENT = 'ADD_PATIENT';
export const GET_MYPATIENTS = 'GET_MYPATIENTS';
export const REMOVE_MYPATIENTS = 'REMOVE_MYPATIENTS';
export const CLEAR_MY_PATIENTS = 'CLEAR_MY_PATIENTS';
export const GET_EARNINGS = 'GET_EARNINGS';

export const searchprofesional = (input)=>{
    if(input.includes('@')){
        return async (dispatch) => {
            const res = await axios.get(`${API}/profesional?email=${input}`)
            dispatch({ type: GET_PROFESIONAL, payload:  res.data })
        }
    }
    else{
        return async (dispatch) => {
        const res = await axios.get(`${API}/profesional?fullName=${input}&speciality=${input}`)
        dispatch({ type: GET_PROFESIONAL, payload:  res.data })
        }
}}

export const getPatient = (name) => {
    return async (dispatch) =>{
        const patient = await axios.get(`${API}/patients?nombre=${name}`)
        dispatch({type:GET_PATIENT, payload: patient.data})
    }

}
export const addPatient = (data) => {
    return async(dispatch) =>{
        const patients = await axios({
            method: 'POST',
            url: `${API}/add-patients`,
            data: data
        })
        dispatch({type: ADD_PATIENT, payload: patients.data})
    }
}

export const removeMyPatient = (data) => {
    return async(dispatch) => {
        axios({
            method: 'DELETE',
            url: `${API}/del-mypatients`,
            data: data
        })
        dispatch({type: REMOVE_MYPATIENTS})
    }
} 

export const getMyPatients = (data) =>{
    return async(dispatch) =>{
        const patients = await axios.get(`${API}/my-patients?email=${data}`)
        dispatch({type: GET_MYPATIENTS, payload: patients.data})
    }
}

export const clearMypatients = ()=>{
    return{
        type: CLEAR_MY_PATIENTS,
    }
}

export const getEarnings = () => {
    return async (dispatch)=>{
        const earnings = await axios.get(`${API}/treatmentsAll`)
        dispatch({type: GET_EARNINGS, payload: earnings.data})
    }
}




