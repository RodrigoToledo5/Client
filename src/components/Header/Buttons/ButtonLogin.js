import Button from '@material-ui/core/Button'
import { makeStyles} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
const useStyle=makeStyles(theme=>({
    btn:{
        margin: theme.spacing(1),
        minWidth:'84px'
        
    },
}))

export default function ButtonLogin(){
    let history=useHistory();
    const classes=useStyle();
    function handleClick(btnlink){
        history.push(btnlink)
    }
    return(
        <Button type="button" variant='contained' className={classes.btn} onClick={()=>handleClick("/login")}>
            Iniciar sesión
        </Button>
    )
}