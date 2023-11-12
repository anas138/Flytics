import { IconButton, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import {
  BarChart,
  BarSeries,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickSeries,
} from "reaviz";
import * as chroma from "chroma.ts";
import styles from "./HorizontalBarChartCardStyles";
import { MoreVertRounded } from "@mui/icons-material";
import { fixFloat } from "../../../utils/HelperFunctions";

function HorizontalBarChartCard(props) {
  const { classes } = props;
  const { cardTitle, chartData } = props;
  const formatChartData = () => {
    const sortedData = [...chartData];
    sortedData.sort(function (a, b) {
      return a.stats?.attentionPercentage - b.stats?.attentionPercentage;
    });
    const list = sortedData.map((rec) => ({
      key: rec.operatorName.split(" ")[0],
      data: fixFloat(1, rec.stats?.attentionPercentage),
    }));
    return list;
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
      <div className={classes.chartContainer}>
        <BarChart
          // height={230}
          // width={350}
          //   data={[
          //     { key: "Team E", data: 70 },
          //     { key: "Team D", data: 87 },
          //     { key: "Team C", data: 66 },
          //     { key: "Team B", data: 49 },
          //     { key: "Team A", data: 89 },
          //   ]}
          data={formatChartData()}
          xAxis={<LinearXAxis type="value" />}
          yAxis={
            <LinearYAxis
              type="category"
              tickSeries={<LinearYAxisTickSeries tickSize={5} />}
            />
          }
          series={
            <BarSeries
              type="standard"
              layout="horizontal"
              padding={0.5}
              colorScheme={chroma
                .scale(["#F4542B", "#F2C203", "#1DE9B6"])
                .mode("lab")
                .colors(5)}
            />
          }
        />
      </div>
    </div>
  );
}

export default withStyles(styles)(HorizontalBarChartCard);
