import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./paginationStyle";

function Paggination({ totalRows, selectPage, classes, record, pages }) {
  // const [pages, setPages] = useState(1);
  const [rows, setRows] = useState(totalRows);
  //const [records, setRecords] = useState(5);
  useEffect(() => {
    setRows(totalRows);
  }, [totalRows]);
  const handlePages = (event, value) => {
    // console.log(value);
    selectPage(record, value);
  };
  const handNumberOfRecords = (event, page) => {
    // console.log(event.target.value);
    //setRecords(event.target.value);
    selectPage(event.target.value, page);
  };
  // console.log(record, "records");
  return (
    <div className={classes.paginationStyle}>
      <Pagination
        count={Math.ceil(Math.ceil(rows / record))}
        variant="outlined"
        color="primary"
        page={pages}
        onChange={handlePages}
      />
      <FormControl sx={{ minWidth: 120, marginLeft: "10px" }} size="small">
        <InputLabel id="demo-select-small">Records</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={record}
          label="Records"
          onChange={(event) => {
            handNumberOfRecords(event, 1);
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={200}>200</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default withStyles(styles)(Paggination);
