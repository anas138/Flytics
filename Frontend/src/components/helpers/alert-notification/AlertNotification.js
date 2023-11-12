import React, { useRef } from "react";
import { withStyles } from "@mui/styles";
import styles from "./AlertNotificationStyles";
import { ListItem, ListItemText } from "@mui/material";

function AlertNotification(props) {
  const { classes } = props;
  const { alert } = props;
  const ref = useRef();

  return (
    <ListItem
      ref={ref}
      key={alert._id}
      className={alert.isViewed ? classes.viewedAlert : classes.unViewedAlert}
    >
      <ListItemText primary={alert.message} />
    </ListItem>
  );
}

export default withStyles(styles)(AlertNotification);
