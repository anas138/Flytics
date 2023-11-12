import { MoreVertRounded } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  fixFloat,
  formatDate,
  getStaffImage,
  trimId,
} from "../../../utils/HelperFunctions";
import styles from "./AlertCardStyle";
import { useSelector } from "react-redux";
import AlertTableRow from "../alert-table-row/AlertTableRow";

function AlertTableCard(props) {
  const { classes } = props;
  const alert = useSelector((state) => state.entities.alert.list);
  
  const datalist = alert.map((data, index) => {
    return <AlertTableRow key={index} data={data} />;
  });

  return (
    <div className={classes.root}>
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <Typography className={classes.cardTitile}>Alerts</Typography>
        <IconButton>
          <MoreVertRounded />
        </IconButton>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableCell>Alert Date</TableCell>
            <TableCell>Alert Type</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Operator</TableCell>
          </TableHead>
          <TableBody>{datalist}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(AlertTableCard);
