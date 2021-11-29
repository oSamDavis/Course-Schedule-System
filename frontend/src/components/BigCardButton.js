import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "10px",
    padding: "10px",
    height: "200px",
    width: "200px",
  },
}));

function BigCardButton({ text, routeName, startIcon, onClick }) {
  const classes = useStyles();
  return (
    <div>
      {routeName ? (
        <Link style={{ textDecoration: "none" }} to={routeName}>
          <Button
            style={{ backgroundColor: "#71DFE7" }}
            onClick={onClick}
            className={classes.card}
            variant="text"
          >
            <Paper style={{ backgroundColor: "#71DFE7" }} elevation={0}>
              {startIcon && <div> {startIcon}</div>}
              {text}
            </Paper>
          </Button>
        </Link>
      ) : (
        <Button
          style={{ backgroundColor: "#71DFE7" }}
          onClick={onClick}
          className={classes.card}
          variant="text"
        >
          <Paper style={{ backgroundColor: "#71DFE7" }} elevation={0}>
            {startIcon && <div> {startIcon}</div>}
            {text}
          </Paper>
        </Button>
      )}
    </div>
  );
}

export default BigCardButton;
