const row = { display: "flex", justifyContent: "center", alignItems: "center" };
const listButton = {
  fontWeight: "bold",
  textTransform: "uppercase",
  borderLeft: "6px solid white",
  boxSizing: "border-box",
  "&.MuiListItemButton-root": {
    "&:hover": {
      color: "initial",
    },
  },
};
const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "4px",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      borderRadius: "4px",
      // backgroundColor:"#ECEFF4"
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#707070", //'rgba(0,0,0,.1)',
      outline: "1px solid #D7E0E7",
      borderRadius: "4px",
    },
  },

  drawer: {
    position: "relative",
    width: theme.drawer.width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    "& > .MuiDrawer-paper": {
      borderRight: "none",
      boxShadow: "rgba(33, 35, 38, 0.1) 10px 0px 10px -10px",
      backgroundColor: "#F5F5F5",
    },
  },
  logoContainer: {
    ...row,
    padding: "20px",
    width: "200px",
  },
  logoImage: {
    width: "100%",
  },
  selectedIcon: {
    color: "white",
  },
  listButton: {
    "&.MuiListItemButton-root": {
      ...listButton,
    },
  },
  selectedListButton: {
    "&.MuiListItemButton-root": {
      ...listButton,
      backgroundColor: "#0077FF",
      color: "white",
      borderLeft: "6px solid #1DE9B6",
    },
  },
  appVersion: {
    color: "#BFBFBF",
    position: "absolute",
    bottom: "1%",
    right: "2%",
  },
});

export default styles;
