import { React, useState, useEffect } from "react";
import  axios  from "axios";
import { api } from "../config";
import Folder from "./Folder";
import NewBar from "./NewBar";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const getFolders = async (setFolders) => {
  let res;
  res = await axios.get(api + "/folders");
  console.log("la res", res.data);
  setFolders(res.data)
};
const FolderList = () => {
  const classes = useStyles();

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getFolders(setFolders);
  }, []);

  const destroy = (folder, e) => {
    const newFolders = folders.filter(i => i !== folder);
    setFolders(newFolders);
  };

  const createFolder = folder => {
    const exist = folders.filter(i => i === folder);

    if (!exist.length) {
      let arr = [...folder, folder];
      setFolders([...folders, folder]);
    }
  };
  return (
    <div className={classes.root}>
      <Box border={1}>
        <Typography variant="h3">Folders</Typography>
        <Grid container xs={12} sm={12} md={12} spacing={2}>
          {folders.map(i => (
            <Grid key={i} folder xs={12} sm={6} md={3}>
              <Folder key={i} text={i} destroy={e => destroy(i, e)} />
            </Grid>
          ))}
          <Grid folder xs={12}>
            <NewBar create={createFolder} type="Folder" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FolderList;
