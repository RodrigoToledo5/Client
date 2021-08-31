import es from "date-fns/locale/es";
import {
  Box,
  Typography,
  makeStyles,
  FormControl,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { getInfo } from "../../../Log/actions";
import axios from "axios";
import { API } from "../../../..";

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
}));

export default function SetHorario() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const dias = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];
  const [turno, setTurno] = useState({
    dia: dias[0],
    horaInicio: new Date("December 17, 1995 13:00:00"),
    horaFin: new Date("December 17, 1995 14:00:00"),
  });
  const user = useSelector((store) => store.reducerLog.info);
  const log = useSelector((store) => store.reducerLog.user);
  const [rows, setRows] = useState([]);

  const renderDeleteButton = (params) => {
    return (
      <div style={{ display: "flex", width: "130px", flexDirection: "row" , alignItems:"center", justifyContent:"space-around"}}>
        <div style={{}}>{params.value}</div>
        { params.value.length > 0?
        <button
          style={{
            height: "20px",
            width: "20px",
            color: "brown",
            backgroundColor: "transparent",
            border: "brown solid 1px",
            borderRadius: "30%",
            cursor:"pointer"
          }}
          onClick = {()=>{deleteData({day:params.field,value:params.value})}}
        >
          {" "}
          X{" "}
        </button> : ""}
      </div>
    );
  };

  const columns = [
    {
      field: "lunes",
      headerName: "Lunes",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
    {
      field: "martes",
      headerName: "Martes",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },    {
      field: "miercoles",
      headerName: "Miercoles",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },    {
      field: "jueves",
      headerName: "Jueves",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },    {
      field: "viernes",
      headerName: "Viernes",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },    {
      field: "sabado",
      headerName: "Sabado",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },    {
      field: "domingo",
      headerName: "Domingo",
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
  ];

  useEffect(() => {
    let arr = [];
    let length = 0;
    let forRows = [];
    for (const key in user.horario) {
      if (key !== "id" && key !== "profesionalId") {
        let aux = user.horario[key] ? user.horario[key] : [];
        if (aux.length > length) length = aux.length;
        aux = aux.sort();
        arr.push(aux);
      }
    }
    for (let i = 0; i < length; i++) {
      let obj = {};
      for (let j = 0; j < 7; j++) {
        if (arr[j][i]) {
          obj[dias[j]] = arr[j][i];
        } else {
          obj[dias[j]] = "";
        }
      }
      forRows.push(obj);
    }
    setRows(
      forRows.map((h, i) => {
        return {
          ...h,
          id: i,
        };
      })
    );
  }, [user]);

  const deleteData = (toKill) => {
    let actDay = user.horario[toKill.day];
    actDay = actDay ? actDay : [];
    const index = actDay.findIndex(e => e === toKill.value);
    if (index > -1) actDay.splice(index,1);
    let forSend = {};
    forSend[toKill.day] = [...actDay];
    
    axios({
      method: "POST",
      url: `${API}/horarios`,
      data: {
        profesionalId: user.id,
        days: forSend,
      },
    }).then(() => {
      dispatch(getInfo(log));
    });
  } 

  const sendData = () => {
    let actDay = user.horario[turno.dia];
    actDay = actDay ? actDay : [];
    let forSend = {};
    const cleanStr =
      turno.horaInicio.toTimeString().substring(0, 5) +
      " - " +
      turno.horaFin.toTimeString().substring(0, 5);
    forSend[turno.dia] = [...actDay, cleanStr];
    axios({
      method: "POST",
      url: `${API}/horarios`,
      data: {
        profesionalId: user.id,
        days: forSend,
      },
    }).then(() => {
      dispatch(getInfo(log));
    });
  };

  return (
    <Box className={classes.box}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
        <Typography variant="h3">Set Horarios</Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="standard-select-currency"
            className={classes.label}
            inputProps={{ className: classes.input }}
            select
            label="Dia"
            value={turno.dia}
            onChange={(e) => {
              setTurno({ ...turno, dia: e.target.value });
            }}
          >
            {dias.map((dia, i) => (
              <MenuItem key={i} value={dia}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Horario de inicio"
            value={turno.horaInicio}
            onChange={(time) => {
              setTurno({ ...turno, horaInicio: time });
            }}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker2"
            label="Horario de finalizacion"
            value={turno.horaFin}
            onChange={(time) => {
              setTurno({ ...turno, horaFin: time });
            }}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </FormControl>
        <Button onClick={sendData}> Agregar Horario </Button>
      </MuiPickersUtilsProvider>
      <Typography variant="h6">Horarios</Typography>
      <Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            className={classes.grid}
            rows={rows}
            columns={columns}
            pageSize={20}
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Box>
  );
}
