import axios from "axios";

import { api } from "../config";

import { React, useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import NewBar from "./NewBar";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core/";

const folderName = "folderName";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const getTasks = folderName => {
  let res;
  res = axios.get(api + "/items", {
    params: {
      folderName: folderName
    }
  });
  console.log("Me devolvio", res);
  return res;
};
const ToDoList = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!items.length) {
      getTasks(folderName).then(i => setItems(i.data.map(i => i.name)));
    }
  });

  const destroy = (item, e) => {
    const newItems = items.filter(i => i !== item);
    setItems(newItems);
  };

  const createItem = item => {
    const exist = items.filter(i => i === item);

    if (!exist.length) {
      let arr = [...items, item];
      setItems([...items, item]);
      axios.post(api+"/items",{
	folderName:folderName,
	item:item
      })
	.then(i => console.log("El post devolvio",i))
    }
  };
  return (
    <div className={classes.root}>
      <Box border={1}>
        <Typography variant="h3">To-Do List</Typography>
        <Grid container xs={12} sm={12} md={12} spacing={2}>
          {items.map(i => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <ToDoItem key={i} text={i} destroy={e => destroy(i, e)} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <NewBar create={createItem} type="Task" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ToDoList;
