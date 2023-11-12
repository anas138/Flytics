import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import {
  TrendArrowDownIcon,
  TrendArrowUpIcon,
} from "../../../resources/design-icons/dashboard-top-cards-icons";
import { fixFloat } from "../../../utils/HelperFunctions";
import styles from "./DashboardTopCardStyles";

function DashboardTopCard(props) {
  const { classes } = props;
  const { title, icon, trend, timeSpan, isTrendUp, count, totalCount } = props;
  return (
    <div className={classes.root}>
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <div className={classes.cardTitleContainer}>
          <Typography className={classes.cardTitle}>{title}</Typography>
          <div className={classes.trendContainer}>
            <div className={trend > 50 ? classes.trendUp : classes.trendDown}>
              {fixFloat(1, trend)} %
            </div>
            <div>{timeSpan}</div>
            {trend > 50 ? <TrendArrowUpIcon /> : <TrendArrowDownIcon />}
          </div>
        </div>
        <div>
          <img src={icon} />
        </div>
      </div>
      <div className={classes.countContainer}>
        <div />
        <Typography className={classes.count}>
          {count}/{totalCount}
        </Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(DashboardTopCard);
