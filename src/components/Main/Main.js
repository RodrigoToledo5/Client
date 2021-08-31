import ReactCarousel from './Carousel/Carousel';
import CallToAction from './CallToAction/CallToAction';
import {  Box,makeStyles} from '@material-ui/core';

const useStyle=makeStyles(theme=>({
  magin:{
      margin: theme.spacing(2),
  },
  menuButton:{
      margin: theme.spacing(1),
      
  },
  fledDirection:{
      flexDirection:'row-reverse',
  },
  bar:{
      background:"white",
      borderRadius:"5px"
  },
  text:{
      color:"#159DE9",
      marginRight:theme.spacing(100),
      marginLeft:theme.spacing(5)
  },
  box_container:{
      marginTop:theme.spacing(10),
      alignItems:"center",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      '@media (min-width:600px)': {
        marginTop:theme.spacing(10),
        alignItems:"center",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
      },
  },
  box:{
    width:"300px",
    '@media (min-width:600px)': {
      width:"600px",
      margin:"10px"
    }
  },

}))

function Main() {
  const classes=useStyle();
  return (
    <Box className={classes.box_container}>
      <Box className={classes.box}>
        <ReactCarousel />
      </Box>
        <Box className={classes.box} marginBottom="10px">
          <CallToAction />
        </Box>
    </Box>
  );
}

export default Main;
