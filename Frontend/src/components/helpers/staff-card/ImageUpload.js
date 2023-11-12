import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { withStyles } from "@mui/styles";
import styles from "./uploadsStyles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  toggleDialogue,
  imageRemoveMessage,
} from "../../../store/imageUpload/imageUpload";
import {
  patchtImage,
  invalidImageFile,
} from "../../../store/imageUpload/imageUpload";

function ImageCard(props) {
  const loading = useSelector((state) => state.entities.image.loading);
  const errorMessage = useSelector(
    (state) => state.entities.image.errorMessage
  );
  const toggle = useSelector((state) => state.entities.image.openDialogue);
  const { classes } = props;
  const { id } = props;

  const dispatch = useDispatch();
  const inputRef = useRef();
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const handleCsvFile = (e) => {
    dispatch(imageRemoveMessage());
    setFile();
    setFileName();
    if (e.target.files[0].type === "image/jpeg") {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      dispatch(invalidImageFile());
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
      fileData.append("image", file);
      dispatch(patchtImage(id, fileData));
    }
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Dialog open={toggle}>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.dialogBox}>
        <div className={classes.setheading}>
          <DialogTitle>Upload Image</DialogTitle>
          <ClearIcon
            className={!loading ? classes.closeIcon : classes.disableButton}
            onClick={() => {
              if (!loading) {
                dispatch(toggleDialogue());
                dispatch(imageRemoveMessage());
                setFile();
                setFileName();
              }
            }}
          />
        </div>
        <br />
        <div className={classes.errorDiv}>{errorMessage}</div>
        {file ? (
          <img alt="img" src={file ? `${URL.createObjectURL(file)}` : ""} />
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
            Browse Image
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
            Update
          </Button>
        )}
      </div>
    </Dialog>
  );
}

export default withStyles(styles)(ImageCard);
