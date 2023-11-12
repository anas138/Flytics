const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const column = {
  ...row,
  flexDirection: "column",
};

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "rgba(33, 35, 38, 0.1) 8px 10px 8px -8px",
    padding: "5px",
    height: "98%",
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
    margin: "6% auto",
  },
  cardTitile: {
    "&.MuiTypography-root": {
      padding: "5px",
      margin: "5px",
      fontSize: "larger",
    },
  },
  tableContainer: {
    // "&.MuiTableContainer-root": {
    //   maxHeight: "90%",
    //   padding: "0",
    //   // maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 6}px)`,
    //   overflowY: "auto",
    // },
    maxHeight: "80%",
    padding: "0",
    // maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 6}px)`,
    overflowY: "auto",
    overflowX: "hidden !important",
  },
  dataContainer: {
    width: "100%",
  },
  dataRow: {
    border: "none",
    width: "100%",
    "&:nth-of-type(odd)": {
      background: `linear-gradient(to right,rgba(157,157,157,0.025),rgba(70,70,70,0.025))`,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "white",
    },
    "& td": {
      borderBottom: "none",
    },
  },
  employeeInfoContainer: {
    ...row,
    justifyContent: "flex-start",
    "& *": {
      margin: "auto 4px",
    },
  },
  nameRatingContainer: {
    position: "relative",
    width: "100%",
  },
  employeeName: {
    "&.MuiTypography-root": {
      padding: "2px",
      margin: "2px",
      color: "#0077FF",
      fontWeight: "bold",
      whiteSpace: "nowrap",
    },
  },
  ratingBar: {
    "&:hover": {
      cursor: "pointer",
    },
    position: "absolute",
    bottom: "0",
    left: "0",
    borderRadius: "4px",
    height: "3px",
  },
  time: {
    whiteSpace: "nowrap !important",
  },
});

export default styles;
