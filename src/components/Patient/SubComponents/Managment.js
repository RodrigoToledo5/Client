import { Box, Typography, makeStyles, Button, FormControl, InputLabel } from "@material-ui/core";
import devImg from "../../../assets/img/etc/inDev.png"
//importaciones para mercadopago
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const FORM_ID = 'payment-form';

const useStyle = makeStyles((theme) => ({
  principal: {
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    // backgroundColor: 'blue',
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: 'aqua'
  },
  form: {
    // backgroundColor: 'red',
    width: "70%",
    "@media (max-width : 900px)": {
      width: "70%",
    },
    "@media (max-width : 320px)": {
      width: "95%",
    },
  },
  container: {
    marginBottom: "50px",
    width: "65%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#E8EEF4",
    borderRadius: "10px",
    paddingBottom: "20px",
    "@media (max-width : 900px)": {
      width: "70%",
    },
    "@media (max-width : 500px)": {
      width: "100%",
    },
  },
  items: {
    display: "row",
    justifyContent: "center",
    width: "100%",
  },
  btn: {
    marginTop: "20px",
    width: "200%",
    backgroundColor: "#1F6186",
    color: "white",
    fontFamily: "Roboto",
  },
  text: {
    color: "#159DE9",
    fontFamily: "Roboto",
  },
  
  input: {
    color: "#159DE9",
    width: "100%",
  },
  title: {
    color: "#159DE9",
    fontFamily: "Roboto",
    padding: "2px",
    width: "-10px",
    height: "-20px"
  },
  hr: {
    width: "150%",
  },
  relative: {
    position: "absolute",
    backgroundColor: "#E8EEF4",
    top: "-20px",
    right: "47%",
    padding: "10px",
    fontFamily: "Roboto",
  },
  position: {
    position: "relative",
  },

}));

export default function Managment(){
    const classes = useStyle();

    return(
        <Box className={classes.principal}>
        <Box className={classes.container}>
            <h3  className={classes.title}>Managment</h3>
    <Box className={classes.container}>
      <Typography className={classes.title} variant="h3" component="h3" >Detalle de productos</Typography>
      <Box className={classes.box} >
        <Box className={classes.items} >
          <Box className={classes.items}>
          <Box className={classes.items}>
            <h3  className={classes.title}>Operacion</h3>
          </Box>
            <Box  className={classes.items}>
                {/* <img src="./assets/cardiologia.jfif" alt="foto del producto" ></img> */}
                <hr/>
                <h3  className={classes.title} >Descripcion</h3> 
                <br/>
                  <p className={classes.text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum, dignissimos! Illum dolor quisquam totam omnis laboriosam necessitatibus perferendis error iste, perspiciatis explicabo ipsa? Suscipit quis ratione odit veniam repudiandae ad.
                  Veniam, molestiae sint reiciendis iste fuga necessitatibus fugiat nihil modi amet eum aspernatur deserunt molestias repellat mollitia perferendis error quibusdam aliquam. Dignissimos ipsum et facilis eveniet nulla magni consequatur temporibus. </p>
                  <hr/>
                  <h3  className={classes.title}>Precio $4,000</h3>
                  
                  <Box className={classes.form}>
                                <form className={classes.form}  action="http://localhost:3001/checkout" method="POST" >
                                    <input type="hidden" name="title" value="Opercacion" />
                                    <input type="hidden" name="price" value="4000" />
                                    <Button className={classes.btn} type="submit" value="pagar">pagar</Button>
                                    
                                </form>
                            </Box>
                          </Box> 
                      </Box>
                      </Box> 
                  </Box>
                </Box>
              
              </Box>
        </Box>     
    )
}