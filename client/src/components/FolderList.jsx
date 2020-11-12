import { React, useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config";
import Folder from "./Folder";
import NewBar from "./NewBar";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const createNewFolder = async folderName => {
  let url = api + "/folders";
  let data = {
    folderName: folderName
  };
  let res = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
};

const removeFolder = async folderName => {
  let headers = {
    Accept: "*/*",
    'Access-Control-Allow-Methods': '*'
  };
  console.log("voy a borrar", folderName);
  let url = api + "/folders";
  console.log("La uri", url);
  let data = {
    folderName: folderName
  };
  let res = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: headers,
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  console.log("Res del delete", res);
};

const getFolders = async setFolders => {
  let res;
  res = await axios.get(api + "/folders", {
    headers: {
      Accept: "*/*"
    }
  });
  console.log("la res", res.data);
  setFolders(res.data);
};
const FolderList = props => {
  const { onFolder } = props;
  const [folders, setFolders] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    getFolders(setFolders);
  }, []);

  const destroy = (folder, e) => {
    const newFolders = folders.filter(i => i !== folder);
    removeFolder(folder);
    setFolders(newFolders);
  };

  const createFolder = folder => {
    const exist = folders.filter(i => i === folder);

    if (!exist.length) {
      let arr = [...folder, folder];
      createNewFolder(folder);
      setFolders([...folders, folder]);
    }
  };
  return (
    <div className={classes.root}>
      <Box border={1}>
        <Grid container xs={12} sm={12} md={12} spacing={2}>
          <Grid key={-1} item xs={12}>
            <Typography variant="h3">Folders</Typography>
          </Grid>
          {folders.map(i => (
            <Grid item key={i} folder xs={12} sm={6} md={3}>
              <Folder
                key={i}
                onClick={e => onFolder(i)}
                text={i}
                destroy={e => destroy(i, e)}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <NewBar create={createFolder} type="Folder" />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FolderList;
