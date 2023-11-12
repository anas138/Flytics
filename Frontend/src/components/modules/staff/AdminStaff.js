import React, { useEffect, useState } from "react";
import StaffCard from "../../helpers/staff-card/StaffCard";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/styles";
import styles from "./AdminStaffStyle";
import CsvCard from "../../helpers/staff-card/CsvCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { toggleDialogue } from "../../../store/operators/operators";
import Pagination from "../../helpers/paggination/Paggination";
import { loadOperatorSummary } from "../../../store/operators/operators";
const buttonStyle = {
  margin: "10px",
};

function AdminStaff(props) {
  const openCsv = useSelector((state) => state.entities.operator.openDialogue);
  const totalRecords = useSelector((state) => state.entities.operator.count);
  const [records, setRecords] = useState();
  const [record, setRecord] = useState(5);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate();
  const { classes } = props;
  // const [openCsv, setOpenCsv] = useState(false);
  const openCsvDialogBox = () => {
    dispatch(toggleDialogue());
  };
  const dispatch = useDispatch();
  const alertRoute = () => {
    navigate("/admin/alerts");
  };
  useEffect(() => {
    dispatch(drawerSelectionChanged("staff"));
    setRecords(totalRecords);
  }, []);
  const handlePage = (records, page) => {
    const p = +page - 1;
    dispatch(loadOperatorSummary(p, records));
    setRecord(records);
    setPages(page);
  };
  console.log(totalRecords, "tttt");
  return (
    <div>
      {openCsv ? <CsvCard /> : null}
      <div className={classes.buttonContainer}>
        <div className={classes.flexClass}>
          <Button variant="contained" sx={buttonStyle} onClick={alertRoute}>
            Alerts
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            className={classes.button}
            sx={buttonStyle}
            onClick={openCsvDialogBox}
          >
            Import CSV
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            sx={buttonStyle}
          >
            Add Operator
          </Button>
        </div>
      </div>
      <StaffCard />
      <Pagination
        totalRows={totalRecords}
        selectPage={(records, page) => {
          handlePage(records, page);
        }}
        record={record}
        pages={pages}
      />
    </div>
  );
}

export default withStyles(styles)(AdminStaff);
