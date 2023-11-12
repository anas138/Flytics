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
import React, { useEffect } from "react";
import {
  fixFloat,
  formatTimeToHumanFriendly,
  getStaffImage,
  trimId,
} from "../../../utils/HelperFunctions";
import { StaffTableData } from "../../../utils/SampleData";
import PercentageCell from "../percentage-cell/PercentageCell";
import RatingPill from "../rating-pill/RatingPill";
import styles from "./RecordsTableStyles";
import { useSelector, useDispatch } from "react-redux";
import { loadStaffImage } from "../../../store/staff/staff";
import { useNavigate, useLocation } from "react-router-dom";

function RecordsTableCard(props) {
  const { classes } = props;
  const { cardTitle, tableData } = props;
  const data = tableData;

  const quickFilter = useSelector(
    (state) => state.ui.filters.dashboardFilters.quickFilter
  );
  const dateFrom = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateFrom
  );
  const dateTo = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateTo
  );

  const navigate = useNavigate();
  const routerParams = useLocation();

  const navigateToDetails = (staffId) => () => {
    navigate(`/${routerParams.pathname.split("/")[1]}/staff/${staffId}`);
  };

  const isFilterForOneDay = () => {
    if (quickFilter === "d") return true;
    else if (dateFrom && dateTo && dateFrom == dateTo) return true;
    return false;
  };

  const renderDataRows = () => {
    if (!tableData || !tableData.length)
      return (
        <TableRow className={classes.dataRow}>
          <TableCell colSpan={7}>No Data to Show</TableCell>
        </TableRow>
      );
    else {
      const sortedData = [...tableData];
      sortedData.sort(function (a, b) {
        return b.stats?.rating - a.stats?.rating;
      });
      const list = sortedData?.map((rec) => (
        <TableRow className={classes.dataRow} key={rec._id}>
          <TableCell>
            {rec.stats?.lastUpdated
              ? formatTimeToHumanFriendly(rec.stats?.lastUpdated)
              : "N/A"}
          </TableCell>
          <TableCell>
            <Avatar src={rec.imageSrc} alt={rec.operatorName} />
          </TableCell>
          <TableCell onClick={navigateToDetails(rec._id)}>
            <div>
              <Typography className={classes.clickAble}>
                {rec.operatorName}
              </Typography>
              <Typography>{rec.leadTags?.map((tag) => tag + ", ")}</Typography>
            </div>
          </TableCell>
          <TableCell>
            {isFilterForOneDay() ? (
              <div
                className={
                  rec.stats?.attendancePercentage > 0
                    ? classes.presentPill
                    : classes.absentPill
                }
              >
                {rec.stats?.attendancePercentage > 0 ? "Present" : "Absent"}
              </div>
            ) : (
              <PercentageCell
                percentage={fixFloat(0, rec.stats?.attendancePercentage)}
              />
            )}
            {rec.isNotOnSeat ? (
              <div className={classes.notOnSeat}>Not on Seat</div>
            ) : (
              <></>
            )}
          </TableCell>
          <TableCell>
            <PercentageCell
              percentage={fixFloat(0, rec.stats?.presencePercentage)}
            />
          </TableCell>
          <TableCell>
            <PercentageCell
              percentage={fixFloat(0, rec.stats?.attentionPercentage)}
            />
          </TableCell>
          <TableCell align="center">
            <RatingPill rating={fixFloat(0, rec.stats?.rating)} />
          </TableCell>
        </TableRow>
      ));
      return list;
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <Typography className={classes.cardTitile}>{cardTitle}</Typography>
        <IconButton>
          <MoreVertRounded />
        </IconButton>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableCell>Last Updated</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Presence</TableCell>
            <TableCell>Attention</TableCell>
            <TableCell align="center">Rating</TableCell>
          </TableHead>
          <TableBody>{renderDataRows()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(RecordsTableCard);
