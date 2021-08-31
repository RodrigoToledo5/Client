import {Box, Typography, makeStyles, Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addPatient,getPatient} from '../../actions'
import SearchBar from "../../SearchBar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { redirect } from '../../../Log/actions';

const useStyle = makeStyles((theme) => ({
    text: {
      color: "#159DE9",
    },
    box: {
      padding: "10px",
      paddingLeft: "50px",
      paddingRight: "50px",
      marginLeft: "10px",
      marginRight: "10px",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      color: "#159DE9",
    },
    grid:{
      color:"black",
      

    },
    btnBox:{
      marginTop: '10px'
    }
    ,
    success:{
      display: 'flex',
      alignItems: 'center'
    },
    alert:{
      marginLeft: '7px',
      fontFamily: 'Roboto',
      fontSize: '18px',

    }
}));
  
export default function Patients(){
    const classes = useStyle();
    const patients = useSelector(store => store.reducerSearchPatients.patients);
    const professional = useSelector(store => store.reducerLog.user);
    const dispatch = useDispatch()

    const columns = [
     
      { field: 'dni', headerName: 'Cedula', width: 120 },
      {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: true,
      },
      {
        field: 'lastName',
        headerName: 'Apellido',
        width: 150,
        editable: true,
      },
      {
        field: 'phone',
        headerName: 'Telefono',
        width: 150,
        editable: true,
      },
      {
        field: 'birth',
        headerName: 'Fecha de nacimiento',
        type: 'date',
        width: 150,
        editable: true,
      },
      {
        field: 'address',
        headerName: 'Direccion',
        width: 150,
        editable: true,
      },
      {
        field: 'country',
        headerName: 'Pais',
        width: 150,
        editable: true,
      },
      {
        field: 'email',
        headerName: 'Correo electronico',
        width: 150,
        editable: true,
      },
    ];
    
    const rows = patients && patients.map(patient => {
      return {
        id: patient.id,
        dni: patient.cedula,
        name: patient.nombre,
        lastName: patient.apellidos,
        phone: patient.telefono,
        birth: patient.fecha_de_nacimiento.substring(0,10),
        address: patient.direccion,
        country: patient.pais,
        email: patient.usuarioEmail
      }
    });
    const [select,setSelect] = useState([]);
    const [added, setAdded] = useState(false);

    const handleAdd = () =>{
      
      const data = {
        email: professional.email,
        idPatients : select
      }
      dispatch(addPatient(data))
      setSelect([]);
      setAdded(true)
      setTimeout(() => {
        setAdded(false)
        dispatch(redirect(0));
      }, 1000);
    }
    
    return(
        <Box className={classes.box}>
            <Typography variant='h3' color='blue'>Pacientes</Typography>
            <SearchBar getAction={getPatient}/>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid className={classes.grid}
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(items) => setSelect(items)}
              />
            </div>
            {select.length > 0 && 
              <Box className={classes.btnBox}>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleAdd}
                >
                  AGREGAR PACIENTES
                </Button>
              </Box>}
            {added && 
              <Box className={classes.success}>
                <CheckCircleIcon className={classes.icon}/>
                <Box className={classes.alert}>
                  <p>
                      Pacientes agregados.
                  </p>            
                </Box>
              </Box>}

        </Box>
    )
}

