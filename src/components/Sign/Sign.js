import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "firebase/auth";
import "../../firebase/firebase";
import { useFirebaseApp } from "reactfire";
import { postSignIn, getCountries, setFlagLog } from "./actions";
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
  CircularProgress,
  Slider,
  Box,
  Typography,
  Snackbar
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { blue } from "@material-ui/core/colors";
import validate from "./functions/validate";

const useStyles = makeStyles((theme) => ({
  "& .MuiInputBase-root": {
    color: "#2196f3 !important",
  },
  title: {
    color: "#159DE9",
    fontFamily: "Roboto",
  },
  principal: {
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
  },
  divStyle: {
    paddingTop: "5%",
    backgroundColor: "#E8EEF4",
    width: "60%",
    borderRadius: "10px",
    marginTop: "85px",
    marginBottom: "5%",
    paddingBottom: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width : 500px)": {
      width: "100%",
    },
  },
  firstGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width : 500px)": {
      marginLeft: "8%",
    },
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    width: "100%",
    main: blue[500],
  },
  form: {
    marginRight: "20px",
  },
  formAdress: {
    marginLeft: "10px",
    "@media (max-width : 500px)": {
      marginLeft: "0",
    },
  },
  labelTextField: {
    color: "#2196f3 !important",
  },
  redTextField: {
    color: "#f44336 !important",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    width: "230px",
    main: "#2196f3 !important",
  },
  alert: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  slider: {
    color: "#2196f3",
    width: "90%",
  },
  boxSlider: {
    width: "60%",
    marginLeft: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "200px",
    "@media (max-width : 500px)": {
      width: "100%",
      marginLeft: "0",
    },
  },
  boxSliderText: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width : 500px)": {
      width: "50%",
    },
  },
  fontNormal: {
    fontSize: "20px",
    color:"black",
    "@media (max-width : 500px)": {
      fontSize: "15px",
    },
  },
  fontSelect: {
    fontSize: "20px",
    color: "#2196f3",
    "@media (max-width : 500px)": {
      fontSize: "15px",
    },
  },
}));

