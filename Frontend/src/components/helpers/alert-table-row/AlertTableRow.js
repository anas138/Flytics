import { withStyles } from "@mui/styles";
import React, { useEffect, useRef } from "react";
import styles from "./AlertTableRowStyles";
import useOnScreen from "./../../../hooks/UseOnScreen";
import { useDispatch } from "react-redux";
import { markAlertAsRead } from "../../../store/alerts/alerts";
import { TableCell, TableRow } from "@mui/material";
import { formatDate } from "../../../utils/HelperFunctions";

function AlertTableRow(props) {
  const { classes } = props;
  const { data } = props;
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      if (!data.isViewed) {
        dispatch(markAlertAsRead(data._id));
      }
    }
  }, [isVisible]);

  const alertType = (types) => {
    switch (types) {
      case "a": {
        return "Absent";
      }
      default: {
        return "Misc";
      }
    }
  };

  return (
    <TableRow ref={ref}>
      <TableCell>
        {data.alertDate ? formatDate(data.alertDate) : null}
      </TableCell>
      <TableCell>{data.alertType ? alertType(data.alertType) : null}</TableCell>
      <TableCell>{data.message ? data.message : null}</TableCell>
      <TableCell>
        {data.operator.operatorName ? data.operator.operatorName : null}
      </TableCell>
    </TableRow>
  );
}

export default withStyles(styles)(AlertTableRow);
