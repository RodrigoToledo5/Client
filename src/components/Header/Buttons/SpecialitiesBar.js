import {FormControl,MenuItem,InputLabel,Select} from '@material-ui/core/'
import { makeStyles} from '@material-ui/core';
import { blue} from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getSpecialities} from './redux/actionUpdate';


const useStyle=makeStyles(theme=>({
    btn:{
        margin: theme.spacing(1),
        minWidth:'84px'   
    },
    head:{

        backgroundColor: blue[500],
        margin:"5px"
        
    },
    menu:{
        display:"flex",
        flexDirection:"column",
        flexWrap:"notWrap",
        position:"fixed",
        right:"200px",
        top:"85px",
        minWidth:"400px",
        maxWidth:"190px",
        padding:"10px",
        marginLeft:"20px",
        marginRight:"50px",
        backgroundColor:"rgb(232, 240, 254) ",
        borderRadius:"10px",
    },
    pick:{
        height:"90px",
        width:"90px",
        borderRadius:"50%"
    },
    text:{
        padding:"1px",
        fontSize:"1.5vh"
    },
    textfield: {
        width: "100%",
      },
    
     form:{
      height:"50px",
      margin: theme.spacing(0.5),
      color: "#2196f3 !important",
      border:"1px solid",
      borderRadius:"5px"
    },
    formControl: {
        margin: theme.spacing(0.5),
        marginTop:theme.spacing(1.5),
        minWidth: "100px",
        height: "50px",
        position:"relavive",
        left:"20%",
        "@media (max-width:900px)": {
            left:"-10%",
            Width: "50px",
        }
    
    },
    selectEmpty:{
    width: "230px",
    main: "#2196f3 !important",
    height:"130px"
    },
    labelTextField:{
    color: "#2196f3 !important",
    padding:"2px",
    margin:"2px",
},
    menuItem:{
    position:"fixed",
},
}))
export default function SpecialitiesBar({setEspecialidad:setEspecialidad}){
    const dispatch = useDispatch();
    const classes=useStyle();
    useEffect(()=>{
        dispatch(getSpecialities());
    },[dispatch])
    const especialidades = useSelector(state => state.reducerUpdate.specialities)
    const onHandleChange = (e) => {
        setEspecialidad(e.target.value)
    }
 return(
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel  id="demo-simple-select-outlined-label">Especialidad</InputLabel>
        <Select 
            label="especialidad"
            labelId="especialidades"
            id="especialidad"
            className={classes.selectEmpty}
            inputProps={{ className: classes.labelTextField}}
            name="especialidad"
            onChange={(event)=>onHandleChange(event)}
            >
                {especialidades && especialidades.map( (speciality,i) => {
                    return (
                        <MenuItem key={i} value={speciality.nombre} >
                            <em>{speciality.nombre}</em>
                        </MenuItem>
                        )
                    })}                           
        </Select>
    </FormControl>
)
}