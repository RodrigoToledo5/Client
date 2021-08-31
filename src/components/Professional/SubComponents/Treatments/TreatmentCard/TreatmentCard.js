import {
  Typography,
  makeStyles,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({
  card: {
    backgroundColor: "#E8EEF4 !important",
    color: "#2196f3 !important",
    fontFamily: "Roboto",
    textAlign: "center",
    paddingBottom: "20px",
    width:"80%",
    margin:"30px",
  },
  desc: {
    color: "#159DE9",
    marginTop: "4vh",
  },
  status: {
    color: "#159DE9",
    marginTop: "4vh",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    color: "#159DE9",
  },
  textField: {
    margin: "10px",
  },
}));

export default function TreatmentCard({ tratamiento }) {
  const classes = useStyle();
  const cita = useSelector((store) => store.reducerLog.actCita);
  return (
    <Card className={classes.card}>
      <h2 className={classes.title}>{tratamiento.treatmentName}</h2>
      <Typography variant="body1" className={classes.desc}>{tratamiento.description}</Typography>
      <Typography variant="body1" className={classes.status}>Status: {tratamiento.status}</Typography>
      <Typography variant="body1" className={classes.status}>${tratamiento.price}</Typography>
    </Card>
  );
}
