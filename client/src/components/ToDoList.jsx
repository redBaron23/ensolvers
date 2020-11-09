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


  const destroy = (item) => {
    console.log("elemento a eliminar",item)
    const arr = items.filter(i => i !==item);
    
    setItems(arr);
    console.log("Ahora tengo",arr)

    /*
    let newItems = [...items];

     newItems = newItems.filter( i => i!==item );
    console.log("El nuevo es",newItems);
    setItems(newItems);*/
  }

  const createItem = item => {
    const exist = items.filter(i => i===item);
    (!exist) && setItems([...items, item]);
    console.log("Ahora tengo",items)
  };
  return (
    <div className={classes.root}>
      <Grid container xs={12} sm={12} md={12} spacing={2}>

	{console.log("Voy aponer",items)}
        {
	  items.map(i => (
          <Grid item xs={12} sm={6} md={3}>
            <ToDoItem text={i} destroy={destroy}/>
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
