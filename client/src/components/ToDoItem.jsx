import { React, useState } from "react";
import {
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
  }
}));

const ToDoItem = props => {
  const classes = useStyles();

  const { text } = props;

  const [description, setDescription] = useState(text);

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Checkbox />
            {description}
            <Button color="primary">Edit</Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ToDoItem;
