import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import styles from "./DateSelectorStyles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { CalenderIcon } from "./../../../resources/design-icons/dashboard-icons";
import { TextField, Typography } from "@mui/material";

function DateSelector(props) {
  const { classes } = props;
  const { title, value, onChange, disableFrom } = props;

  const [isOpen, setIsOpen] = useState(false);

  const disableDates = (date) => {
    if (disableFrom) {
      return disableFrom > date?.toISOString()?.split("T")[0];
    } else return false;
  };

  const handleClick = () => {};
  return (
    <div>
      <DatePicker
        className={classes.dateSelector}
        label={title}
        value={value}
        onChange={onChange}
        shouldDisableDate={disableDates}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            className={classes.dateSelector}
          />
        )}
      />
      {/* <fieldset className={classes.inputField} onClick={handleClick}>
        <Typography>{value}</Typography>
        <CalenderIcon className={classes.icon} />
        <legend>{title}</legend>
      </fieldset> */}
    </div>
  );
}

export default withStyles(styles)(DateSelector);
