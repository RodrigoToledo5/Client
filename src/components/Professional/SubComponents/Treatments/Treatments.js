import React, { useState } from "react";
import axios from 'axios';
import clsx from "clsx";
import {
  FormControl,
  InputLabel,
  makeStyles,
  Grid,
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { API } from "../../../..";

const useStyles = makeStyles((theme) => ({
  "& .MuiInputBase-root": {
    color: "#2196f3 !important",
  },
  title: {
    color: "#159DE9",
    fontFamily: "Roboto",
  },
  principal: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  divStyle: {
    paddingTop: "5%",
    backgroundColor: "#E8EEF4",
    width: "100%",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "5%",
    paddingBottom: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  firstGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    width: "100%",
  },
  form: {
    marginRight: "20px",
  },
  labelTextField: {
    color: "#2196f3 !important",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    width: "210px",
    main: "#2196f3 !important",
    "@media (max-width : 500px)": {
      width: "150px",
    },
  },
  gridInputs: {
    display: "flex",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default function Treatments({citumId, load}) {
  const classes = useStyles();
  const [treatment, setTreatment] = useState({
    treatmentName: "",
    description: "",
    price: 0,
    payment_method: "",
    status: "",
    citumId:citumId
  });

  const handleChange = (e) => {
    setTreatment({
      ...treatment,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e)=>{
    e.preventDefault();
    if(treatment.treatmentName && treatment.description && treatment.price && treatment.payment_method && treatment.status){
      addTreatment(treatment)
      setTreatment({
        treatmentName: "",
        description: "",
        price: 0,
        payment_method: "",
        status: ""
        })
    }
   
  }

  

  const addTreatment = (treatment) => {
    return axios({
      method:"POST",
      url: `${API}/treatments`,
      data: treatment
    })
      .then((res)=> {load();})
  }

  return (
    <div>
      <Container className={classes.divStyle}>
        <h2 className={classes.title}>Agregar tratamiento</h2>
        <Grid className={classes.firstGrid}>
          <Grid item md={12} className={classes.gridInputs}>
            <FormControl className={classes.form}>
              <TextField
                label="Nombre del tratamiento"
                id="treatmentName"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                InputProps={{ className: classes.labelTextField }}
                name="treatmentName"
                onChange={(event) => handleChange(event)}
                value={treatment.treatmentName}
                autoComplete="off"
              />
            </FormControl>
            <FormControl className={classes.form}>
              <TextField
                label="Descripción"
                id="description"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                InputProps={{ className: classes.labelTextField }}
                name="description"
                onChange={(event) => handleChange(event)}
                value={treatment.description}
                autoComplete="off"
              />
            </FormControl>
          </Grid>
          <Grid item md={12} className={classes.gridInputs}>
            <FormControl className={classes.form}>
              <TextField
                label="Costo"
                id="price"
                type="tel"
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                InputProps={{ className: classes.labelTextField }}
                name="price"
                onChange={(event) => handleChange(event)}
                value={treatment.price}
                autoComplete="off"
              />
            </FormControl>
            <FormControl
              variant="outlined"
              className={clsx(classes.formControl)}>
              <InputLabel id="demo-simple-select-outlined-label">
                Método de pago
              </InputLabel>
              <Select
                label="Método de pago"
                labelId="payment_method"
                id="payment_method"
                className={classes.selectEmpty}
                inputProps={{ className: classes.labelTextField }}
                name="payment_method"
                onChange={(event) => handleChange(event)}
                value={treatment.payment_method}>
                <MenuItem value="efectivo">Efectivo</MenuItem>
                <MenuItem value="tarjeta de credito">
                  Tarjeta de Débito
                </MenuItem>
                <MenuItem value="tarjeta de debito">
                  Tarjeta de Crédito
                </MenuItem>
                <MenuItem value="parcialidades">Parcialidades</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12} className={classes.gridInputs}>
            <FormControl
              variant="outlined"
              className={clsx(classes.formControl)}>
              <InputLabel id="demo-simple-select-outlined-label">
                Status
              </InputLabel>
              <Select
                label="Status"
                labelId="status"
                id="status"
                className={classes.selectEmpty}
                inputProps={{ className: classes.labelTextField }}
                name="status"
                onChange={(event) => handleChange(event)}
                value={treatment.status}>
                <MenuItem value="completado">Completado</MenuItem>
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="en proceso">En proceso</MenuItem>
              </Select>
            </FormControl>
            <Grid className={classes.button}>
              <Button onClick={onSubmit}>Agregar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
