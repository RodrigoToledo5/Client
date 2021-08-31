import { Typography, makeStyles, Button } from "@material-ui/core";
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AntecedentesPatogolicos from "./AntecedentesPatologicos";
import AntecedentesNoPatogolicos from "./AntecedentesNoPatologicos";
import ShowAntecedentesNoPatogolicos from "./ShowAntecedentesNoPatologicos";
import ShowAntecedentesPatogolicos from "./ShowAntecedentesPatologicos";
import { searchHistory } from "./actions";



const useStyle = makeStyles((theme) => ({
    constainer:{
        fontFamily:"Lato"
    },
    title: {
        margin: "10px",
        textAlign: "center",
        fontFamily: "Lato",
        fontSize: "20px"
    },
    btn_container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        flexWrap:"Wrap"
    },
    btn:{
        margin:"10px",
        width: "200px",
    },
    head:{
        display:"flex",
        flexDirection:"column",
        borderBottom:"1px solid black",
        borderTop:"1px solid black",
        margin:"10px",
    },
    data:{
        display:"flex",
        margin:"3px",
    },
    alert:{
        margin:"10px",
        display:"flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
    }
}));

var ref = React.createRef();

export default function HistoriaClinica() {
    const patient = useSelector((store) => store.reducerLog.actPatient);
    const classes = useStyle();
    const [actualizar, setActualizar] = useState("no");
    const [seccion, setSeccion] = useState("");
    const historia = useSelector(state => state.reducerHistory.history)
    const dispatch = useDispatch();


    /// usamos renderer prop
    function formatName(string) {
        if (string) {
            return string[0] + string.substring(1, string.length).toLowerCase()

        }

    }
    function handleClick(event) {
        //console.log(patient.id)
        setSeccion(event.target.outerText)
    }
    useEffect(() => {
        if(actualizar==="True")dispatch(searchHistory(patient.id))
        else dispatch(searchHistory(patient.id))
    }, [dispatch, patient.id,actualizar])
    
    return (
        <div className={classes.container}>
            <div >
                <Typography className={classes.title}>Historia Clinica:{" "}
                    {
                        formatName(patient.nombre) + ' ' + formatName(patient.apellidos)
                    }
                </Typography>
                <div className={classes.btn_container}> 
                {<Button className={classes.btn} onClick={(event) => handleClick(event)} >
                    CARGAR ANTECEDENTES PATOLOGICOS
                </Button>}

                { <Button className={classes.btn} onClick={handleClick} >
                    CARGAR ANTECEDENTES NO PATOLOGICOS
                </Button>}

                {historia.antecedentesPatologico && <Button className={classes.btn} onClick={handleClick} >
                    Ver Antecedentes Patologicos
                </Button>}

                {historia.antecedentesNoPatologico && <Button className={classes.btn} onClick={handleClick} >
                    Ver Antecedentes No Patologicos
                </Button>}
                </div>
            </div>
            <div className={classes.head}>
                <div className={classes.data}>
                    <Typography>País:</Typography>
                    <Typography>{historia&&historia.pais}</Typography>
                </div>
                <div className={classes.data}>
                    <Typography>Dirección:</Typography>
                    <Typography>{historia&&historia.direccion}</Typography>
                </div>
                <div className={classes.data}>
                    <Typography>Fecha de nacimiento:</Typography>
                    <Typography>{historia.fecha_de_nacimiento&&historia.fecha_de_nacimiento.substring(0,historia.fecha_de_nacimiento.length-14)}</Typography>
                </div>
                
                <div className={classes.data}>
                    <Typography>Género:</Typography>
                    <Typography>{historia&&historia.genero?historia.genero:" Sin Completar"}</Typography>
                   
                </div>
                <div className={classes.data}>
                    <Typography>Estado civil:</Typography>
                    <Typography>{historia&&historia.estado_civil?historia.estado_civil:" Sin Completar"}</Typography>
                </div>
                
            </div>
            <div className={classes.alert}>
                {!historia.genero&&<Alert severity="warning">Por favor pida a su paciente que complete su género</Alert>}
                {!historia.genero&&<Alert severity="warning">Por favor pida a su paciente que complete su estado civil</Alert>}
                {!historia.antecedentesPatologico&&<Alert severity="warning"> Faltan cargar los antecedentes patologicos</Alert>}
                {!historia.antecedentesNoPatologico&&<Alert severity="warning"> Faltan cargar los antecedentes no patologicos</Alert>}
            </div>
            {     
            seccion === "CARGAR ANTECEDENTES PATOLOGICOS" &&
                <AntecedentesPatogolicos 
                    idPaciente={patient.id}
                    setActualizar={(event)=>setActualizar(event)}
                    
                />}

            {seccion === "CARGAR ANTECEDENTES NO PATOLOGICOS"&&
                <AntecedentesNoPatogolicos
                    idPaciente={patient.id} 
                    setActualizar={(event)=>setActualizar(event)}
                />
            }
            {seccion === "VER ANTECEDENTES PATOLOGICOS"&&
                <ShowAntecedentesPatogolicos 
                    
                />
            }
            {seccion === "VER ANTECEDENTES NO PATOLOGICOS" &&
                <ShowAntecedentesNoPatogolicos 
                    
                />
            }

        </div>
    )
}
