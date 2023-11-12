const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const select = {
  paddingLeft: "8px",
  paddingRight: "8px",
  borderRadius: "4px",
  backgroundColor: "white",
  height: "38px",
  width: "auto",
  "&:hover": {
    cursor: "pointer",
  },
};

const styles = (theme) => ({
  root: {
    ...row,
    ...select,
    position: "relative",
  },
  placeholder: {
    color: "#707070",
  },
  options: {
    ...select,
    color: "black",
    position: "absolute",
    top: "110%",
    left: "0",
    width: "100%",
    height: "auto",
    maxHeight: "160px",
    overflowY: "auto",
  },
  hidden: { display: "none" },
});

export default styles;
