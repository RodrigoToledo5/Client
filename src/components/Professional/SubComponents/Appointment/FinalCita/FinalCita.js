import {
  Box,
  Typography,
  makeStyles,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCita } from "../../../../Log/actions";
import Treatments from "../../Treatments/Treatments";
import TreatmentCard from "../../Treatments/TreatmentCard/TreatmentCard";
import { API } from "../../../../..";

const useStyle = makeStyles((theme) => ({
  text: {
    color: "#159DE9",
    marginLeft: "8vh",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    borderRadius: "10px",
    color: "#159DE9",
  },
  textField: {
    margin: "10px",
    width: "100%",
  },
  title:{
    margin: "10px",
  }
}));

export default function FinalDate() {
  const classes = useStyle();
  const cita = useSelector((store) => store.reducerLog.actCita);
  const [status, setStatus] = useState(cita.status);
  const dispatch = useDispatch();

  const handleSubmit = () => {
      axios({
        method: "PUT",
        url: `${API}/cita`,
        data: { id: cita.id, status: status },
      }).then((res) => {
        dispatch(setCita(res.data));
      });
    };


  const arrDisableTextField = [
    { textName: "Dia", prop: cita.date.substring(0, 10) },
    { textName: "Paciente", prop: cita.pacienteFullName },
    { textName: "Horario", prop: cita.date.substring(11, 24) },
    { textName: "Motivo", prop: cita.note },
  ];

  const DisableTextField = (textName, prop, i) => (
    <TextField
      key={i}
      label={textName}
      className={classes.textField}
      variant="outlined"
      InputProps={{ className: classes.labelTextField }}
      name="name"
      value={prop}
      autoComplete="off"
      disabled={true}
    />
  );

  const ifStatus = () => {
    if(!cita.status) return(
      <Box style={{display:"flex", flexDirection:"column"}}>
      <Treatments citumId={cita.id} load={handleSubmit}/>
      <Button onClick={handleSubmit}>COMPLETAR</Button>
      </Box>
    )
  }

  return (
    <Box className={classes.box}>
    <Typography variant="h3" className={classes.title}>Detalle Cita</Typography>
      {arrDisableTextField.map((obj, i) =>
        DisableTextField(obj.textName, obj.prop, i)
      )}
      <TextField
        label="Estado"
        className={classes.textField}
        variant="outlined"
        InputProps={{ className: classes.labelTextField }}
        name="name"
        select
        value={status}
        autoComplete="off"
        disabled={cita.status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      >
        <MenuItem value={"AUSENTE"}>AUSENTE</MenuItem>
        <MenuItem value={"ASISTIO"}>ASISTIO</MenuItem>
        <MenuItem value={"CANCELADA"}>CANCELADA</MenuItem>
      </TextField>
      <Typography variant="h5" className={classes.title}>Tratamientos realizados</Typography>
      {cita.tratamientos.map((t,i)=>(<TreatmentCard tratamiento={t} key={i}/>))}
      {ifStatus()}
    </Box>
  );
}
