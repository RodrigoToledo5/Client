import es from "date-fns/locale/es";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getAppointment, getProfessional } from "../../actions";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Container, makeStyles, Typography, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DialogRequestButton from "../../../Templates/DialogRequestButton";
import { API } from "../../../..";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: "5%",
    marginTop: "2%",
  },
  titleh4: {
    textAlign: "center",
  },

  button: {
    margin: theme.spacing(1),
  },
  label: {
    display: "inline-flex",
    padding: "0",
    position: "relative",
    minWidth: "0",
    verticalAlign: "top",
    flexDirection: "row",
    marginBottom: "8px",
    width: "100px",
  },
  title: {
    top: "10px",
  },
  input: {
    width: "100px",
  },
  selectHorario:{
    width: "150px"
  }
}));

export default function NewAppointment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const professionals = useSelector(
    (store) => store.reducerPatient.professionals
  );
  const user = useSelector((store) => store.reducerLog.info);
  const appointment = useSelector((store) => store.reducerPatient.appointment);
  const pacienteId = user.id;
  const [patientName, setPatientName] = useState("");
  const [professionalName, setProfessionalName] = useState("");
  const [email, setEmail] = useState("");
  const [professionalId, setProf] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [horarios, setHorarios] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  const giveMeHorarios = (date) => {
    if (professionalId) {
      setLoading(true);
      setSelectedHorario(null);
      setHorarios(null);
      axios({
        method: "get",
        url: `${API}/horarios`,
        params: {
          day: dias[date.getDay()],
          profesionalId: professionalId,
          date: dateLinda(date),
        },
      }).then(function (response) {
        setHorarios(response.data);
        setLoading(false);
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    giveMeHorarios(date);
  };

  useEffect(()=>{
    setHorarios(null);
    setSelectedHorario(null);
    giveMeHorarios(selectedDate);
  },[appointment]);

  const handleProfessionalChange = (e) => {
    setProf(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  useEffect(() => {
    if (professionals && professionals.profesionals && professionalId) {
      setProfessionalName(
        professionals.profesionals.find(
          (profesional) => profesional.id === professionalId
        ).fullName
      );
      setEmail(
        professionals.profesionals.find(
          (profesional) => profesional.id === professionalId
        ).usuarioEmail
      );
      setPatientName(professionals.fullName);
      giveMeHorarios(selectedDate);
    }
  }, [professionalId]);

  const handleSubmit = () => {
    if (professionalId && selectedDate && note && selectedHorario && !loading) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    dispatch(getProfessional(pacienteId));
  }, [dispatch, pacienteId]);

  const reLoad = () => {
    dispatch(getAppointment(pacienteId, true));
    sendMail(patientName, professionalName, email, selectedDate);
  };
  const createAppointment = (profesionalId, pacienteId, date, note) => {
    return axios({
      method: "POST",
      url: `${API}/cita`,
      data: {
        profesionalId: profesionalId,
        pacienteId: pacienteId,
        date: date,
        note: note,
      },
    }).then((res) => (res.status === 200 ? true : false));
  };

  const sendMail = (patientName, professionalName, email, selectedDate) => {
    return axios({
      method: "POST",
      url: `${API}/sendEmail`,
      data: {
        paciente: true,
        professional: email,
        subject: "Cita agendada por: " + patientName,
        text:
          "Hola " +
          professionalName +
          "," +
          patientName +
          " ha agendado una cita para la fecha " +
          dateLinda(selectedDate) +
          " a las " +
          selectedHorario +
          "hs",
      },
    });
  };
  const dateLinda = (date) => {
    const dateStr = date.toString().substr(0, 21);
    let month = date.getMonth() + 1;
    month = month > 9 ? month.toString() : "0" + month.toString();
    return (
      dateStr.substring(8, 10) + "/" + month + "/" + dateStr.substring(11, 15)
    );
  };

  const agendarButton = () => {
    const dateStr =
      dateLinda(selectedDate) + " a las " + selectedHorario + "hs";
    const props = {
      title: "Agendar",
      buttonOk: "Agendar",
      onClick: () => {},
      disabled: handleSubmit(),
      req: () => {
        return createAppointment(
          professionalId,
          pacienteId,
          dateLinda(selectedDate) + ":" + selectedHorario,
          note
        );
      },
      quest: `Desea agendar ${note} con ${
        professionals.profesionals &&
        professionalId &&
        professionals.profesionals.find((p) => p.id === professionalId).fullName
      } para el ${dateStr}`,
      msgOk: "Cita Creada",
      msgFalse: "Error",
      redirect: reLoad,
    };
    return <DialogRequestButton props={props} />;
  };

  const HorarioSelect = () => {
    if (professionals.profesionals) {
      const prof = professionals.profesionals.find(
        (p) => p.id === professionalId
      );
      if (prof && horarios) {
        //prof.horario[]
        let disponibles = prof.horario[dias[selectedDate.getDay()]];
        if (!disponibles) disponibles = [];
        return disponibles.map((hora, i) => (
          <MenuItem key={i} value={hora} disabled={!(horarios.includes(hora))}>
            {`${hora}${horarios.includes(hora) ? "" : " (YA RESERVADO)"}`}
          </MenuItem>
        ));
      }
    }
    return [];
  };

  const handleHorarioSelect = (e) => {
    setSelectedHorario(e.target.value);
  };

  return (
    <div>
      <Container className={classes.container}>
        <Typography variant="h5" component="h5" className={classes.titleh4}>
          Agendar una cita
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              minDate={new Date()}
              margin="normal"
              id="date-picker-dialog"
              label="Elegir Fecha"
              format="dd/MMMM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <TextField
              margin="normal"
              id="time-picker"
              label="Elegir Horario"
              className={classes.selectHorario}
              select
              value={selectedHorario}
              onChange={handleHorarioSelect}
            >
              {HorarioSelect()}
            </TextField>
            <TextField
              id="standard-basic"
              className={classes.label}
              inputProps={{ className: classes.input }}
              label="Motivo"
              value={note}
              onChange={handleNoteChange}
            />
            <TextField
              id="standard-select-currency"
              className={classes.label}
              inputProps={{ className: classes.input }}
              select
              label="Médico"
              value={professionalId}
              onChange={handleProfessionalChange}
            >
              {professionals.profesionals &&
                professionals.profesionals.map((option) => (
                  <>
                  {option.profesionalPaciente.disable? null :
                  <MenuItem key={option.id} value={option.id}>
                     {option.fullName}
                  </MenuItem>}</>
                ))}
            </TextField>
            {agendarButton()}
          </Grid>
        </MuiPickersUtilsProvider>
      </Container>
    </div>
  );
}
