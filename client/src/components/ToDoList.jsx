import { React, useState } from "react";
import ToDoItem from "./ToDoItem";
import NewBar from "./NewBar";
import { Box, Button, Grid, makeStyles } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const ToDoList = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  const createItem = item => {
    setItems([...items, item]);
  };
  return (
    <div className={classes.root}>
      <Grid container xs={12} sm={12} md={12} spacing={2}>
        {items.map(i => (
          <Grid item xs={12} sm={6} md={3}>
            <ToDoItem text={i} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <NewBar create={createItem} type="Task" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ToDoList;
