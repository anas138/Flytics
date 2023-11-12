const diableColor = "#D7E0E7";
const styles = (theme) => ({
  csvForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "2px solid black",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  dialogBox: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  browseFileContainer: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    borderRadius: "5px",
    margin: "10px",
  },
  importButton: {
    " &.MuiButton-root": {
      margin: "10px",
    },
  },
  browseFiles: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "#1565c0",
    margin: "10px",
  },
  disableBrowseFile: {
    textDecoration: "underline",
    cursor: "pointer",
    color: diableColor,
    margin: "10px",
  },
  setheading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeIcon: {
    "&.MuiSvgIcon-root": {
      position: "absolute",
      top: "0",
      right: "0",
      cursor: "pointer",
      color: "red",
    },
  },
  disableButton: {
    "&.MuiSvgIcon-root": {
      color: diableColor,
      position: "absolute",
      top: "0",
      right: "0",
      cursor: "pointer",
    },
  },
  errorDiv: { marginLeft: "20px", color: "red" },
});
export default styles;
