import { React, useState } from "react";
import Folder from "./Folder";
import NewBar from "./NewBar";
import { Box, Button, Grid, makeStyles,Typography } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const FolderList = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  const destroy = (item, e) => {
    const newItems = items.filter(i => i !== item);
    setItems(newItems);
  };

  const createItem = item => {
    const exist = items.filter(i => i === item);

    
    if (!exist.length) {
      let arr = [...items,item]
      setItems([...items, item]);
    }
  };
  return (
    <div className={classes.root}>
      <Box border={1}>
	<Typography variant="h3">Folders</Typography>
      <Grid container xs={12} sm={12} md={12} spacing={2}>
        {items.map(i => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Folder key={i} text={i} destroy={e => destroy(i, e)} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <NewBar create={createItem} type="Folder" />
        </Grid>
      </Grid>
      </Box>
    </div>
  );
};

export default FolderList;