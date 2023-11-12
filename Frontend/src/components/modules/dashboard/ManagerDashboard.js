import { Divider, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
// import { DashboardIcon } from "../../../resources/design-icons/drawer-icons";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import styles from "./AdminDashboardStyles";
import DateSelector from "../../helpers/date-selector/DateSelector";
import { format } from "date-fns";
import { KeyboardArrowDown } from "@mui/icons-material";
import { DashboardTopCard } from "../../helpers/dashboard-top-card";
// import { AttendanceIcon } from "./../../../resources/design-icons/dashboard-top-cards-icons";
import AttendanceIcon from "./../../../resources/design-images/dashboard-card-attendance.svg";
import PresenceIcon from "./../../../resources/design-images/dashboard-card-presence.svg";
import AttentionIcon from "./../../../resources/design-images/dashboard-card-attention.svg";
import DashboardAssessmentCard from "../../helpers/dashboard-assesment-card/DashboardAssessmentCard";
import HorizontalBarChartCard from "../../helpers/horizontal-bar-chart-card/HorizontalBarChartCard";
import RecordsTableCard from "../../helpers/records-table-card/RecordsTableCard";
import { DashboardEmployeeOverviewCard } from "../../helpers/dashboard-empolyee-overview-card";

function ManagerDashboard(props) {
  const { classes } = props;
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);

  const handleToDateChange = (e) => {
    setToDate(e);
  };
  const handleFromDateChange = (e) => {
    setFromDate(e);
  };
  return (
    <div className={classes.root}>
      <div className={classes.pageTopRow}>
        <div className={classes.pageInfo}>
          <DashboardIcon />
          <Typography>Dashboard</Typography>
        </div>
        <div className={classes.pageFilters}>
          <div className={classes.todayDateSelect}>
            <Typography>{format(new Date(), "dd MMM")} today</Typography>
            <KeyboardArrowDown />
          </div>
          <div className={classes.dateFilters}>
            <DateSelector
              title="To"
              value={toDate}
              onChange={handleToDateChange}
            />
            <DateSelector
              title="From"
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className={classes.reportSelect}>
            <Typography>Report</Typography>
            <KeyboardArrowDown />
          </div>
        </div>
      </div>
      <Divider />
      <div className={classes.cardsContainer}>
        <div className={classes.pageLeftCardsContainer}>
          <div className={classes.pageTopCardsContainer}>
            <div className={classes.card}>
              <DashboardTopCard
                title={"Attendance"}
                icon={AttendanceIcon}
                trend={96.77}
                timeSpan={"today"}
                isTrendUp={false}
                count={1185}
                totalCount={1200}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" /> */}
            <div className={classes.card}>
              <DashboardTopCard
                title={"Presence"}
                icon={PresenceIcon}
                trend={96.77}
                timeSpan={"today"}
                isTrendUp={true}
                count={1185}
                totalCount={1200}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" flexItem /> */}
            <div className={classes.card}>
              <DashboardTopCard
                title={"Attention"}
                icon={AttentionIcon}
                trend={96.77}
                timeSpan={"today"}
                isTrendUp={true}
                count={1185}
                totalCount={1200}
              />
              <Divider className={classes.divider} />
            </div>
            {/* <Divider orientation="vertical" /> */}
          </div>
          <div className={classes.recordsTableContainer}>
            <RecordsTableCard cardTitle={"Staff"} />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={classes.sideCardsContainer}>
          <DashboardEmployeeOverviewCard
            cardTitle={"Employees"}
            filterData={[{ value: "Nouman Ijaz", text: "Nouman Ijaz" }]}
            employee={
              {
                _id: "62873adbfb897eead2cf63f6",
                machineId: "machine1",
                clientId: "62861f36d90dc52a2e850b93",
                operatorName: "Rehan Alvi",
                timeSlotStart: "08:00",
                timeSlotEnd: "14:00",
                imageId: "a3268da4-5e8f-4580-88a4-3839299b4cea",
                assessmentTime: "15min",
                rating: 8.30,
                attentionPercentage: 73,
                presencePercentage: 58,
                attendancePercentage: 100,
                leadTags: ['Manager', 'Team-a', 'Team-b']
              }
            }
          />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(ManagerDashboard);
