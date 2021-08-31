import {  Box,makeStyles} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import { useHistory } from 'react-router-dom';

const useStyle=makeStyles(theme=>({
  magin:{
      margin: theme.spacing(2),
  },
  menuButton:{
      margin: theme.spacing(1),
      
  },
  fledDirection:{
      flexDirection:'row-reverse',
  },
  bar:{
      background:"white",
      borderRadius:"5px"
  },
  text:{
      color:"#159DE9",
      marginRight:theme.spacing(100),
      marginLeft:theme.spacing(5)
  },
  box_container:{
      marginTop:theme.spacing(10),
      alignItems:"center",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      '@media (min-width:600px)': {
        marginTop:theme.spacing(10),
        alignItems:"center",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
      },
  },
  box:{
    width:"300px",
    '@media (min-width:600px)': {
      width:"600px",
      margin:"10px"
    }
  },

}))

function Succes() {
  var history = useHistory()
  function checkPath(){
    setTimeout(()=>history.push('/'), 5000)
    if(window.location.pathname.includes('/succes')){
      return 'succes'
    }
    if(window.location.pathname.includes('/failure')){
      return 'failure'
    }
    if(window.location.pathname.includes('/pending')){
      return 'pending'
    }
  }

  const classes=useStyle();
  return (
    <Box className={classes.box_container}>
        <Box className={classes.box} marginBottom="10px">

          {
            checkPath() === 'succes' && <Alert severity="success"> Se realizo el pago </Alert>
          }
          {
            checkPath() === 'failure' && <Alert severity="error"> El pago fallo </Alert>
          }
          {
            checkPath() === 'pending' && <Alert severity="info">El pago esta pendiente </Alert>
          }
        </Box>
    </Box>
  );
}

export default Succes;
