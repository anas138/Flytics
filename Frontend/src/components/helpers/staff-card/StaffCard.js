import React, { useState, useEffect } from "react";
import { MoreVertRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  loadOperatorImage,
  loadOperatorSummary,
} from "../../../store/operators/operators";
import ImageUpload from "./ImageUpload";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./StaffCardStyle";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toggleDialogue } from "../../../store/imageUpload/imageUpload";
import { formateTimeToLocal } from "../../../utils/HelperFunctions";

function RecordsTableCard(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.entities.operator.list);
  const loading = useSelector((state) => state.entities.operator.loading);
  const { classes } = props;
  const [openImage, setOpenImage] = useState(false);
  const [operatorId, setOperatorId] = useState();

  useEffect(() => {
    dispatch(loadOperatorSummary(0, 5));
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].imageSrc && data[i].imageId && !data[i].imageLoading)
          dispatch(loadOperatorImage(data[i]._id, data[i].imageId));
      }
    }
  }, [data]);

  const openImageDialog = (id) => {
    console.log(id, "iddddddd");
    setOperatorId(id);
    dispatch(toggleDialogue());
  };
  const Row = () => {
    const list =
      data && data.length
        ? data.map((d, index) => {
            return (
              <TableRow>
                <TableCell>{d.machineId}</TableCell>
                <TableCell>{d.operatorName}</TableCell>
                <TableCell>
                  {formateTimeToLocal(d.timeSlotStart)} - {formateTimeToLocal(d.timeSlotEnd)}
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    openImageDialog(d._id);
                  }}
                >
                  <Avatar alt="d.operatorName" src={d.imageSrc} />
                </TableCell>
              </TableRow>
            );
          })
        : null;
    return list;
  };
  console.log(data, "data");
  console.log(loading, "loading");

  return (
    <div className={classes.root}>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ImageUpload open={openImage} id={operatorId} />
      <div className={classes.tabStrip} />
      <div className={classes.cardTopRow}>
        <Typography className={classes.cardTitile}>Staff</Typography>
        <IconButton>
          <MoreVertRounded />
        </IconButton>
      </div>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableCell>Machine Id</TableCell>
            <TableCell>operator Name</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Image</TableCell>
          </TableHead>
          <TableBody>
            <Row />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(styles)(RecordsTableCard);
