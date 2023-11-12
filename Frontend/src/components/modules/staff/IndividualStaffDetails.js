import React, { useEffect } from "react";
import styles from "./IndividualStaffDetailsStyles";
import { withStyles } from "@mui/styles";
import { DashboardEmployeeOverviewCard } from "../../helpers/dashboard-empolyee-overview-card";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadStaffSummary } from "./../../../store/staff/staff";
import { drawerSelectionChanged } from "../../../store/ui/drawer";

function IndividualStaffDetails(props) {
  const { classes } = props;
  const params = useParams();

  const dispatch = useDispatch();
  const staff = useSelector((state) => state.entities.staff.list);
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
  useEffect(() => {
    dispatch(drawerSelectionChanged("staff"));
    if (staff.length === 0) dispatch(loadStaffSummary(getQueryParam()));
  }, []);
  const currentOperator = () => {
    const operator = staff.find((opt) => opt._id === params.operatorId);
    return operator;
  };
  const currentOpt = currentOperator();
  return (
    <div>
      <h1>Individual Staff Details</h1>
      {currentOpt ? (
        <div className={classes.employeeOverviewCard}>
          <DashboardEmployeeOverviewCard
            cardTitle={currentOpt.operatorName}
            filterData={[
              {
                value: currentOpt._id,
                text: currentOpt.operatorName,
              },
            ]}
            employee={currentOpt}
          />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default withStyles(styles)(IndividualStaffDetails);
