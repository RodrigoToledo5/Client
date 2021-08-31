import { Box, Container, makeStyles } from "@material-ui/core";
import NavPanel from "./NavPanel/NavPanel";
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../Log/actions";
import Alert from "@material-ui/lab/Alert";
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Profile from '../Header/Buttons/Profile';


const useStyle=makeStyles(theme=>({
    menu:{
        margin: theme.spacing(1),
        minWidth:'84px'
    },
    bar:{
        background:"white",
        borderRadius:"5px"
    },
    toolbar:{
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        '@media (max-width:600px)':{
        flexDirection:'column-reverse'
    }
    },
    text:{
        color:"#159DE9",
    },
    nav:{
        display:'flex'
    },
    container:{
        marginTop:theme.spacing(9),
        display: 'flex',
        zIndex: '3',
        // background: 'green',
        padding: "0",
        "@media (max-width:600px)": {
            marginTop: '110px'
        },
        "@media (max-width:360px)": {
            marginTop: '120px'
        },
    },
    iconActive:{
        display: 'none',
        "@media (max-width:900px)": {
            color: "#159DE9",
            background: 'rgb(232, 240, 254)',
            margin: '0',
            padding: "0 10px 2px 10px",
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            justifyContent: 'flexStart',
            position: 'absolute',
            width: '50px',
            transition: '3s ease all'
        },
    },
    icon:{
        display: 'none',
        "@media (max-width:900px)": {
            color: "#159DE9",
            margin: '0',
            padding: "0 10px 2px 10px",
            display: 'flex',
            justifyContent: 'flexStart',
            position: 'absolute',
            transition: '1s ease all'
        },
    },
    box:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(8),
        display:'flex',
        //background: 'red',
        paddingRight: '0',
        paddingLeft: '0px',
        flexDirection:'column',
        flex: '3',
        
    },
    banner:{
        display: 'flex',
        //background: 'green',
        margin: '0'
    },
    title:{
        width: '100%',
        textAlign: 'center',
        color:"#159DE9",
        fontFamily:"lato",
        fontSize:"25px",
    },
    field:{
        padding: '0'
    },
    
    
}))


export default function Dashboard(){
    const classes=useStyle();
    const [actComponent, updateComponent] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [editprofile, setEditProfile] = useState(false);
    const user = useSelector((store) => store.reducerLog.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getInfo({...user}));
    },[])

    const uC = (c) => {
        updateComponent(c);
    }

    function handleEdit() {
        setEditProfile(!editprofile)
    }

    //por ahora no vamos a usar mas esto
    const especialidad = useSelector(state => state.reducerLog.info.especialidads)
    return(
        <Container className ={classes.container}>
            <NavPanel updateComponent={uC} showMenu = {showMenu} setShowMenu={setShowMenu}/>
            <Box className={classes.box}>
                <Box className = {classes.banner}>
                    <Box className={showMenu? classes.iconActive : classes.icon}>
                        {
                            showMenu ? 
                                <CloseIcon onClick ={() => setShowMenu(!showMenu)}/> 
                                : 
                                <MenuIcon onClick ={() => setShowMenu(!showMenu)}/>
                        }
                    </Box>
                    <Box className={classes.title}>
                    {especialidad&&especialidad.length>0?especialidad.map((spect,i)=>{
                        return (
                            <>
                                {i>0&&<a> </a>}
                                <a key={i}>{spect.nombre}</a>
                            </>
                        )
                    })
                    :
                    <>
                        <Alert  severity="warning">
                            Por favor configure su especialidad en la sección Mi Perfil para que los pacientes puedan buscarlo por su especialidad <a href="#" onClick={() => handleEdit()}>Aquí</a>
                        </Alert>
                        {editprofile && <Profile handleEdit={handleEdit}/>}
                    </>}
                    </Box>
                </Box>
                <Box className ={classes.field}>{actComponent}</Box>
            </Box>
        </Container>
    )
}