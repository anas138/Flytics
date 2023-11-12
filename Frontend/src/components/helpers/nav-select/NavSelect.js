import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import styles from "./NavSelectStyles";

function NavSelect(props) {
  const { classes } = props;
  const { placeholder, options, value, handleOptionChange } = props;
  const [open, setOpen] = useState(false);

  const renderOptions = () => {
    const list = options.map((opt, idx) => (
      <option key={idx} value={opt.value} onClick={handleOptionChange}>
        {opt.text}
      </option>
    ));
    return list;
  };
  const getText = () => {
    if (value === null) return "All Departments";
    const obj = options.find((opt) => opt?.value === value);
    return obj?.text;
  };
  return (
    <>
      <div
        className={`${classes.root} ${
          !value && placeholder ? classes.placeholder : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <Typography>
          { value ? getText() : "All Departments"}
        </Typography>
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        <div>
          <div className={`${classes.options} ${open ? "" : classes.hidden}`}>
            {renderOptions()}
          </div>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(NavSelect);
