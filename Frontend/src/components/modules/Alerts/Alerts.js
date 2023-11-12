import React, { useEffect, useState } from "react";
import AlertCard from "../../helpers/alerts-card/AlertCard";
import { useDispatch, useSelector } from "react-redux";
import { loadAlertSummary } from "../../../store/alerts/alerts";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Pagination from "../../helpers/paggination/Paggination";

function Alerts() {
  const navigate = useNavigate();
  const alerts = useSelector((state) => state.entities.alert.list);
  const loading = useSelector((state) => state.entities.alert.loading);
  const totalRecord = useSelector((state) => state.entities.alert.totalCount);
  const [record, setRecord] = useState(5);
  const [pages, setPages] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (alerts.length === 0) dispatch(loadAlertSummary(0, record));
  }, []);

  const handlePage = (records, page) => {
    const p = +page - 1;
    dispatch(loadAlertSummary(p, records));
    setRecord(records);
    setPages(page);
  };
  return (
    <div>
      {!loading ? (
        <div>
          <AlertCard data={alerts.length ? alerts : null} />
          <Pagination
            totalRows={totalRecord}
            selectPage={(records, page) => {
              handlePage(records, page);
            }}
            record={record}
            pages={pages}
          />
        </div>
      ) : (
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Alerts;
