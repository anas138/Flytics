import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVertRounded,
} from "@mui/icons-material";
import { IconButton, Typography, Avatar, Divider } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  fixFloat,
  formatAssessmentTime,
  formateTimeToLocal,
  trimId,
} from "../../../utils/HelperFunctions";
import ContactInfoCard from "../contact-info-card/ContactInfoCard";
import RatingCard from "../rating-card/RatingCard";
import StatsCard from "../stats-card/StatsCard";
import styles from "./DashboardEmployeeOverviewCardStyles";

function DashboardEmployeeOverviewCard(props) {
  const { classes } = props;
  const { cardTitle, filterData, employee } = props;

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    filterData ? filterData[0].value : ""
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const renderOptions = () => {
    const list = filterData?.map((opt, idx) => (
      <option key={idx} value={opt.value} onClick={handleOptionChange}>
        {opt.text}
      </option>
    ));
    return list;
  };

  const getAttendanceStatus = () => {
    if (!employee.attendancePercentage > 0) return "Absent";
    if (employee.stats?.isSlotStarted) {
      if (!employee.stats?.isSlotEnded) {
        return employee.isNotOnSeat ? "Away" : "Online";
      } else {
        return "Shift Ended";
      }
    } else return "Shift not started yet";
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
      <div className={classes.cardDataContainer}>
        <div
          className={classes.cardFilterDataSelect}
          onClick={() => setOpen(!open)}
        >
          <Typography>{selectedOption}</Typography>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          <div
            className={`${classes.selectOptions} ${open ? "" : classes.hidden}`}
          >
            {renderOptions()}
          </div>
        </div>
      </div>
      <div className={classes.employeeInfoContainer}>
        <div className={classes.infoCardTopRow}>
          <Avatar src={employee.imageId} alt={employee.operatorName} />
          <div className={classes.infoRow}>
            <div className={classes.infoColumn}>
              <Typography className={classes.infoHeading}>
                Designation
              </Typography>
              <Typography className={classes.infoText}>
                {employee.operatorName}
              </Typography>
            </div>
            <div className={classes.infoColumn}>
              <Typography className={classes.infoHeading}>ID</Typography>
              <Typography className={classes.infoText}>
                {trimId(employee._id)}
              </Typography>
            </div>
          </div>
        </div>
        <Divider flexItem />
        <div className={classes.ratingCardContainer}>
          <RatingCard rating={fixFloat(0, employee.stats?.rating)} />
        </div>
        <div className={classes.statsContainer}>
          <StatsCard
            statTitle={"Attendance"}
            statValue={fixFloat(1, employee.stats?.attendancePercentage) + " %"}
            statInfo={getAttendanceStatus()}
          />
          <StatsCard
            statTitle={"Presence"}
            statValue={fixFloat(1, employee.stats?.presencePercentage) + " %"}
            statInfo={formatAssessmentTime(employee.stats?.presentTime)}
          />
          <StatsCard
            statTitle={"Attention"}
            statValue={fixFloat(1, employee.stats?.attentionPercentage) + " %"}
            statInfo={formatAssessmentTime(employee.stats?.attentionTime)}
          />
        </div>
      </div>
      <div>
        <ContactInfoCard
          contactNo={employee.contactNo || "Not Provided"}
          email={employee.email || "Not provided"}
          timeSlotStart={formateTimeToLocal(employee.timeSlotStart)}
          timeSlotEnd={formateTimeToLocal(employee.timeSlotEnd)}
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(DashboardEmployeeOverviewCard);
