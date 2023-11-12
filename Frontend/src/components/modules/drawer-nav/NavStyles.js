const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const colorsArray = [
  "#F2C203",
  "#1DE9B6",
  "#F4542B",
  "#2F6BD",
  "#911AE9",
  "#0077FF",
];

const randomizeColor = () => {
  const rand = Math.floor(Math.random() * colorsArray.length);
  return colorsArray[rand];
};

const styles = (theme) => ({
  nav: {
    width: `calc(100vw - ${theme.drawer.width}px)`,
  },
  appBar: {
    "&.MuiAppBar-root": {
      width: `calc(100vw - ${theme.drawer.width}px + 8px)`,
      height: 80,
    },
  },
  toolBar: {
    // position: "fixed",
    zIndex: `${theme.zIndex.drawer + 3} !important`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    color: "black",
    height: "100%",
  },
  welcomeDiv: {
    ...row,
  },
  welcomeText: {
    "&.MuiTypography-root": {
      color: "#161616",
      padding: "2px",
      margin: "auto 5px",
      //   fontSize:'large'
    },
  },
  navWidgets: {
    ...row,
  },

  inputRoot: {
    color: "inherit",
    width: "20%",
    backgroundColor: "white",
    borderRadius: "4px",
    height: "38px",
    padding: "5px",
    minWidth: "160px",
  },
  inputInput: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    width: "100%",
  },
  iconWidgetsContainer: {
    ...row,
    "& *": {
      margin: "auto 5px",
    },
  },
  widgetIconBUtton: {
    width: "40px",
    height: "40px",
    backgroundColor: "#0077FF",
    borderRadius: "50%",
    ...row,
    justifyContent: "center",
    color: "white",
  },
  navProfileWidget: {
    ...row,
    "& *": {
      margin: "auto 5px",
    },
  },
  userInfoContainer: {
    ...row,
    "&:hover": {
      cursor: "pointer",
    },
  },
  avatar: {
    "&.MuiAvatar-root": {
      backgroundColor: randomizeColor(),
      width: "40px",
      height: "40px",
    },
  },
  username: {
    "&.MuiTypography-root": {
      margin: "0",
      padding: "0",
      color: "#0077FF",
      fontWeight: "bold",
    },
  },
  userRole: {
    "&.MuiTypography-root": {
      margin: "0",
      padding: "0",
      color: "#161616",
      // fontWeight: "bold",
    },
  },
  buttonHover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  notificationMenu: {
    marginTop: "0.2%",
  },
  badge: {
    "& .MuiBadge-badge": {
      right: -2,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  },
});

export default styles;
