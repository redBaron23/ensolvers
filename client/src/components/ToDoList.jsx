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

const editTaskName = (taskName, newTaskName, folderName) => {
  removeTask(taskName, folderName);
  createTask(newTaskName, folderName);
};

const createTask = (item, folderName) => {
  axios
    .post(api + "/items", {
      folderName: folderName,
      item: item
    })
    .then(i => console.log("El post devolvio", i));
};

const removeTask = async (item, folderName) => {
  console.log("voy a borrar", item, folderName);

  await axios({
    method: "DELETE",
    url: api + "/items",
    data: {
      item: item,
      folderName: folderName
    }
  });
};

const getTasks = async (folderName, setItems) => {
  let res;
  res = await axios.get(api + "/items", {
    params: {
      folderName: folderName
    }
  });
  console.log("la res", res.data);
  setItems(res.data.map(i => i.name));
};
const ToDoList = props => {
  const { folderName, onExit } = props;
  const [items, setItems] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    getTasks(folderName, setItems);
  }, []);

  const destroy = (item, e) => {
    const newItems = items.filter(i => i !== item);
    setItems(newItems);
    removeTask(item, folderName);
  };

  const createItem = item => {
    const exist = items.filter(i => i === item);

    if (!exist.length) {
      setItems([...items, item]);
      createTask(item, folderName);
    }
  };
  return (
    <div className={classes.root}>
      <Box border={1}>
        <Grid container xs={12} sm={12} md={12} spacing={2}>
          <Grid key={0} item xs={4}>
            <Typography variant="h3">
              <Link color="inherit" onClick={onExit}>Folders</Link>{" "}
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
