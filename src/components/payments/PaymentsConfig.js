import { Box, makeStyles } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
  magin: {
    margin: theme.spacing(2),
  },
  menuButton: {
    margin: theme.spacing(1),

  },
  fledDirection: {
    flexDirection: 'row-reverse',
  },
  bar: {
    background: "white",
    borderRadius: "5px"
  },
  text: {
    color: "#159DE9",
    marginRight: theme.spacing(100),
    marginLeft: theme.spacing(5)
  },
  box_container: {
    marginTop: theme.spacing(10),
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    '@media (min-width:600px)': {
      marginTop: theme.spacing(10),
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  box: {
    width: "300px",
    '@media (min-width:600px)': {
      width: "600px",
      margin: "10px"
    }
  },

}))


function PaymentsConfig() {
  var history = useHistory()
  const classes = useStyle();
  async function captureToken() {
    if (window.location.pathname === "/payments") {
      const token = window.location.href.substring(window.location.href.indexOf("code="), window.location.href.indexOf("&state=client"));
      console.log(token)
      
      const send = await axios({
        method: 'POST',
        url: `${API}/profesionaltoken`,
        data: {code:token}
      })
      console.log(send)
      console.log("paso")
    }
    //   const send = await axios({
    //     method: 'POST',
    //     url: `${API}/profesionaltoken`,
    //     data: values
    // })
  }
  //console.log(window.location.href)
  useEffect(() => {
    captureToken();

  }, [])
  return (
    <Box className={classes.box_container}>
      <Box className={classes.box} marginBottom="10px">
        <Alert severity="success"> Se configuro su sistema de pagos</Alert>
      </Box>
    </Box>
  );
}

export default PaymentsConfig;