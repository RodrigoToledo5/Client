import {
  Box,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import DialogRequestButton from "../../../../Templates/DialogRequestButton";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import { redirect, setCita } from "../../../../Log/actions";
import { API } from "../../../../..";

const useStyle = makeStyles((theme) => ({
  text: {
    color: "#159DE9",
  },
  box: {
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    color: "#159DE9",
  },
  button: {
    color: "brown",
    borderColor: "brown",
  },
}));

export default function Citas({ citas, reLoad }) {
  const classes = useStyle();
  const [redirectFlag, setRdF] = useState(false);
  const user = useSelector((store) => store.reducerLog.info);
  const citaRedirect = useSelector((store) => store.reducerLog.actCita);

  useEffect(()=>{
    if(redirectFlag){dispatch(redirect(11))}else{setRdF(true);}},[citaRedirect]);

  const dispatch = useDispatch();

  const dateLinda = (date) => {
    const dateStr = date.toString().substr(0, 21);
    let month = date.getMonth() + 1;
    month = month > 9 ? month.toString() : "0" + month.toString();
    return (
      dateStr.substring(8, 10) + "/" + month + "/" + dateStr.substring(11, 15)
    );
  };

  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  const [actCitas, setActCitas] = useState(citas);
  const [input, setInput] = useState({ date: new Date() });
  const handleInput = (e) => {
    setInput({
      date:e,
    });
  };

  useEffect(() => {
    // citas date format "01/09/2021:16:00 - 17:00"
    const day = dateLinda(input.date);
    const arr = citas.filter(
      (c) => c.date.substring(0, 2) === day.substring(0, 2)
    );
    setActCitas([...arr]);
  }, [input.date, citas]);
  const [actCita, setActCita] = useState({
    pacienteFullName: "",
    date: "",
    note: "",
  });
  const [rows, setRows] = useState([]);

  const renderCompleteButton = (params) => {
    if(typeof params.id === 'string'){return "-"}
    return (
      <strong>
        <Button
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch(setCita(actCitas.find((c)=>(c.id === params.id))));
          }}
        >
          Completar
        </Button>
      </strong>
    );
  };

  const renderPatientButton = (params) => {
    if(typeof params.id === 'string'){return "-"}
    return (
      <strong>
        <Button
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            console.log(params.row.col6);
          }}
        >
          Ficha
        </Button>
      </strong>
    );
  };



  const renderDeleteButton = (params) => {
    if(typeof params.id === 'string'){return "-"}
    const props = {
      styles: {
        color: "brown",
        borderColor: "brown",
      },
      title: <DeleteIcon />,
      buttonOk: "Eliminar",
      onClick: () => {
        setActCita(actCitas.find((c) => (c.id = params.id)));
      },
      req: sendData,
      quest: `Desea eliminar ${actCita.note} con ${actCita.pacienteFullName} agendada para el ${actCita.date.substring(0,10)} en el horario ${actCita.date.substring(11,24)}`,
      msgOk: "Cita eliminada",
      msgFalse: "Error",
      redirect: reLoad,
    };
    return (
      <strong>
        <DialogRequestButton props={props} />
      </strong>
    );
  };

  const columns = [
    { field: "horario", headerName: "Horario", width: 170 },
    { field: "pacienteName", headerName: "Paciente", width: 170 },
    { field: "note", headerName: "Motivo", width: 170 },
    {
      field: "b1",
      headerName: "Ver paciente",
      width: 150,
      renderCell: renderPatientButton,
      disableClickEventBubbling: true,
    },
    {
      field: "b2",
      headerName: "Completar cita",
      width: 150,
      renderCell: renderCompleteButton,
      disableClickEventBubbling: true,
    },
    {
      field: "b3",
      headerName: "Eliminar",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
  ];

  const sendMail = ( patientName, idPatient, professionalName, date) => {
    return axios({
      method: "POST",
      url: `${API}/sendEmail`,
      data:{
        profesional: true,
        idPatient: idPatient,
        subject: "Cita cancelada por: " + professionalName,
        text: "Hola " + patientName + ", " + professionalName + " ha cancelado la cita para la fecha " + date.substring(0,10) +
        " en el horario " +
        date.substring(11,26)
      }
    })
  }

  const sendData = () => {
    return axios({
      method: "DELETE",
      url: `${API}/cita`,
      data: {
        id: actCita.id,
      },
    }).then((res) => {
      if (res.status === 200) {
      sendMail(actCita.pacienteFullName, actCita.pacienteId, user.fullName, actCita.date )};
      return res.status === 200 ? true : false;
    });
  };
  useEffect(() => {
    let horas = user.horario[dias[input.date.getDay()]];
    if (!horas) horas = [];
    let citasAndHorarios = [...horas, ...actCitas];
    const forFilter = actCitas.map((cita)=>(cita.date.substring(11, 26)));
    citasAndHorarios = citasAndHorarios.filter((obj)=>{
      if(typeof obj === 'string'){
        if(forFilter.includes(obj)) return false
      } return true;
    });
    setRows(
      citasAndHorarios.map((c,i) => {
        if(typeof c === 'string'){
          return {
            id: 'F' + i,
            horario: c + ' (LIBRE)',
            pacienteName: '-',
            note: '-',
          }
        }else{
        const newDate = c.date.substring(11, 26);
        return {
          id: c.id,
          horario: newDate,
          pacienteName: c.pacienteFullName,
          note: c.note,
        };}
      })
    );
  }, [actCitas]);

  // forGrid
  const [sortModel, setSortModel] = useState([
    {
      field: 'horario',
      sort: 'asc',
    },
  ]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Box className={classes.box}>
      <form className={classes.container} noValidate>
      <KeyboardDatePicker
              name="date"
              margin="normal"
              id="date-picker-dialog"
              label="Dia"
              format="MM/dd/yyyy"
              value={input.date}
              onChange={handleInput}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
      </form>
      <Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            className={classes.grid}
            sortModel={sortModel}
            rows={rows}
            columns={columns}
            pageSize={20}
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Box>
    </MuiPickersUtilsProvider>
  );
}
