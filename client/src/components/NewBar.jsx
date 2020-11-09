import { React, useState } from "react";
import ToDoItem from "../components/ToDoItem";
import { Box, Button, TextField, makeStyles } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: "1 0 auto"
  },
  button: {
    flexGrow: 0.2
  },
  text: {
    flexGrow: 1
  }
}));

const handleText = (e,setText) => {
  const { name, value } = e.target;
  console.log(value);
  setText(value)
};

const handleButton = (create,text) => {
  (text) && create(text)
}

const NewBar = props => {
  const { create, type } = props;

  const classes = useStyles();
  const [text, setText] = useState("");

  return (
    <div>
      <Box className={classes.root}>
        <TextField
          className={classes.text}
	  onChange={(e) => handleText(e,setText)}
          label={"New " + type}
        />
	<Button className={classes.button} color="primary" onClick={() => handleButton(create,text)}>
          Add
        </Button>
      </Box>
    </div>
  );
};

export default NewBar;
