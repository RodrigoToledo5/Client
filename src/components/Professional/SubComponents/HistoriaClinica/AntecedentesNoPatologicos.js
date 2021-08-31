import { Box, Typography, makeStyles, InputLabel, Button } from "@material-ui/core";
import { Formik, Field, Form,ErrorMessage } from 'formik'
import Alert from '@material-ui/lab/Alert';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../../../..";



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
        justifyContent: "flex-start",
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
        minHeight: "100px"
    },
    input: {
        resize: "none",
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "80px",
        padding: "5px"
    },
    btn: {
        maxWidth: "150px",
        marginLeft: "100px",
        marginRight: "100px"
    },
    btn_container: {
        display: "flex",
        justifyContent: "flex-end"
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
        fontSize: "20px"
    }

}));


export default function AntecedentesNoPatogolicos({idPaciente:idPaciente,setActualizar}) {
    const [hassend, setHasSend] = useState(false)
    const classes = useStyle();
    const historia = useSelector(state => state.reducerHistory.history)
    /// usamos renderer prop
    useEffect(() => {
        setActualizar("Actualizo patologicos")
    },[setActualizar])
    return (
        <>
            <Formik
                initialValues={{
                    alcoholismo: null,
                    tabaquismo: null,
                    tatuajes: null,
                    alimentacion: "",
                    higiene_corporal: "",
                    higiene_bucal: "",
                    vacunas: "",
                    toxicomanias: "",
                    comentarios: "",
                    antecedentesNoPatologicos: true,
                    idPaciente: idPaciente,
                }}
                validate={(valores)=>{
                    let errors={};
                    if(!valores.alimentacion.includes(' ')&&valores.alimentacion.length>30){
                        errors.alimentacion=' Por favor no ingrese palabras muy grandes'
                    }
                    if(!valores.higiene_corporal.includes(' ')&&valores.higiene_corporal.length>30){
                        errors.higiene_corporal=' Por favor no ingrese palabras muy grandes'
                    }
                    if(!valores.higiene_bucal.includes(' ')&&valores.higiene_bucal.length>30){
                        errors.higiene_bucal=' Por favor no ingrese palabras muy grandes'
                    }
                    if(!valores.vacunas.includes(' ')&&valores.vacunas.length>30){
                        errors.vacunas=' Por favor no ingrese palabras muy grandes'
                    }
                    if(!valores.toxicomanias.includes(' ')&&valores.toxicomanias.length>30){
                        errors.toxicomanias=' Por favor no ingrese palabras muy grandes'
                    }
                    if(!valores.comentarios.includes(' ')&&valores.comentarios.length>30){
                        errors.comentarios=' Por favor no ingrese palabras muy grandes'
                    }
                    return errors;
                }}
                onSubmit={
                    async (values, { resetForm }) => {
                        if(!historia.antecedentesNoPatologico){
                            const send = await axios({
                                method: 'POST',
                                url: `${API}/medicalRecord`,
                                data: values
                            })
                        }
                        else{
                            const send = await axios({
                                method: 'PUT',
                                url: `${API}/medicalRecord`,
                                data: values
                            })
                        }

                        setActualizar("TRUE")
                        resetForm();
                        setHasSend(true);
                        setTimeout(() => setHasSend(false), 5000)
                    }
                }
            >
                {({errors}) => (
                    <Form >
                        <Typography className={classes.title}>Antecedente No patológico </Typography>
                        {/* bolean starts */}
                        <div className={classes.asides}>
                            <div className={classes.box}>
                                <div className={classes.label}>
                                    <Field className={classes.checkbox}
                                        type="checkbox"
                                        id="alcoholismo"
                                        name="alcoholismo"
                                    >
                                    </Field>
                                    <label className={classes.text} htmlFor="alcoholismo">
                                        Alcoholismo
                                    </label>

                                </div>

                                <div className={classes.label}>
                                    <Field className={classes.checkbox}
                                        type="checkbox"
                                        id="tabaquismo"
                                        name="tabaquismo"
                                    >
                                    </Field>
                                    <label className={classes.text} htmlFor="tabaquismo">
                                        Tabaquismo
                                    </label>

                                </div>

                                <div className={classes.label}>
                                    <Field className={classes.checkbox}
                                        type="checkbox"
                                        id="tatuajes"
                                        name="tatuajes"
                                    >
                                    </Field>
                                    <label className={classes.text} htmlFor="tatuajes">
                                        Tatuajes
                                    </label>

                                </div>
                            </div>
                        </div>
                        {/* bolean ends*/}

                        {/* string starts*/}
                        <div className={classes.box}>
                            <div className={classes.textbox}>
                                <label htmlFor="alimentacion">
                                    Alimentación del paciente:
                                </label>
                                <Field
                                    as="textarea"
                                    id="alimentacion"
                                    name="alimentacion"
                                    placeholder="Detalles..."
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="alimentacion" component={()=>(
                                        errors.alimentacion&& <div className={classes.errors}>{errors.alimentacion};</div> 
                                    )}/> 
                            </div>

                            <div className={classes.textbox}>
                                <label htmlFor="higiene_corporal">
                                    Higiene corporal:
                                </label>
                                <Field
                                    as="textarea"
                                    id="higiene_corporal"
                                    name="higiene_corporal"
                                    placeholder="Frecuencia de baño...cambio de ropa"
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="higiene_corporal" component={()=>(
                                        errors.higiene_corporal&& <div className={classes.errors}>{errors.higiene_corporal};</div> 
                                    )}/> 
                            </div>

                            <div className={classes.textbox}>
                                <label htmlFor="higiene_bucal">
                                    Higiene bucal:
                                </label>
                                <Field
                                    as="textarea"
                                    id="higiene_bucal"
                                    name="higiene_bucal"
                                    placeholder="Cepillado, número de veces al día...Como?"
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="higiene_bucal" component={()=>(
                                        errors.higiene_bucal&& <div className={classes.errors}>{errors.higiene_bucal};</div> 
                                    )}/> 
                            </div>

                            <div className={classes.textbox}>
                                <label htmlFor="vacunas">
                                    Vacunas:
                                </label>
                                <Field
                                    as="textarea"
                                    id="vacunas"
                                    name="vacunas"
                                    placeholder="Si...No?... Cuales?"
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="vacunas" component={()=>(
                                        errors.vacunas&& <div className={classes.errors}>{errors.vacunas};</div> 
                                    )}/> 
                            </div>

                            <div className={classes.textbox}>
                                <label htmlFor="toxicomanias">
                                    Toxicomanias
                                </label>
                                <Field
                                    as="textarea"
                                    id="toxicomanias"
                                    name="toxicomanias"
                                    placeholder="Si...No?... Cuales?"
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="toxicomanias" component={()=>(
                                        errors.toxicomanias&& <div className={classes.errors}>{errors.toxicomanias};</div> 
                                    )}/> 
                            </div>

                            <div className={classes.textbox}>
                                <label htmlFor="comentarios">
                                    Comentarios:
                                </label>
                                <Field
                                    as="textarea"
                                    id="comentarios"
                                    name="comentarios"
                                    placeholder="Explayese..."
                                    className={classes.input}
                                >
                                </Field>
                                <ErrorMessage  name="comentarios" component={()=>(
                                        errors.comentarios&& <div className={classes.errors}>{errors.comentarios};</div> 
                                    )}/>   
                            </div>
                        </div>
                        {/* string ends*/}
                    <div className={classes.btn_container}>
                        <Button className={classes.btn} type="submit">{historia.antecedentesNoPatologico?"Actualizar":"Enviar"}</Button>
                    </div>
                    {hassend && <Alert>Antecedentes Patologicos enviados</Alert>}
                </Form>)}
            </Formik>
        </>
    )
}