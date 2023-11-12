import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/styles";
import styles from "./uploadsStyles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { postCSV } from "../../../store/operators/operators";
import ClearIcon from "@mui/icons-material/Clear";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  operatorsRemoveMessage,
  invalidMessage,
} from "../../../store/operators/operators";
import { toggleDialogue } from "../../../store/operators/operators";

function CsvCard(props) {
  const invalidRow = useSelector((state) => state.entities.operator.invalidRow);
  const loading = useSelector((state) => state.entities.operator.loading);
  const error = useSelector((state) => state.entities.operator.error);
  const errorMessage = useSelector(
    (state) => state.entities.operator.errorMessage
  );
  const { classes } = props;
  const { onClose } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const handleCsvFile = (e) => {
    dispatch(operatorsRemoveMessage());
    setFile();
    setFileName();
    if (e.target.files[0].type === "text/csv") {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      dispatch(invalidMessage());
    }
  };
  const browseFile = () => {
    if (!loading) {
      inputRef.current.click();
    }
  };
  const importFiles = () => {
    if (!loading) {
      const fileData = new FormData();
      fileData.append("file", file);
      dispatch(postCSV(fileData));
    }
  };
  useEffect(() => {
    return () => {
      dispatch(operatorsRemoveMessage());
    };
  }, []);
  return (
    <Dialog open={true}>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.dialogBox}>
        <div className={classes.setheading}>
          <DialogTitle>Import CSV</DialogTitle>
          <ClearIcon
            className={!loading ? classes.closeIcon : classes.disableButton}
            onClick={() => {
              if (!loading) {
                dispatch(toggleDialogue());
              }
            }}
          />
        </div>
        <br />
        {invalidRow !== -1 || errorMessage ? (
          <div className={classes.errorDiv}>
            {errorMessage}
            <br />
            {invalidRow !== -1 ? (
              <span>
                Invalid data at row : <span>{invalidRow}</span>
              </span>
            ) : null}
          </div>
        ) : null}

        <input
          type="file"
          hidden
          ref={inputRef}
          onChange={handleCsvFile}
        ></input>
        <p className={classes.browseFileContainer}>
          <span>{fileName ? fileName : null}</span>
          <br />
          <div
            onClick={browseFile}
            onclick={(event) => {
              event.preventDefault();
            }}
            className={
              !loading ? classes.browseFiles : classes.disableBrowseFile
            }
          >
            Browse file
          </div>
        </p>
        {!loading && file ? (
          <Button
            variant="contained"
            onClick={importFiles}
            className={classes.importButton}
          >
            Import
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={true}
            className={classes.importButton}
          >
            Import
          </Button>
        )}
      </div>
    </Dialog>
  );
}

export default withStyles(styles)(CsvCard);
