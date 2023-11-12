import { withStyles } from "@mui/styles";
import React from "react";
import styles from "./ContentPaneStyles";

function ContentPane(props) {
  const { classes } = props;
  return <div className={classes.childPropContainer}>{props.children}</div>;
}

export default withStyles(styles)(ContentPane);
