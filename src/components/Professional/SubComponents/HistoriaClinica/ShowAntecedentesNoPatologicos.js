import { Typography, makeStyles,  Button } from "@material-ui/core";
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
        border:"solid 1px black"
    },
    input: {
        resize: "none",
        minWidth: "350px",
        maxWidth: "350px",
        minHeight: "80px",
        padding: "5px",
        textAlign:"justify",
        border:"solid 1px black"
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

export default function ShowAntecedentesNoPatogolicos() {
    //const [historia, setHistoria] = useState({})
    const classes = useStyle();
    const historia = useSelector(state => state.reducerHistory.history)
    /// usamos renderer prop
    // async function callmedicalrecord(){
    //     const res=await axios.get(`${api}/medicalRecord?idPaciente=${idPaciente}`)
    //     setHistoria(res.data);
        
     
    // }
    // useEffect(async () => {
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
            <Typography className={classes.title}>Antecedente no patológico:
            {
                formatName(historia.nombre)+' '+formatName(historia.apellidos)
                } 
            </Typography>
            <Typography className={classes.date}>
               Creado: {historia.antecedentesNoPatologico&&historia.antecedentesNoPatologico.createdAt}
            </Typography>
            <Typography>
               Actualizado: {historia.antecedentesNoPatologico&&historia.antecedentesNoPatologico.updatedAt}
            </Typography>
            {/* bolean starts */}
                <div className={classes.asides}>
                    <div className={classes.box}>
                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="alcoholismo">
                                Alcoholismo:
                            </label>

                            <Typography
                                id="alcoholismo"
                                name="alcoholismo"
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.alcoholismo === true ? " Si" : " No"}
                            </Typography>

                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="tabaquismo">
                                Tabaquismo:
                            </label>
                            <Typography
                                id="tabaquismo"
                                name="tabaquismo"
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.tabaquismo === true ? " Si" : " No"}
                            </Typography>
                        </div>

                        <div className={classes.label}>
                            <label className={classes.text} htmlFor="tatuajes">
                                Tatuajes:
                            </label>

                            <Typography
                                id="tatuajes"
                                name="tatuajes"
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.parasito === true ? " Si" : " No"}
                            </Typography>

                        </div>
                    </div>
                    {/* bolean ends*/}
                    {/* string starts*/}
                    <div className={classes.box}>
                        <div className={classes.textbox}>
                            <label htmlFor="alimentacion">
                                Alimentación:
                            </label>
                            <Typography
                                id="alimentacion"
                                name="alimentacion"
                                className={classes.input}
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.alimentacion ? historia.antecedentesNoPatologico.alimentacion : "Sin completar"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="higiene_corporal">
                                Higiene corporal :
                            </label>
                            <Typography
                                id="higiene_corporal"
                                name="higiene_corporal"
                                className={classes.input}
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.higiene_corporal ? historia.antecedentesNoPatologico.higiene_corporal : "Sin completar"}

                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="higiene_bucal">
                                Higiene bucal:
                            </label>
                            <Typography
                                id="higiene_bucal"
                                name="higiene_bucal"
                                className={classes.input}
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.higiene_bucal ? historia.antecedentesNoPatologico.higiene_bucal : "Sin completar"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="vacunas">
                                Vacunas:
                            </label>
                            <Typography
                                id="vacunas"
                                name="vacunas"
                                className={classes.input}
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.vacunas ? historia.antecedentesNoPatologico.vacunas : "Sin completar"}
                            </Typography>
                        </div>

                        <div className={classes.textbox}>
                            <label htmlFor="toxicomanias">
                                Toxicomanias:
                            </label>
                            <Typography
                                id="toxicomanias"
                                name="toxicomanias"
                                className={classes.input}
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.toxicomanias ? historia.antecedentesNoPatologico.toxicomanias : "Sin completar"}
                            </Typography>
                        </div>
                        
                        <div className={classes.textbox}>
                            <label htmlFor="comentarios">
                                Comentarios
                            </label>
                            <Typography
                                id="comentarios"
                                name="comentarios"
                                className={classes.input}
                            >
                                {historia.antecedentesNoPatologico && historia.antecedentesNoPatologico.comentarios ? historia.antecedentesNoPatologico.comentarios : "Sin completar"}
                            </Typography>
                        </div>
                    </div>

                </div>
            {/* string ends*/}
            </div>
            <Pdf scale={0.8} targetRef={ref} filename="Antecedentes No Patologicos.pdf" className={classes.btn_container}>
              {({toPdf})=>  <Button onClick={toPdf} className={classes.btn} >Descargar</Button>}
            </Pdf>


        </div>
    )
}