import { Box, Typography, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEarnings } from "../actions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

export default function Managment() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const earnings = useSelector((state) => state.reducerSearchPatients.earnings);

  const data = [
    { name: "domingo", ingresos: 0, amt: 0 },
    { name: "lunes", ingresos: 0, amt: 0 },
    { name: "martes", ingresos: 0, amt: 0 },
    { name: "miercoles", ingresos: 0, amt: 0 },
    { name: "jueves", ingresos: 0, amt: 0 },
    { name: "viernes", ingresos: 0, amt: 0 },
    { name: "sabado", ingresos: 0, amt: 0 },
  ];

  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];

  // console.log(dateLinda(date));

  //0 domingo 1 lunes......

  useEffect(() => {
    dispatch(getEarnings());
  }, [dispatch]);

  const weeklyEarnings = (name, ingresos) => {
    let index = data.findIndex((data) => data.name === name);
    if (index === -1) {
      data.push({ name, ingresos, amt: ingresos * 2 });
    } else {
      data[index].ingresos = data[index].ingresos + ingresos;
    }
  };

  earnings &&
    earnings.map((elemento) => {
      let date = dias[new Date(elemento.createdAt).getDay()];
      let ingresos = elemento.price;

      return weeklyEarnings(date, ingresos);
    });

  weeklyEarnings("lunes", 2300, 2300);

  return (
    <Box className={classes.box}>
      <Typography variant="h4" color="blue">
        Ingresos Diarios
      </Typography>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ingresos" fill="#2196f3" />
      </BarChart>
    </Box>
  );
}
