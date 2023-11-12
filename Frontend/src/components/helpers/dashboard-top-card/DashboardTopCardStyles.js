const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const column = {
  ...row,
  flexDirection: "column",
};
const trendPill = {
  color: "white",
  borderRadius: "20px",
  paddingLeft: "8px",
  paddingRight: "8px",
  height: "fit-content",
  minWidth: "fit-content",
  marginLeft: "5px",
};

const styles = (theme) => ({
  root: {
    position: "relative",
    boxShadow: "rgba(33, 35, 38, 0.1) 8px 10px 8px -8px",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "5px",
    ...column,
    // width: "100%",
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
    width: "100% !important",
  },
  cardTitleContainer: {
    ...column,
    width: "80%",
    alignItems: "flex-start",
  },
  cardTitle: {
    "&.MuiTypography-root": {
      margin: "5px 0",
      padding: "5px",
      textTransform: "uppercase",
    },
  },
  trendContainer: {
    ...row,
    paddingLeft: "5px",
    margin: "5px",
    "& *": {
      margin: "auto 2px",
    },
  },
  trendUp: {
    ...trendPill,
    backgroundColor: "#1DE9B6",
  },
  trendDown: {
    ...trendPill,
    backgroundColor: "#F4542B",
  },
  countContainer: {
    ...row,
    width: "100% !important",
    backgroundImage: `linear-gradient(to left,rgba(0,119,225),white )`,
    color: "white",
  },
  count: {
    "&.MuiTypography-root": {
      padding: "5px",
    },
  },
});

export default styles;
