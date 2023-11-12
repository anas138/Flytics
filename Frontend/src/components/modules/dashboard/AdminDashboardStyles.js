const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const column = {
  ...row,
  flexDirection: "column",
};

const selectBox = {
  color: "#707070",
  border: "1px solid #EEE",
  height: "38px",
  borderRadius: "4px",
  padding: "0 5px",
  "&:hover": {
    cursor: "pointer",
  },
};

const styles = (theme) => ({
  root: {
    width: "98%",
    height: "99%",
    margin: "auto",
  },
  pageTopRow: {
    ...row,
    width: "100%",
    margin: "5px auto",
  },
  pageInfo: {
    ...row,
    color: "#707070",
    "& *": {
      margin: "auto 5px",
    },
  },
  pageFilters: {
    ...row,
    // width: "60%",
  },
  dateFilters: {
    ...row,
    "& *": {
      margin: "auto 5px",
    },
  },
  todayDateSelect: {
    ...row,
    ...selectBox,
    margin: "auto 5px",
  },
  reportSelect: {
    ...row,
    ...selectBox,
    margin: "auto 5px",
    position: "relative",
  },
  options: {
    ...selectBox,
    color: "black",
    position: "absolute",
    top: "110%",
    left: "0",
    width: "100%",
    height: "auto",
    maxHeight: "160px",
    overflowY: "auto",
    zIndex: "4",
    backgroundColor: "white",
  },
  hidden: { display: "none" },
  cardsContainer: {
    ...row,
    alignItems: "flex-start",
    height: "95%",
  },
  pageLeftCardsContainer: {
    ...column,
    width: "74%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "5px",
    height: "100%",
  },
  pageTopCardsContainer: {
    ...row,
    width: "100%",
    height: "19%",
  },
  card: {
    width: "32%",
    margin: "0.5%",
    position: "relative",
    zIndex: 0,
  },
  divider: {
    margin: "8px auto !important",
  },
  recordsTableContainer: {
    width: "100%",
    height: "79%",
    position: "relative",
    zIndex: 0,
  },
  Backdrop: {
    "&.MuiBackdrop-root": {
      position: "absolute",
      zIndex: 3,
      borderRadius: "4px",
      backgroundColor: "transparent",
    },
  },
  sideCardsContainer: {
    width: "24%",
    height: "100%",
    [theme.breakpoints.down(1366)]: {
      // height: "fit-content",
      overflowY: "auto",
    },
  },
  assesmentCardContainer: {
    height: "59%",
    padding: "5px",
    position: "relative",
    zIndex: 0,
  },
  barChartContainer: {
    height: "39%",
    padding: "5px",
    position: "relative",
    zIndex: 0,
  },
});

export default styles;
