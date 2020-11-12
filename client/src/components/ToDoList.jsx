import axios from "axios";

import { api } from "../config";

import { React, useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import NewBar from "./NewBar";
import { Box, Grid, makeStyles, Link, Typography } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const createTask = (item, folderName, tasks) => {
  let exist = tasks.includes(i => i === item);

  if (!exist) {
    axios.post(api + "/items", {
      folderName: folderName,
      item: item
    });
  }
};

const removeTask = async (item, folderName) => {
  let headers = {
    Accept: "*/*",
    "Access-Control-Allow-Methods": "*"
  };
  console.log("voy a borrar", folderName);
  let url = api + "/items";
  console.log("La uri", url);
  let data = {
    item: item,
    folderName: folderName
  };
  fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: headers,
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
};

const getTasks = async (folderName, setItems) => {
  let res;
  res = await axios.get(api + "/items", {
    params: {
      folderName: folderName
    }
  });
  let data = JSON.parse(res.data);
  console.log("la res", data);
  if (data.length) {
    setItems(data);
  }
};
const ToDoList = props => {
  const { folderName, onExit } = props;
  const [items, setItems] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    getTasks(folderName, setItems);
    console.log("items", items);
  }, []);

  const editTaskName = async (taskName, newTaskName, folderName, items) => {
    const exist = items.filter(i => i === newTaskName);
    //Si no existe el nuevo nombre
    console.log("Existe?",exist)
    if (!exist) {
      await createTask(newTaskName, folderName, items);
      await removeTask(taskName, folderName);
    }
  };
  const destroy = (item, e) => {
    const newItems = items.filter(i => i !== item);
    setItems(newItems);
    removeTask(item, folderName);
  };

  const createItem = item => {
    setItems([...items, item]);
    createTask(item, folderName, items);
  };
  return (
    <div className={classes.root}>
      <Box border={1}>
        <Grid container xs={12} sm={12} md={12} spacing={2}>
          <Grid key={0} item xs={4}>
            <Typography variant="h3">
              <Link color="inherit" onClick={onExit}>
                Folders
              </Link>{" "}
            </Typography>
          </Grid>
          <Grid key={1} item xs={4}>
            <Typography variant="h3">></Typography>
          </Grid>{" "}
          <Grid key={2} item xs={4}>
            <Typography variant="h3">{folderName}</Typography>
          </Grid>
          {items.map(i => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <ToDoItem
                key={i}
                text={i}
                folderName={folderName}
                editTaskName={editTaskName}
                destroy={e => destroy(i, e)}
              />
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
