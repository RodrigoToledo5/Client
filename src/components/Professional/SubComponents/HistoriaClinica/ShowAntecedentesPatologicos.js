import { Box, Typography, makeStyles, Button } from "@material-ui/core";
import React from 'react';
import Pdf from "react-to-pdf";
import { useSelector } from "react-redux";

const useStyle = makeStyles((theme) => ({

    text: {
        color: "#000",
        marginTop: "3px"
    },
    box: {
        padding: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "row",
        borderRadius: "10px",
        color: "#000",
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
        minHeight: "100px",
        maxWidth:"350px",
        flexWrap:"wrap"
    },
    input: {
        resize: "none",
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "80px",
        padding: "5px",
        textAlign:"justify",
        
        paddin:"1px"
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
    },
    planilla:{
        padding:"20px",
        marginTop:"10px",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-end"
    },
    date:{
        textAlign:"center"
    }

}));
const ref=React.createRef()

export default function ShowAntecedentesPatogolicos() {
    //const [historia, setHistoria] = useState({})
    const classes = useStyle();
    //const patient = useSelector((store) => store.reducerLog.actPatient);
    const historia = useSelector(state => state.reducerHistory.history)
    // async function callmedicalrecord(){
    //     const res=await axios.get(`${api}/medicalRecord?idPaciente=${idPaciente}`)
    //     setHistoria(res.data);
    // }
    /// usamos renderer prop
    // useEffect( () => {
    //     callmedicalrecord()
    // }, [])
    function formatName(string){
        if(string){
            return string[0]+string.substring(1,string.length).toLowerCase()

        }
        
    }

    return (
        <div className={classes.planilla}>
            <div ref={ref} className={classes.planilla}>
            <Typography className={classes.title}>Antecedente patológico:
            {
                formatName(historia.nombre)+' '+formatName(historia.apellidos)
                } 
            </Typography>
            <Typography className={classes.date}>
               Creado: {historia.antecedentesPatologico&&historia.antecedentesPatologico.createdAt}
            </Typography>
            <Typography>
               Actualizado: {historia.antecedentesPatologico&&historia.antecedentesPatologico.updatedAt}
            </Typography>
            {/* bolean starts */}
                <div className={classes.asides}>
                    <div className={classes.box}>
                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="nombre">
                                Diabetes:
                            </label>

                            <Typography
                                id="diabetes"
                                name="diabetes"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.diabetes === true ? " Si" : " No"}
                            </Typography>

                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="embarazo">
                                Embarazo:
                            </label>
                            <Typography
                                id="embarazo"
                                name="embarazo"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.embarazo === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="parasitos">
                                Parasitos:
                            </label>

                            <Typography
                                id="parasitos"
                                name="parasitos"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.parasito === true ? " Si" : " No"}
                            </Typography>

                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="sarampion">
                                Sarampión:
                            </label>

                            <Typography className={classes.checkbox}
                                id="sarampion"
                                name="sarampion"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.sarampion === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="amigdalitis">
                                Amigdalitis:
                            </label>
                            <Typography className={classes.checkbox}
                                type="checkbox"
                                id="amigdalitis"
                                name="amigdalitis"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.amigdalitis === true ? " Si" : " No"}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.box}>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="epilepsia">
                                Epilepsia:
                            </label>
                            <Typography className={classes.checkbox}
                                type="checkbox"
                                id="epilepsia"
                                name="epilepsia"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.epilepsia === true ? " Si" : " No"}
                            </Typography>


                        </div>



                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="hepatitis">
                                Hepatitis:
                            </label>
                            <Typography
                                id="hepatitis"
                                name="hepatitis"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.hepatitis === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="tosferina">
                                Tosferina:
                            </label>
                            <Typography className={classes.checkbox}
                                id="tosferina"
                                name="tosferina"

                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.tosferina === true ? " Si" : " No"}
                            </Typography>


                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="hemorragias">
                                Hemorragias:
                            </label>
                            <Typography
                                id="hemorragias"
                                name="hemorragias"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.hemorragias === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="cardiopatias">
                                Cardiopatías:
                            </label>
                            <Typography
                                id="cardiopatias"
                                name="cardiopatias"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.cardiopatias === true ? " Si" : " No"}
                            </Typography>

                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.label}>

                            <label className={classes.text} htmlFor="hipotension">
                                Hipotensión:
                            </label>
                            <Typography
                                id="hipotension"
                                name="hipotension"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.hipotension === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="hipertension">
                                Hipertensión:
                            </label>
                            <Typography className={classes.text} className={classes.checkbox}
                                id="hipertension"
                                name="hipertension"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.hipertension === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="fiebre_reumatica">
                                Fiebre reumática:
                            </label>
                            <Typography
                                id="fiebre_reumatica"
                                name="fiebre_reumatica"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.fiebre_reumatica === true ? " Si" : " No"}
                            </Typography>


                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="paludismo">
                                Paludismo:
                            </label>
                            <Typography
                                id="paludismo"
                                name="paludismo"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.paludismo === true ? " Si" : " No"}
                            </Typography>


                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="VIH">
                                VIH/SIDA:
                            </label>
                            <Typography
                                id="VIH"
                                name="VIH"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.VIH === true ? " Si" : " No"}
                            </Typography>


                        </div>
                    </div>
                    <div className={classes.box}>


                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="cooperador">
                                Es cooperador?:
                            </label>
                            <Typography
                                id="cooperador"
                                name="cooperador"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.cooperador === true ? " Si" : " No"}
                            </Typography>


                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="orientado">
                                Esta bien orientado?:
                            </label>
                            <Typography
                                id="orientado"
                                name="orientado"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.orientado === true ? " Si" : " No"}

                            </Typography>


                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="bajo_tratamiento">
                                Está bajo algún tratamiento médico?:
                            </label>
                            <Typography
                                id="bajo_tratamiento"
                                name="bajo_tratamiento"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.bajo_tratamiento === true ? " Si" : " No"}
                            </Typography>


                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="pildoras_anticonceptivas">
                                Toma píldoras anticonceptivas?:
                            </label>
                            <Typography
                                id="pildoras_anticonceptivas"
                                name="pildoras_anticonceptivas"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.pildoras_anticonceptivas === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="transfusion">
                                Recibió  una transfusión de sangre?:
                            </label>
                            <Typography
                                id="transfusion"
                                name="transfusion"
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.transfusion === true ? " Si" : " No"}
                            </Typography>


                        </div>
                    </div>
                    {/* bolean ends*/}
                    {/* string starts*/}
                    <div className={classes.box}>
                        <div className={classes.textbox}>
                            <label htmlFor="enfermedades_infancia">
                                Qué enfermedades ha padecido durante su infancia?
                            </label>
                            <Typography
                                id="enfermedades_infancia"
                                name="enfermedades_infancia"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.enfermedades_infancia ? historia.antecedentesPatologico.enfermedades_infancia : "No"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="accidente">
                                Ha tenido algún accidente?
                            </label>
                            <Typography
                                id="accidente"
                                name="accidente"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.accidente ? historia.antecedentesPatologico.accidente : "No"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="operacion">
                                Lo han operado alguna vez?
                            </label>
                            <Typography
                                id="operacion"
                                name="operacion"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.operacion ? historia.antecedentesPatologico.operacion : "No"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="alergia">
                                Es alérgico a algún medicamento, alimento u otra causa?
                            </label>
                            <Typography
                                id="alergia"
                                name="alergia"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.alergia ? historia.antecedentesPatologico.alergia : "No"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="constitucion">
                                Constitución
                            </label>
                            <Typography
                                id="constitucion"
                                name="constitucion"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.constitucion ? historia.antecedentesPatologico.constitucion : "Sin completar"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="complexion">
                                Complexión
                            </label>
                            <Typography
                                id="complexion"
                                name="complexion"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.complexion ? historia.antecedentesPatologico.complexion : "Sin completar"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="facies">
                                Facies Característica
                            </label>
                            <Typography
                                id="facies"
                                name="facies"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.facies ? historia.antecedentesPatologico.facies : "Sin completar"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="conformacion">
                                Conformación corporal
                            </label>
                            <Typography
                                id="conformacion"
                                name="conformacion"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.conformacion ? historia.antecedentesPatologico.conformacion : "Sin completar"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="moviemientos_anormales">
                                Moviemientos anormales
                            </label>
                            <Typography
                                id="moviemientos_anormales"
                                name="moviemientos_anormales"
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.moviemientos_anormales ? historia.antecedentesPatologico.moviemientos_anormales : "Sin completar"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="marcha_patologicas">
                                Marcha patológicas
                            </label>
                            <Typography
                                id="marcha_patologicas"
                                name="marcha_patologicas"
                                placeholder="Detalles..."
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.marcha_patologicas ? historia.antecedentesPatologico.marcha_patologicas : "Sin completar"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="ETS">
                                Ha pedecido E.T.S?
                            </label>
                            <Typography
                                id="ETS"
                                name="ETS"
                                placeholder="Detalles..."
                                className={classes.input}
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.ETS ? historia.antecedentesPatologico.ETS : "Sin completar"}

                            </Typography>
                        </div>

                        <Box className={classes.textbox}>
                            <label htmlFor="comentarios">
                                Comentarios
                            </label>
                            <Typography
                                id="comentarios"
                                name="comentarios"
                                className={classes.input}
                                
                            >
                                {historia.antecedentesPatologico && historia.antecedentesPatologico.comentarios ? historia.antecedentesPatologico.comentarios : "Sin completar"}
                            </Typography>
                        </Box>
                    </div>

                </div>
            {/* string ends*/}
            </div>
            <Pdf scale={0.8} targetRef={ref} filename="Antecedentes Patologicos.pdf" className={classes.btn_container}>
              {({toPdf})=>  <Button onClick={toPdf} className={classes.btn} >Descargar</Button>}
            </Pdf>


        </div>
    )
}