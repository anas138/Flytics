const styles = (theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  paperForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    width: "50%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60% !important",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    height: "80%",
  },
  formTitle: {
    fontWeight: "bold",
    marginLeft: "2%",
    marginBottom: "2%",
  },
  logoContainer: {
    width: "200px",
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  form: {
    width: "80%",
    height: "60%",
    margin: "auto",
  },
  fromBottomWraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submit: {
    "&.MuiButton-root": {
      color: "white !important",
      backgroundColor: "#0077FF !important",
      whiteSpace: "nowrap",
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(8),
      borderRadius: "5px",
      paddingRight: "20px",
      paddingLeft: "20px",
      "&:hover": {
        color: "#0077FF !important",
        backgroundColor: "white !important",
      },
    },
  },
  version: {
    position: "absolute",
    right: "1%",
    bottom: "0",
    fontWeight: "bold",
    fontSize: "small",
    color: "#BFBFBF",
  },
  sideImage: {
    backgroundImage: `url("faceImage.jpg")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
