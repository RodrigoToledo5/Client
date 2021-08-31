import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { useFirebaseApp} from "reactfire";
import app from "firebase/app";
import "firebase/auth";
import "../../firebase/firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles, Button, Box, TextField } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import { postLogIn } from "./actions";

const useStyle = makeStyles((theme) => ({
  principal: {
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
    // backgroundColor: 'blue',
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: 'aqua'
  },
  form: {
    // backgroundColor: 'red',
    width: "70%",
    "@media (max-width : 900px)": {
      width: "70%",
    },
    "@media (max-width : 320px)": {
      width: "95%",
    },
  },
  container: {
    marginBottom: "60px",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#E8EEF4",
    borderRadius: "10px",
    paddingBottom: "20px",
    "@media (max-width : 900px)": {
      width: "70%",
    },
    "@media (max-width : 500px)": {
      width: "100%",
    },
  },
  items: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  btn: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#1F6186",
    color: "white",
    fontFamily: "Roboto",
  },
  text: {
    color: "#159DE9",
    fontFamily: "Roboto",
  },
  textfield: {
    width: "100%",
  },
  input: {
    color: "#159DE9",
    width: "100%",
  },
  title: {
    color: "#159DE9",
    fontFamily: "Roboto",
  },
  hr: {
    width: "100%",
  },
  relative: {
    position: "absolute",
    backgroundColor: "#E8EEF4",
    top: "-20px",
    right: "47%",
    padding: "10px",
    fontFamily: "Roboto",
  },
  position: {
    position: "relative",
  },
  span: {
    marginRight: "10px",
  },
  error: {
    color: "white",
    width: "100%",
    textAlign: "center",
    fontFamily: "Roboto",
    backgroundColor: "rgb(230, 81, 81)",
    padding: "5px",
    borderRadius: "5px",
  },
  btnfacebook: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#1F6186",
    color: "white",
    fontFamily: "Roboto",
  },
  btngoogle: {
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#D93025",
    color: "white",
    fontFamily: "Roboto",
  },

  alert: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Login = (props) => {
  const classes = useStyle();
  const firebase = useFirebaseApp();
  const dispatch = useDispatch();
  // form status
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //const postSingIn = useSelector((state) => state.reducerSign.postSingIn);
  const login = useSelector((state) => state.reducerLog.user);

  //login Handler
useEffect(() => {
    if (login.tipo_usuario === "profesional") {
        //si es profesional lo redirije a la dashboard de profesional
        props.history.push("/profesional-dashboard");
      }
    if (login.tipo_usuario === "paciente") {
        // sino lo redirije a la dashboard de paciente
        props.history.push("/patient-dashboard");
    }
    if (login==='user not found'){
      
      props.history.push("/sign-ing");
    }
  }, [login,props.history]);

  // const alertFunction = () => {
  //   switch (postSingIn) {
  //     case "Registro exitoso":
  //       return (
  //         <Box width="100%" justifyContent="center">
  //           <Alert className={classes.alert} severity="success">
  //             {postSingIn}
  //           </Alert>
  //         </Box>
  //       );
  //     default:
  //       return <Box width="100%" height="50px" justifyContent="center"></Box>;
  //   }
  // };

  //users errors
  const [error, setError] = useState(null);
  //styles

  //handle Input
  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  //logIn
  const logIn = useCallback(async () => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(input.email, input.password);

      //hariamos un llamado al back  con toda la informacion del usuario
      
      
      dispatch(postLogIn(res.user.email)); //pedimos a la base de datos que nos de los datos del usuario
      setInput({
        email: "",
        password: "",
      });
      setError(null);
    } catch (error) {
      console.log("el error es", error);
      if (error.code === "auth/invalid-email") {
        setError("Correo Electronico no válido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Correo Electronico o contraseña incorrecta");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [input.email, input.password,dispatch,firebase]);

  const logInGoogle = async () => {
    const provider = new app.auth.GoogleAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);
    if(!res.user.emailVerified){
      await firebase.auth().currentUser.sendEmailVerification();
    }
    dispatch(postLogIn(res.user.email));
  };
  // log In with Google acount
  const handleLogInGoogle = () => {
    logInGoogle();
  };
  const handleLogInFacebook = () => {
    logInFacebook();
  };
  // log In with Facebook acount
  const logInFacebook = async () => {
    const provider = new app.auth.FacebookAuthProvider();
    const res = await app.auth().signInWithPopup(provider);
    dispatch(postLogIn(res.user.email));   
  };
  //handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    logIn();
  };

  return (
    <Box className={classes.principal}>
      <Box className={classes.container}>
        <form className={classes.form} onSubmit={(event)=>handleSubmit(event)}>
          <Box className={classes.box}>
            <Box className={classes.items}>
              <h2 className={classes.title}>Inicia Sesión</h2>
            </Box>
            {error && (
              <Box className={classes.items}>
                <p className={classes.error}>{error}</p>
              </Box>
            )}
            <Box className={classes.items}>
              <TextField
                className={classes.textfield}
                type="email"
                label="correo electronico"
                variant="outlined"
                color="secondary"
                name="email"
                InputProps={{
                  className: classes.input,
                }}
                value={input.email}
                onChange={(event)=>handleInput(event)}
              />
            </Box>
            <Box mt={2} className={classes.items}>
              <TextField
                className={classes.textfield}
                type="password"
                label="contraseña"
                variant="outlined"
                color="secondary"
                name="password"
                InputProps={{
                  className: classes.input,
                }}
                onChange={(event)=>handleInput(event)}
                value={input.password}
              />
            </Box>
            <Box className={classes.items}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                Iniciar sesión
              </Button>
            </Box>
            <Box pt={1} fontFamily="Roboto" className={classes.items}>
              <span className={classes.span}>o</span>
              <Link to="/reset-password">¿Has olvidado la contraseña?</Link>
            </Box>
            <Box className={classes.hr} pt={2}>
              <Box className={classes.position}>
                <hr />
                <Box className={classes.relative}>o</Box>
              </Box>
            </Box>
          </Box>
        </form>
        <Box className={classes.form}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<GTranslateIcon />}
            className={classes.btngoogle}
            onClick={(event)=>handleLogInGoogle(event)}
          >
            Continuar con Google
          </Button>
        </Box>
         <Box className={classes.form}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            startIcon={<FacebookIcon />}
            className={classes.btnfacebook}
            onClick={(event)=>handleLogInFacebook(event)}
          >
            Login with Facebook
          </Button>
        </Box> 
        <Box pt={1} fontFamily="Roboto" className={classes.items}>
          <span className={classes.span}>¿No tienes cuenta?</span>
          <Link to="/sign-in">Registrate</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Login);