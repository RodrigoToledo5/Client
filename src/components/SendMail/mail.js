import React, { useState} from 'react'
import { useSelector } from "react-redux";
import { makeStyles,Typography,Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Formik, Field, Form,ErrorMessage } from 'formik';
import { useUser } from 'reactfire';
import { API } from '../..';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    errors:{
        color:"#CC0000",
        fontFamily:"Lato",
    },
    text: {
        color: "#159DE9",
        marginTop: "3px",
        fontFamily:"Lato"
    },
    box: {
        padding: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "row",
        borderRadius: "10px",
        color: "#159DE9",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    label: {
        margin: "10px",
        marginLeft: "15px",
        marginRight: "15px",
        padding: "10xp",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        minWidth: "120px",
        alignItems: "center"
    },
    asides: {
        display: "flex",
        flexDirection: "column",
        justifyContent: " space-evenly",
    },
    textbox: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        minHeight: "200px"
    },
    input: {
        resize: "none",
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "200px",
        padding: "5px"
    },
    btn: {
        maxWidth: "150px",
        position:"relative",
        right:"30%" ,
        "@media (max-width:900px)": {
            right:"0%" ,
        },
    },
    btn_container: {
        display: "flex",
        justifyContent: "flex-end",
        "@media (max-width:900px)": {
            justifyContent: "center",
        },
    },
    checkbox: {
        cursor: "pointer",
        width: "20px",
        height: "20px",
    },
    title: {
        margin: "10px",
        textAlign: "center",
        fontFamily: "Lato",
        fontSize: "30px"
    },
    title: {
        margin: "10px",
        textAlign: "center",
        fontFamily: "Lato",
        fontSize: "30px"
    }

}));

export default function Mail(){
    const [hassend, setHasSend] = useState(false)
    const classes = useStyle();
    const nombre = useSelector(state => state.reducerLog.info.fullName);
    const email=useSelector(state=>state.reducerLog.info.usuarioEmail);
    const destitymail=useSelector(state=>state.reducerLog.actPatient.usuarioEmail);//es el target en realidad no es un paciente
    const rol=useSelector(state=>state.reducerLog.user.tipo_usuario);
    const user=useUser();
    return(
        <Formik
                initialValues={{
                    text: "",
                    subject:`Mensaje de ${nombre}`,
                    emailProfesional: destitymail,
                    emailPaciente: email,
                    isPatient:rol==="paciente"?true:false,
                    isProfessional:rol==="profesional"?true:false,
                }}
                validate={(valores)=>{
                    let errors={};
                    if(!valores.text){
                        errors.text=' Por favor escriba su text'
                    }
                    return errors;
                }}
                onSubmit={
                    async (values, { resetForm }) => {
                        values.text=`Mensaje: ${values.text},/n Enviado desde: ${email}`;
                         const send = await axios({
                                method: 'POST',
                                url: `${API}/contactEmail`,
                                data: values
                            })
                        console.log(values)
                        console.log(send)
                        resetForm();
                        setHasSend(true);
                        setTimeout(() => setHasSend(false), 5000)
                    }
                }
            >
                {({errors}) => (
                    <Form >
                        <Typography className={classes.title}>Mensaje a: {destitymail}</Typography>
                        
                        {/* string starts*/}
                        <div className={classes.box}>
                            <div className={classes.textbox}>
                                <label className={classes.email} htmlFor="mensaje">
                                    Mi correo: {user.data&&user.data.email}
                                </label>
                                <Field
                                    as="textarea"
                                    id="text"
                                    name="text"
                                    placeholder="Escriba su mensaje..."
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="text" component={()=>(
                                        errors.text&& <div className={classes.errors}>{errors.text};</div> 
                                    )}/> 
                            </div>                      
                        </div>
                        {/* string ends*/}
                    <div className={classes.btn_container}>
                        <Button className={classes.btn} type="submit">Enviar</Button>
                    </div>
                    {hassend && <Alert>Mail enviado</Alert>}
                </Form>)}
            </Formik>
    )
}
