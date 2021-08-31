// CallToAction export default, height can be passed by params, text
// is not responsive

import { Button, Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import {useHistory } from "react-router-dom";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import { blue } from '@material-ui/core/colors';


export default function CallToAction({ height }) {
  const itemHeight = height ? height : "400px";

  const useStyle = makeStyles(theme=>( {
    paperContainer: {
      height: itemHeight,
      padding: "5% 5%",
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
    },
    grid: {
      height: "100%",
      justifyContent: "flex-end",
      alignContent: "flex-end",
    },
    button: {
      width: "200px",
      backgroundColor:"#ffffff",
      color:blue[500],
      '&:hover':{
        color:blue[500]
      }
    },
    text:{
      fontSize:'1.3rem',
      color:"white",
      fontFamily:"Lato",
      fontWeight: "300",
      textAlign: "justify",
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
      // [theme.breakpoints.up('md')]: {
      //   fontSize: '2.4rem',
      // },
    },
    container:{
      flexDirection:"row",
    },
    title: {
      color:'white',
      marginBottom:"50px",
      fontFamily:"Lato",
      fontWeight: "600"
    }
  }));

  let history = useHistory();

  function handleClick(navlink) {
    history.push(navlink);
  }
  const classes=useStyle();
  return (
    <>
      <Paper elevation={3} className={classes.paperContainer}>
        <Typography variant="h4" className={classes.title}>Somos Consultance Space!</Typography>
        <Typography variant="body1" className={classes.text}>
            Una plataforma de reserva y gestión de turnos, pagos y stock que te
            va a sorprender. 
            Facilitamos tu gestión, de tiempos, documentos, y pagos.
            Pensada tanto para los profesionales de la salud como para los mismos pacientes.
{" "}
        </Typography>
        <Grid container className={classes.grid}>
          <Button
            color="default"
            className={classes.button}
            startIcon={<CalendarIcon />}
            onClick={() => {
              handleClick("/sign-in");
            }}
          >
            AGENDA UNA CITA
          </Button>
        </Grid>
      </Paper>
    </>
  );
}
