import { Box, makeStyles } from "@material-ui/core";
import NavPanel from "./NavPanel/NavPanel";
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../Log/actions";

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
    box:{
        marginTop:theme.spacing(10),
        marginBottom:theme.spacing(50),
        display:'flex',
        flexDirection:'row'
    }

}))


export default function PatientsProfile(){
    const classes=useStyle();
    const [actComponent, updateComponent] = useState(null);
    const user = useSelector((store) => store.reducerLog.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getInfo({...user}));
    },[])
    return(
        <Box className={classes.box}>
            <NavPanel updateComponent={updateComponent}/>
            <Box width="100%">{actComponent}</Box>
        </Box>
    )
}