const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const attendancePill = {
  padding: "5px 15px",
  borderRadius: "25px",
  textTransform: "capitalize",
  fontWeight: "bold",
  color: "white",
  width: "fit-content",
};

const clickAble = {
  "&:hover": {
    cursor: "pointer",
  },
};

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "rgba(33, 35, 38, 0.1) 8px 10px 8px -8px",
    padding: "5px",
    height: "100%",
  },
  tabStrip: {
    width: "6px",
    maxWidth: "6px",
    height: "40px",
    backgroundColor: "#0077FF",
    position: "absolute",
    left: "0",
    top: "6%",
  },
  cardTopRow: {
    ...row,
    width: "100%",
  },
  cardTitile: {
    "&.MuiTypography-root": {
      padding: "5px",
      margin: "5px",
      fontSize: "larger",
    },
  },
  tableContainer: {
    height: "90%",
    padding: "2px",
    overflowY: "auto",
    width: "98%",
  },
  tableHead: {
    "& th": {
      borderBottom: "none",
      fontWeight: "bold",
      backgroundColor: "#F1F1F1",
    },
  },
  dataRow: {
    "& td": {
      borderBottom: "none",
    },
    "&:nth-of-type(odd)": {
      background: `linear-gradient(to right,rgba(157,157,157,0.025),rgba(70,70,70,0.025))`,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "white",
    },
  },
  presentPill: {
    ...attendancePill,
    backgroundColor: "#1DE9B6",
  },
  absentPill: {
    ...attendancePill,
    backgroundColor: "#F4542B",
  },
  notOnSeat: {
    color: "#BFBFBF",
  },
  clickAble: {
    ...clickAble,
  },
});

export default styles;
