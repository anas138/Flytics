import { withStyles } from "@mui/styles";
import React from "react";
import styles from "./DashboardAssessmentStyles";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  fixFloat,
  formatAssessmentTime,
  formatTime,
} from "../../../utils/HelperFunctions";


function DashboardAssessmentCard(props) {
  const { classes } = props;
  const { title, tableData } = props;
  const renderDataRecords = () => {
    const sortedData = [...tableData];
    sortedData.sort(function (a, b) {
      return b.stats?.rating - a.stats?.rating;
    });
    const list = sortedData.map((rec) => (
      <TableRow className={classes.dataRow} key={rec._id}>
        <TableCell>
          <div className={classes.employeeInfoContainer}>
            <Avatar src={rec.imageSrc} alt={rec.operatorName} />
            <div className={classes.nameRatingContainer}>
              <Typography className={classes.employeeName}>
                {rec.operatorName}
              </Typography>
              <Tooltip title={`Rating ${fixFloat(1, rec.stats?.rating)}`}>
                <div
                  className={classes.ratingBar}
                  style={{
                    backgroundColor: `${
                      rec.stats?.rating >= 8
                        ? "#1DE9B6"
                        : rec.stats?.rating >= 6
                        ? "#F2C203"
                        : "#F4542B"
                    }`,
                    width: `${
                      rec.stats?.rating * 10 < 100
                        ? rec.stats?.rating * 10
                        : 100
                    }%`,
                    alignSelf: "flex-start",
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </TableCell>
        <TableCell className={classes.time}>
          {formatAssessmentTime(rec.stats?.presentTime)}
        </TableCell>
      </TableRow>
    ));
    return list;
  };
  return (
    <div className={classes.root}>
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <Typography className={classes.cardTitile}>{title}</Typography>
        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableBody className={classes.dataContainer}>
            {renderDataRecords()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(DashboardAssessmentCard);
