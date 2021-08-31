import { Box, Typography, makeStyles, responsiveFontSizes } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import img1 from "../../../assets/img/etc/welcome.jpg";
import img2 from "../../../assets/img/etc/welcome1.jpg";
import img3 from "../../../assets/img/etc/welcome2.jpg";
import img4 from "../../../assets/img/etc/welcome3.jpg";
import img5 from "../../../assets/img/etc/welcome4.jpg";
import img6 from "../../../assets/img/etc/welcome5.jpg";
import img7 from "../../../assets/img/etc/welcome6.jpg";

export default function Welcome(){
  const itemHeight = "85vh";

  const items = [
    {//1
      name: "Lleva un control de tus pacientes ",
      description: "Puedes buscar a los pacientes registrados y agregarlos a mis pacientes para llevar un control más personalizado",
      img: img1,
      height: itemHeight,
      

    },
    {//2
      name: "Lleva el control de tu inventario",
      description: "Puedes llevar el control de tu inventario para tener una mejor administración de tus insumos médicos",
      img: img4,
      height: itemHeight,

    },
    {//3
      name: "Revisa tus citas agendadas",
      description: "Lleva el control de tus citas médicas en la sección de citas agendadas control de citas agendadas",
      img: img2,
      height: itemHeight,

    },   
    {//4
      name: "Busca pacientes registrados en la plataforma",
      description: "En la sección pacientes podrás buscar a las personas registradas como pacientes y agregarlos a tu consultorio en la sección mis pacientes",
      img: img3,
      height: itemHeight,

    },
    {//5
      name: "Lleva el control de citas agendadas",
      description: "Podrás buscar las citas agendadas con tus pacientes para tener un mejor control de tu agenda",
      img: img6,
      height: itemHeight,

    },
    {
      name: "Podrás buscar a otros profesionales",
      description: "Agregamos la sección de profesionales, donde podrás buscar a los profesionales registrados en la plataforma para hacer para trabajos colaborativos.",
      img: img5,
      height: itemHeight,

    },
    {//
      name: "Perfil personalizado",
      description: "Si te equivocaste en algun dato cuando hiciste el registro puedes editar tu perfil en la seccón seccion de Mi Perfil en la esquina superior derecha",
      img: img7,
      height: itemHeight,

    },
  ];

  return (
    <>
    <Carousel >
      {items.map((item, i) => (
        
        <Item  key={i} item={item} />

      ))}
    </Carousel>
    </>
  );
}

function Item(props) {
  const useStyle = makeStyles(theme=>( {
    paperContainer: {
      backgroundImage: `url(${props.item.img})`,
      backgroundPoistion:"center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height:props.item.height,
      display: "flex",
      flexDirection: "column",
      borderRadius:"15px"
    },
    itemContainer:{
      borderRadius:"15px",
    },
    textContainer: {
      marginTop: "auto",
      backgroundColor: "black",
      opacity: "0.5",
      zIndex: "1",
      color:"#fff",
      borderRadius:"20px",
      padding:"20px"
    },
    opaqueFilter: {
        zIndex: "3",
      },
    fontSize: '1.2rem',
    '@media (max-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  }));

  const classes=useStyle();

  return (
    <div  elevation={3} className={classes.paperContainer}>

        <div className={classes.textContainer}>
               
        <div className={classes.opaqueFilter}>
          <h2 className={classes.fontSize}>{props.item.name}</h2>
          <p className={classes.fontSize}>{props.item.description}</p>
        </div>
        
      </div>  
    </div>
  );
}
