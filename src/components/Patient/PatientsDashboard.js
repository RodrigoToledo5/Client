import {Container, Box, makeStyles } from "@material-ui/core";
import NavPanel from "./NavPanel/NavPanel";
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { getInfo } from "../Log/actions";
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
    container:{
        marginTop: theme.spacing(9),
        "@media (max-width: 600px)":{
            marginTop: '110px'
        }
    },
    text:{
        color:"#159DE9",
    },
    nav:{
        display:'flex'
    },
    icon:{
        display: 'none',
        "@media (max-width:900px)": {
            color: "#159DE9",
            margin: '0',
            padding: "0 10px 0px 10px",
            display: 'flex',
            justifyContent: 'flexStart',
            position: 'relative'
        },
    },
    iconActive:{
        display: 'none',
        "@media (max-width:900px)": {
            color: "#159DE9",
            background: 'rgb(232, 240, 254)',
            margin: '0',
            padding: "0 10px 0px 10px",
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            position: 'relative',
            justifyContent: 'flexStart',
            width: '50px',
            transition: '3s ease all'
        },
    },
    box:{
        marginBottom:theme.spacing(8),
        display:'flex',
        flexDirection:'row'
    },
    alert:{
        display:"flex",
        padding: '10px',
        //background: 'green',
        margin: '10px ',
        justifyContent:"flex-end",
        marginRight:"40vh",
        marginLeft:"40vh",
        "@media (max-width:900px)": {
            marginRight:"10vh",
            marginLeft:"10vh"
    }
}

}))


export default function PatientsDashboard(){
    const classes=useStyle();
    const [actComponent, updateComponent] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.reducerLog.user);
    const userInfo = useSelector((store) => store.reducerLog.info);
    const [editprofile, setEditProfile] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getInfo({...user}));
    },[])

    function handleEdit() {
        setEditProfile(!editprofile)
    }
    return(
        <Container className ={classes.container} >
            <Box className= { showMenu? classes.iconActive : classes.icon }>
                        {
                            showMenu ? 
                                <CloseIcon onClick ={() => setShowMenu(!showMenu)}/> 
                                : 
                                <MenuIcon onClick ={() => setShowMenu(!showMenu)}/>
                        }
            </Box>
            <Box className={classes.alert}>
                {
                    userInfo.estado_civil && userInfo.genero ? 
                    null 
                        : 
                    (<>
                        <Alert  severity="warning">
                            Por favor configure su estado civil y su genero en la sección Mi Perfil <a href="#" onClick={()=> handleEdit()}>Aquí</a>
                        </Alert>
                        {editprofile && <Profile handleEdit={handleEdit}/>}
                    </>)
                }
            </Box>
            <Box className={classes.box}>
                <NavPanel updateComponent={updateComponent} showMenu = {showMenu} setShowMenu={setShowMenu}/>
                <Box width="100%">{actComponent}</Box>
            </Box>
        </Container>
    )
}