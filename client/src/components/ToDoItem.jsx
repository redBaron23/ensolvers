import { React, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Card,
  Button,
  CardContent,
  Checkbox
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  deatils: {
    flexDirection: "row",
    display: "flex"
  },
  content: {
    flex: "1 0 auto"
  },
  checkbox: {
    flexGrow: 0.2
  },
  button: {
    flexGrow: 0.8
  }
}));

const handleNewDescription = (e, setNewDescription) => {
  const { name, value } = e.target;
  console.log(value);
  setNewDescription(value);
};

const handleSave = (newDescription, setDescription, openDialog) => {
  setDescription(newDescription);
  openDialog(false);
};

const handleEdit = openDialog => {
  openDialog(true);
};

const handleCloseDialog = setOpenDialog => {
  setOpenDialog(false);
};
const ToDoItem = props => {
  const classes = useStyles();

  const { text, destroy } = props;

  const [newDescription, setNewDescription] = useState("");
  const [description, setDescription] = useState(text);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => handleCloseDialog(setOpenDialog)}
      >
        <DialogTitle id="form-dialog-title">Editing Task "{text}"</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            onChange={e => handleNewDescription(e, setNewDescription)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              handleSave(newDescription, setDescription, setOpenDialog)
            }
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={() => handleCloseDialog(setOpenDialog)}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.root} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Checkbox className={classes.checkbox} />
            {description}
            <Button
              className={classes.button}
              onClick={() => handleEdit(setOpenDialog)}
              color="primary"
            >
              Edit
            </Button>
	    <Button className={classes.button} onClick={destroy}color="primary">
              Remove
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ToDoItem;
