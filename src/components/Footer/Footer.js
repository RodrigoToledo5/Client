import { Container,Grid,Box, Link, makeStyles} from "@material-ui/core";
import logo from './CONSULTANCE SPACE COMPLETO.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';



const useStyle = makeStyles((theme) => ({
  
    img:{
        width:"200px"
    },
    containerImg:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    iconStyle:{
        marginRight:"20px",
        color: "#159DE9"
    }, 
    linksContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
     
    },

    titles:{
        fontWeight: "900",
        marginBottom: "10px",
        fontSize: "18px",
    }


  }));


export default function Footer(){
    const classes = useStyle();
   
    return (
        <>
        <footer>
            <Box 
                px={ {xs:3, sm:3}} 
                py={ {xs:5, sm:3}} 
                bgcolor="#f5f5f7" 
                color="#86868b"
                borderRadius="5px"
                >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid className={classes.linksContainer} item xs={12} sm={4}>
                            <Box className={classes.titles}>Sobre Consultance Space</Box>
                            <Box>
                                <Link color="inherit">Contacto</Link>
                            </Box>
                            <Box>
                                <Link color="inherit">Soporte</Link>
                            </Box>
                            <Box>
                                <Link color="inherit">Politicas de Privacidad</Link>
                            </Box>
                            <Box>
                                <Link color="inherit">Términos y Condiciones</Link>
                            </Box>
                        </Grid>
                        <Grid className={classes.linksContainer} item xs={12} sm={4}>
                            <Box className={classes.containerImg}> 
                                <img className={classes.img} src={logo} alt="logo-Consultance"/>
                            </Box>
                            <Box className={classes.containerImg} pt={{xs:5,sm:5}} pb={{xs:5,sm:2}}>
                                {/* Consultance Space &reg; {new Date().getFullYear()} */}
                                <Link><FacebookIcon className={classes.iconStyle}/></Link>
                                <Link><WhatsAppIcon className={classes.iconStyle}/></Link>
                                <Link><TwitterIcon className={classes.iconStyle}/></Link>
                                <Link><InstagramIcon className={classes.iconStyle}/></Link>
                            </Box>
                            
                        </Grid>
                        <Grid  className={classes.linksContainer} item xs={12} sm={4}>
                            <Box className={classes.titles}>Encuentranos en estos paises</Box>
                            <Box>
                                <Link color="inherit">Argentina</Link>
                            </Box>
                            <Box>
                                <Link color="inherit">Colombia</Link>
                            </Box>
                            <Box>
                                <Link color="inherit">México</Link>
                            </Box>
                            <Box>
                                <Link color="inherit">Perú</Link>
                            </Box>
                            
                        </Grid>
                    </Grid>
                   
                </Container>
            </Box>
        </footer>
        </>
    )
}