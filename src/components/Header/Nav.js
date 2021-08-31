import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ButtonLogin from "./Buttons/ButtonLogin";
import ButtonSignIn from "./Buttons/ButtonSignIn";
import ButtonHome from "./Buttons/ButtonHome";
import { useUser } from "reactfire";
import ButtonDashboard from "./Buttons/ButtonDashboard";
import { postLogIn } from "../Log/actions";
import ButtonProfile from "./Buttons/ButtonProfile";
import ButtonProfileActive from "./Buttons/ButtonProfileActive";
import logo from './CONSULTANCESPACETIPO.png'
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  magin: {
    margin: theme.spacing(2),
  },
  menuButton: {
    margin: theme.spacing(1),
    minWidth: "84px",
  },
  bar: {
    background: "white",
    borderRadius: "5px",
  },
  toolbar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    "@media (max-width:600px)": {
      flexDirection: "column-reverse",
    },
  },
  text: {
    color: "#159DE9",
  },
  nav: {
    display: "flex",
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
  img:{
    width:"200px",
    '@media (max-width : 500px)':{
      marginTop: "20px",
  }
    
},
}));

export default function Nav() {
  const classes = useStyle();
  const user = useUser();
  const dispatch = useDispatch();
  const [profile,setProfile]=useState(false)

  const [logFlag, setLogFlag] = useState(false);

  const userS = useSelector((store) => store.reducerLog.user);
  const proFlag = useSelector((store) => store.reducerSign.flagLog);

  //handelea los cambios en el navbar al logearse o deslogearse
  function checkLogin() {
    if (!user.data) return true;
    else return false;
  }
  function checkPath(){
    if(window.location.pathname==="/"){
      return false
    }
    else return true
  }

  function handleProfile(){
    if(user.data.emailVerified){
      setProfile(!profile)
    }
    
  }
  //handelea el AUTOLOGIN por cookies (no toquen los estados porque se rompe todo)
  useEffect(() => {
    if (!userS.email && user.data && user.data.email && !proFlag) {
      if (!logFlag) {
        dispatch(postLogIn(user.data.email));
      }
    } else {
      setLogFlag(false);
    }
  }, [userS.email, user.data]);

  return (
    <nav className={classes.nav}>
      <AppBar className={classes.bar}>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.box}>
            {checkPath()&&<ButtonHome />}
            {checkLogin() ? (
              <>
                <ButtonLogin />
                <ButtonSignIn />
              </>
            ) : (
              <>
                <ButtonDashboard />
                {profile?
                  <ButtonProfileActive
                  onClick={(event)=>handleProfile(event)}
                  setLogFlag={setLogFlag}
                  setProfile={setProfile}
                  >Activo</ButtonProfileActive>
                :<ButtonProfile 
                onClick={(event)=>handleProfile(event)}
                >Desactivado</ButtonProfile>}
              </>
            )}
          </Box>
          <Link to="/"><img className={classes.img} src={logo} alt="logo consultance"/></Link>
          {/* <Typography className={classes.text} variant="h6">
            Consultance Space
          </Typography> */}
        </Toolbar>
      </AppBar>
    </nav>
  );
}
