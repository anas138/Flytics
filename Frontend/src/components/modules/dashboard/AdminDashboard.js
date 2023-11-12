import {
  Backdrop,
  CircularProgress,
  Divider,
  List,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
// import { DashboardIcon } from "../../../resources/design-icons/drawer-icons";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import styles from "./AdminDashboardStyles";
import DateSelector from "../../helpers/date-selector/DateSelector";
import { format } from "date-fns";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DashboardTopCard } from "../../helpers/dashboard-top-card";
// import { AttendanceIcon } from "./../../../resources/design-icons/dashboard-top-cards-icons";
import AttendanceIcon from "./../../../resources/design-images/dashboard-card-attendance.svg";
import PresenceIcon from "./../../../resources/design-images/dashboard-card-presence.svg";
import AttentionIcon from "./../../../resources/design-images/dashboard-card-attention.svg";
import DashboardAssessmentCard from "../../helpers/dashboard-assesment-card/DashboardAssessmentCard";
import HorizontalBarChartCard from "../../helpers/horizontal-bar-chart-card/HorizontalBarChartCard";
import RecordsTableCard from "../../helpers/records-table-card/RecordsTableCard";
import { useDispatch, useSelector } from "react-redux";
import { downloadStaffSummaryReport, loadStaffImage, loadStaffSummary } from "./../../../store/staff/staff";
import TimerComponent from "../../helpers/timer/TimerComponent";
import {
  dateFromChanged,
  dateToChanged,
  quickFilterChanged,
} from "../../../store/ui/filters/filters";
import { addDays } from "date-fns";
import { drawerSelectionChanged } from "../../../store/ui/drawer";

