import axios from "axios";
import { API } from "../../../..";
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const GET_ESPECIALITIES = 'GET_ESPECIALITIES';

export const updateProfile = (user)=>{
    return async (dispatch) => {
    const res = await axios({
            method: 'PUT',
            url: `${API}/updateUser`,
            data: {...user}
        })
    dispatch({ type: UPDATE_PROFILE, payload:  res.data })
}}
export const getSpecialities=()=>{
    return async (dispatch) => {
        const res = await axios.get(`${API}/specialities?all=all`)  
        dispatch({ type: GET_ESPECIALITIES, payload:  res.data })
    }
}