export default function Sign() {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const firebase = useFirebaseApp();
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState("");
  const [pass, setPass] = useState("");
  const [open, setOpen] = useState(false);
  const [passconfirmation, setPassConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [patient, setPatient] = useState({
    dni: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    birth: "",
    address: "",
    country: "",
    type: null,
  });

  const marks = [
    {
      value: 0,
      label: "",
    },
    {
      value: 50,
      label: "",
    },
    {
      value: 100,
      label: "",
    },
  ];

  const countries = useSelector((state) => state.reducerSign.countries);

  const onHandleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value); //no carga el estado en email si no esta definida
    }
    if (e.target.name === "password") {
      setPass(e.target.value); //no carga el estado en passowrd si no esta definida
    }
    if (e.target.name === "passwordconfirmation") {
      setPassConfirmation(e.target.value);
    }
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...patient,
        pass,
        passconfirmation,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (
      patient.name &&
      patient.dni &&
      patient.lastName &&
      patient.email &&
      patient.phone &&
      patient.birth &&
      patient.address &&
      patient.country &&
      patient.type &&
      Object.keys(errors).length === 0
    ) {
      var emailExist = "";
      setLoad("cargando");
      dispatch(setFlagLog(true));
      await firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch((err)=>{
        emailExist = err.message
      });

      if(emailExist){
        setOpen(true);
      }else{
        await firebase.auth().currentUser.sendEmailVerification();
        //await firebase.auth().signOut();
        dispatch(postSignIn(patient));

        setPatient({
          dni: "",
          name: "",
          lastName: "",
          email: "",
          phone: "",
          birth: "",
          address: "",
          country: "",
        });
        setLoad("cargando");
        setEmail("");
        setPass("");
        setPassConfirmation("");
        history.push("/login");
      }
    } else {
      setLoad("");
    }
  };
  const alertFunction = () => {
    if (
      patient.name &&
      patient.dni &&
      patient.lastName &&
      patient.email &&
      patient.phone &&
      patient.birth &&
      patient.address &&
      patient.country &&
      patient.type
    ) {
      return (
        <Box width="100%" justifyContent="center">
          <Alert className={classes.alert} severity="success">
            Campos completos
          </Alert>
        </Box>
      );
    } else if (load === "") {
      return (
        <Box width="100%" height="50px" justifyContent="center">
          <Alert className={classes.alert} severity="info">
            Complete todos los campos
          </Alert>
        </Box>
      );
    } else {
      return (
        <Box width="100%" height="50px" justifyContent="center">
          <Alert className={classes.alert} severity="success">
            Registro exitoso
          </Alert>
        </Box>
      );
    }
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const sliderErrorHandler = () => {
      switch(patient.type){
          case "profesional":
              return (<Typography className={classes.labelTextField}>Usted es Profesional</Typography>)
          case "paciente":
              return (<Typography className={classes.labelTextField}>Usted es Paciente</Typography>)    
          default:
              return (<Typography className={classes.redTextField}>Seleccione si usted es profesional o paciente</Typography>)
      }
  }

  const snackbarNotify = () => {
    return (
      <div>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            El email ya existe
          </Alert>
        </Snackbar>
      </div>
    )
  }

  return (
    <>
      <Box>
        <Container className={classes.divStyle}>
          <h2 className={classes.title}>Registrate</h2>
          {alertFunction()}
          {snackbarNotify()}
          <form onSubmit={onHandleSubmit}>
            <Box className={clsx(classes.margin, classes.boxSlider)}>
              <Box className={classes.boxSliderText}>
                <Typography
                  className={
                    patient.type === "profesional"
                      ? classes.fontSelect
                      : classes.fontNormal
                  }
                >
                  Profesional
                </Typography>
                <Typography
                  className={
                    patient.type === "paciente"
                      ? classes.fontSelect
                      : classes.fontNormal
                  }
                >
                  Paciente
                </Typography>
              </Box>
              <Slider
                className={clsx(classes.margin, classes.slider)}
                defaultValue={50}
                aria-labelledby="discrete-slider-small-steps"
                step={50}
                marks={marks}
                selectionColor="green"
                onChange={(e, v) => {
                  switch (v) {
                    case 0:
                      setPatient({ ...patient, type: "profesional" });
                      break;
                    case 100:
                      setPatient({ ...patient, type: "paciente" });
                      break;
                    default:
                      setPatient({ ...patient, type: null });
                      break;
                  }
                }}
              />
              {sliderErrorHandler()}
            </Box>
            <Grid className={classes.firstGrid}>
              <Grid item md={12}>
                <FormControl className={classes.form}>
                  <TextField
                    label="No. de Identificación"
                    id="dni"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="dni"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.dni}
                    error={errors.dni && errors.dni.length > 0}
                    helperText={errors.dni}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <TextField
                    label="Nombre"
                    id="name"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="name"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.name}
                    error={errors.name && errors.name.length > 0}
                    helperText={errors.name}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl className={classes.form}>
                  <TextField
                    label="Apellido"
                    id="lastName"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="lastName"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.lastName}
                    error={errors.lastName && errors.lastName.length > 0}
                    helperText={errors.lastName}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <TextField
                    label="Email"
                    id="email"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="email"
                    type="email"
                    onChange={(event) => onHandleChange(event)}
                    value={email}
                    error={errors.email && errors.email.length > 0}
                    helperText={errors.email}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl className={classes.form}>
                  <TextField
                    label="Clave"
                    id="password"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="password"
                    type="password"
                    onChange={(event) => onHandleChange(event)}
                    value={pass}
                    error={errors.pass && errors.pass.length > 0}
                    helperText={errors.pass}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <TextField
                    label="Confirmar clave"
                    id="passwordconfirmation"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="passwordconfirmation"
                    type="password"
                    onChange={(event) => onHandleChange(event)}
                    value={passconfirmation}
                    error={errors.pass && errors.pass.length > 0}
                    helperText={
                      errors.pass !== "Debe ser mayor a 6 caracteres"
                        ? errors.pass
                        : null
                    }
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl className={classes.form}>
                  <TextField
                    label="Telefono"
                    id="phone"
                    type="tel"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="phone"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.phone}
                    error={errors.phone && errors.phone.length > 0}
                    helperText={errors.phone}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <TextField
                    // helperText="Fecha de nacimiento"
                    id="birth"
                    type="date"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField, inputProps: { min: "1900-01-01", max: new Date().toISOString().split("T")[0]} }}
                    name="birth"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.birth}
                    error={errors.birth && errors.birth.length > 0}
                    helperText={errors.birth}
                  />
                </FormControl>
              </Grid>
              <Grid item md={12}>
                <FormControl className={clsx(classes.form, classes.formAdress)}>
                  <TextField
                    label="Dirección"
                    id="address"
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    InputProps={{ className: classes.labelTextField }}
                    name="address"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.address}
                    error={errors.address && errors.address.length > 0}
                    helperText={errors.address}
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  className={clsx(classes.formControl)}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Selecciona tu pais
                  </InputLabel>
                  <Select
                    label="Selecciona tu pais"
                    labelId="countries"
                    id="country"
                    className={classes.selectEmpty}
                    inputProps={{ className: classes.labelTextField }}
                    name="country"
                    onChange={(event) => onHandleChange(event)}
                    value={patient.country}
                    error={errors.country && errors.country.length > 0}
                    helperText={errors.country}
                  >
                    {countries &&
                      countries.map((country, i) => {
                        return (
                          <MenuItem key={i} value={country.name}>
                            <em>{country.name}</em>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={12}>
                {load === "cargando" ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation={true}
                  >
                    <CircularProgress size={20} />
                  </Button>
                ) : (
                  <Button type="submit" variant="contained" color="secondary">
                    Registrar
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
}