function AdminDashboard(props) {
  const { classes } = props;
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const [reportsOptionOpen, setReportsOptionOpen] = useState(false);

  const openMenu = (e) => {
    setMenuAnchor(e.currentTarget);
  };

  const handleFilterChange = (val) => () => {
    setToDate(null);
    setFromDate(null);
    dispatch(quickFilterChanged({ quickFilter: val }));
    setMenuAnchor(null);
    dispatch(loadStaffSummary({ quickFilter: val, dateFrom, dateTo }));
    setTimeRemaining(30);
  };

  const dispatch = useDispatch();
  const staff = useSelector((state) => state.entities.staff.list);
  const staffOverAllStats = useSelector(
    (state) => state.entities.staff.overAllStats
  );
  const staffLoading = useSelector((state) => state.entities.staff.loading);
  const staffErr = useSelector((state) => state.entities.staff.error);
  const staffErrMsg = useSelector((state) => state.entities.staff.errorMessage);

  const quickFilter = useSelector(
    (state) => state.ui.filters.dashboardFilters.quickFilter
  );
  const dateFrom = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateFrom
  );
  const dateTo = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateTo
  );

  const department = useSelector(
    (state) => state.ui.filters.navFilters.department
  );

  const getQueryParam = () => {
    return {
      quickFilter,
      dateFrom,
      dateTo,
      department,
    };
  };

  const getSelectedFilter = () => {
    switch (quickFilter) {
      case "d": {
        return `${format(new Date(), "dd MMM")} today`;
      }
      case "w": {
        return `Past Week`;
      }
      case "m": {
        return `Past Month`;
      }
    }
  };

  // const reloadStaffData = () => {
  //   dispatch(loadStaffSummary(getQueryParam()));
  // };

  const handleToDateChange = (e) => {
    const date = addDays(e, 1);
    setToDate(e);
    dispatch(dateToChanged({ dateTo: e.toISOString().split("T")[0] }));
  };
  const handleFromDateChange = (e) => {
    const date = addDays(e, 1);
    setFromDate(e);
    dispatch(dateFromChanged({ dateFrom: e.toISOString().split("T")[0] }));
  };

  useEffect(() => {
    dispatch(drawerSelectionChanged("dashboard"));
    if (staff.length === 0) dispatch(loadStaffSummary(getQueryParam()));
  }, []);
  useEffect(() => {
    if (dateTo && dateFrom) dispatch(loadStaffSummary(getQueryParam()));
  }, [dateTo]);

  useEffect(() => {
    dispatch(loadStaffSummary(getQueryParam()));
  }, [department]);

  useEffect(() => {
    if (staff.length !== 0) {
      for (let i = 0; i < staff.length; i++) {
        if (!staff[i].imageSrc && staff[i].imageId && !staff[i].imageLoading)
          dispatch(loadStaffImage(staff[i]._id, staff[i].imageId));
      }
    }
  }, [staff]);

  return (
    <div className={classes.root}>
      <div className={classes.pageTopRow}>
        <div className={classes.pageInfo}>
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </div>
        <div className={classes.pageFilters}>
          <div>
            {/* <TimerComponent
              getQueryParam={getQueryParam}
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
            /> */}
          </div>
          <div className={classes.todayDateSelect} onClick={openMenu}>
            <Typography>{getSelectedFilter()}</Typography>
            {Boolean(menuAnchor) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </div>
          <div className={classes.dateFilters}>
            <DateSelector
              title="To"
              value={toDate}
              disableFrom={fromDate?.toISOString()?.split("T")[0]}
              onChange={handleToDateChange}
            />
            <DateSelector
              title="From"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div
            className={classes.reportSelect}
            onClick={() => setReportsOptionOpen(!reportsOptionOpen)}
          >
            <Typography>Report</Typography>
            {reportsOptionOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            <div>
              <div
                className={`${classes.options} ${
                  reportsOptionOpen ? "" : classes.hidden
                }`}
              >
                <option
                  onClick={() => {
                    dispatch(downloadStaffSummaryReport(getQueryParam(),`Report_${new Date().toISOString()}.csv`))
                    setReportsOptionOpen(!reportsOptionOpen);
                  }}
                >
                  CSV
                </option>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.cardsContainer}>
        <div className={classes.pageLeftCardsContainer}>
          <div className={classes.pageTopCardsContainer}>
            <div className={classes.card}>
              <Backdrop className={classes.Backdrop} open={staffLoading}>
                <CircularProgress />
              </Backdrop>
              <DashboardTopCard
                title={"Attendance"}
                icon={AttendanceIcon}
                trend={staffOverAllStats?.attendancePercentage || 0}
                timeSpan={getSelectedFilter()}
                isTrendUp={false}
                count={staffOverAllStats?.presentCount || 0}
                totalCount={staffOverAllStats?.totalCount || 0}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" /> */}
            <div className={classes.card}>
              <Backdrop className={classes.Backdrop} open={staffLoading}>
                <CircularProgress />
              </Backdrop>
              <DashboardTopCard
                title={"Presence"}
                icon={PresenceIcon}
                trend={staffOverAllStats?.presencePercentage || 0}
                timeSpan={getSelectedFilter()}
                isTrendUp={true}
                count={staffOverAllStats?.presentCount || 0}
                totalCount={staffOverAllStats?.totalCount || 0}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" flexItem /> */}
            <div className={classes.card}>
              <Backdrop className={classes.Backdrop} open={staffLoading}>
                <CircularProgress />
              </Backdrop>
              <DashboardTopCard
                title={"Attention"}
                icon={AttentionIcon}
                trend={staffOverAllStats?.attentionPercentage || 0}
                timeSpan={getSelectedFilter()}
                isTrendUp={true}
                count={staffOverAllStats?.presentCount || 0}
                totalCount={staffOverAllStats?.totalCount || 0}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" /> */}
          </div>
          <div className={classes.recordsTableContainer}>
            <Backdrop className={classes.Backdrop} open={staffLoading}>
              <CircularProgress />
            </Backdrop>
            <RecordsTableCard
              cardTitle={"Staff"}
              tableData={staff.length > 0 ? staff : []}
            />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classes.sideCardsContainer}>
          <div className={classes.assesmentCardContainer}>
            <Backdrop className={classes.Backdrop} open={staffLoading}>
              <CircularProgress />
            </Backdrop>
            <DashboardAssessmentCard
              title={"Presence time"}
              tableData={staff.length > 0 ? staff : []}
            />
          </div>
          <div className={classes.barChartContainer}>
            <Backdrop className={classes.Backdrop} open={staffLoading}>
              <CircularProgress />
            </Backdrop>
            <HorizontalBarChartCard
              cardTitle={"Attention"}
              chartData={staff.length > 0 ? staff : []}
            />
          </div>
        </div>
      </div>
      <Menu
        anchorEl={menuAnchor}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <List>
          <MenuItem onClick={handleFilterChange("d")}>
            {format(new Date(), "dd MMM")} today (1 Day)
          </MenuItem>
          <MenuItem onClick={handleFilterChange("w")}>1 Week</MenuItem>
          <MenuItem onClick={handleFilterChange("m")}>1 Month</MenuItem>
        </List>
      </Menu>
    </div>
  );
}

export default withStyles(styles)(AdminDashboard);
