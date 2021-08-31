import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {useUser} from "reactfire";

export default function PatientsRouter({component:Component,...rest}){
    const user = useSelector((store) => store.reducerLog.user)
    const userFire=useUser();
    function checkUser(){
       if(user.tipo_usuario==="paciente"){
           if(userFire.data.emailVerified)return true
        } 
       else return false;
    }
    return(
  
        <Route {...rest}>{ checkUser()?<Component/>:<Redirect to="/"/>}</Route>
    )
}