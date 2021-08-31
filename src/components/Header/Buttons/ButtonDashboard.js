import Button from '@material-ui/core/Button'
import { makeStyles} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import "firebase/auth";
import "../../../firebase/firebase";


const useStyle=makeStyles(theme=>({
    btn:{
        margin: theme.spacing(1),
        minWidth:'84px'
        
    },
}))

export default function ButtonDashboard(){
    const classes=useStyle();
    let history = useHistory();
    const user = useSelector((store) => store.reducerLog.user);

    //redirecciona al dashboard correcto
    const toDashboard = ()=>{
        if(user.email && user.tipo_usuario)
        {user.tipo_usuario === 'profesional'? history.push('/profesional-dashboard') : history.push('/patient-dashboard')}
    }

    return(
        <Button type="button" variant='contained' className={classes.btn} onClick={()=>toDashboard()}>
            Panel
        </Button>
    )
}

