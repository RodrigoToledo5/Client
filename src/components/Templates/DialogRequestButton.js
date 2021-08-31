/* DialogRequestButton es un componente con el siguiente ciclo de vida:
    Click => se abre Dialogo con pregunta => si es verdadera se hace 
    un request => muestra la respuesta y ejecuta un callback
    enjoy.
*/
import {
  Box,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";

export default function DialogRequestButton({ props }) {
  /* *************** PROPS OBJECT ********************* /
     const props = {
                    styles: {}
                    title: puede ser cualquier cosa que renderice
                    buttonOk: ""
                    onClick: ()=>{}
                    req: ()=>{} 
                    quest: ""
                    msgOk: ""
                    msgFalse: ""
                    redirect: ()=>{}
                    disable: true
    }
    // styles => styles for button can be null
    // title => contenido del boton
    // buttonOk => Nombre del boton para hacer el request, si se deja null es aceptar
    // onClick => Callback a ejecutar cuando se presional el button puede ser null
    // req => CallBack request promesa que devuelve TRUE or FALSE
    // quest => String de pregunta
    // msgOk => String para promesa TRUE
    // msgFalse => String para promesa FALSE 
    // redirect => CallBack a ejecutar cuando finaliza el ciclo vital
    // disable +> disable button, can be null
    */

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
    button: props.styles,
  }));

  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");

  const sendData = () => {
    setOpen(false);
    props.req().then((res) => {
      setFinalMsg(res ? props.msgOk : props.msgFalse);
    });
  };

  return (
    <Box className={classes.box}>
      <Button
        className={classes.button}
        variant="outlined"
        disabled={props.disabled}
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          props.onClick();
          setOpen(true);
        }}
      >
        {props.title}
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "white",
            color: "#159DE9",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{props.quest}</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={sendData} color="primary" autoFocus>
            {props.buttonOk ? props.buttonOk : "Aceptar"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={finalMsg.length > 0}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "white",
            color: "#159DE9",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{`${finalMsg}`}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              props.redirect();
              setFinalMsg("");
            }}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
