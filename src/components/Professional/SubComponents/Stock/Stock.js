// Stock Component, fetch to Stock rute, need add to redux state for user
// render StockCard

import {
  Box,
  Button,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StockCard from "./StockCard/StockCard";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { API } from "../../../..";
const axios = require("axios");

export default function Stock() {
  const [stock, updateStock] = useState([]);
  const user = useSelector((store) => store.reducerLog.user);
  const loadData = () => {
    axios({
      method: "get",
      url: `${API}/stock`,
      params: { email: user.email },
    }).then(function (response) {
      updateStock([...response.data]);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const useStyle = makeStyles((theme) => ({
    paperContainer: {
      color: "white",
      backgroundColor: "#2196f3",
    },
    divider: { background: "white" },
    item: { paddingLeft: "10px" },
    button: { width: "150px", margin: "10px" },
    mainBox: {
      padding: "10px",
      paddingLeft: "50px",
      paddingRight: "50px",
      marginLeft: "10px",
      marginRight: "10px",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      color: "#159DE9",
    }
  }));

  const editStock = (data = null, key = null) => {
    data && updateStock(data);
    if (key !== null) {
      let newStock = [...stock];
      newStock.splice(key, 1);
      updateStock(newStock);
    }
  };

  const manageAddButton = () => {
    if (stock.length > 0 && Object.keys(stock[stock.length-1])[0].length === 0) {
      return "";
    } else {
      return (
        <Button
          className={classes.button}
          disableElevation={true}
          onClick={() => {
            updateStock([...stock, { "": 0 }]);
          }}
        >
          <AddIcon />
        </Button>
      );
    }
  };

  const classes = useStyle();
  return (
    <Box className={classes.mainBox}>
    <Typography variant='h3'>Inventario</Typography>
      <Box display="flex" width="100%" className={classes.paperContainer}>
        <Box width="35%" className={classes.item}>
          <Typography variant="h5">Item</Typography>
        </Box>
        <Divider
          flexItem={true}
          orientation="vertical"
          className={classes.divider}
        />
        <Box width="15%" paddingLeft="10px">
          <Typography variant="h5">Cantidad</Typography>
        </Box>
      </Box>
      <Divider className={classes.divider} />
      {stock === "not found" || stock.length < 1
        ? ""
        : stock.map((s, i) => (
            <StockCard
              updateStock={editStock}
              data={s}
              email={user.email}
              key={i}
              index={i}
            />
          ))}
      <Box display="flex" width="100%" justifyContent="center">
        {manageAddButton()}
      </Box>
    </Box>
  );
}
