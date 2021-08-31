import { Box, Typography, makeStyles, responsiveFontSizes } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import img1 from "../../../assets/img/etc/welcome.jpg";
import img2 from "../../../assets/img/etc/welcome1.jpg";
import img3 from "../../../assets/img/etc/welcome2.jpg";


export default function Welcome(){
  const itemHeight = "85vh";

  const items = [
    {
      name: "Busca un profesional ",
      description: "Puede hacerlo a traves de su email,nombre o por su especialidad",
      img: img1,
      height: itemHeight,
      

    },
    {
      name: "Revisa tus citas agendadas",
      description: "Lleva el control de tus citas medicas en la seccion de citas agendadas",
      img: img2,
      height: itemHeight,

    },
    {
      name: "Perfil personalizado",
      description: "Si te equivocaste en algun dato cuando hiciste el registro puedes editarlo en la seccion de Mi Perfil",
      img: img3,
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
