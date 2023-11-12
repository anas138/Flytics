import {
  AppBar,
  Avatar,
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import styles from "./NavStyles";
import {
  AltIcon,
  MessageBoxIcon,
  SettingAdjustIcon,
  BellIcon,
  SupportIcon,
} from "./../../../resources/design-icons/drawer-navbar-icons";
import SearchIcon from "@mui/icons-material/Search";
import { NavSelect } from "../../helpers/nav-select";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import {
  loadAlertSummary,
  markAlertAsRead,
} from "../../../store/alerts/alerts";
import AlertNotification from "../../helpers/alert-notification/AlertNotification";
import { loadDepartments } from "../../../store/departments/departments";
import { departmentChanged } from "../../../store/ui/filters/filters";

function DrawerNav(props) {
  const { classes } = props;
  const [department, setDepartment] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [alertMenuAnchor, setAlertMenuAnchor] = useState(null);
  const handleProfileClick = (e) => setMenuAnchor(e.currentTarget);
  const handleAlertsClick = (e) => setAlertMenuAnchor(e.currentTarget);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const alerts = useSelector((state) => state.entities.alert.list);
  const departments = useSelector((state) => state.entities.department.list);

  useEffect(() => {
    if (alerts.length === 0) dispatch(loadAlertSummary(0, 10));
    if (departments.length === 0) dispatch(loadDepartments());
  }, []);

  const markVisibleAlertAsRead = () => {
    const slicedAlerts = alerts.slice(0, 11);
    for (let i = 0; i < slicedAlerts.length; i++) {
      const alert = slicedAlerts[i];
      if (!alert.isViewed) dispatch(markAlertAsRead(alert._id));
    }
  };

  useEffect(() => {
    const element = document.getElementById("menu-card-alerts-tray");
    if (element) {
      const isListVisible = window.getComputedStyle(element).visibility;
      if (isListVisible === "visible") markVisibleAlertAsRead();
    }
  }, [alertMenuAnchor]);

  const getNonViewedAlertsCount = () => {
    return alerts.filter((alert) => !alert.isViewed).length;
  };

  const renderAlerts = () => {
    if (alerts.length === 0)
      return (
        <ListItem>
          <ListItemText primary="No Notifications yet" />
        </ListItem>
      );
    const list = alerts
      .slice(0, 10)
      .map((alert) => <AlertNotification key={alert._id} alert={alert} />);
    const seeMore = (
      <MenuItem
        onClick={() => {
          dispatch(drawerSelectionChanged("staff"));
          navigate(`/${location.pathname.split("/")[1]}/alerts`);
          setAlertMenuAnchor(null);
        }}
      >
        <ListItem>View More</ListItem>
      </MenuItem>
    );
    list.push(seeMore);
    return list;
  };

  const getDepartmentsListObjects = () => {
    const list = departments.map((dep) => ({
      value: dep._id,
      text: dep.departmentName + " Department",
    }));
    list.unshift({ value: "null", text: "All Departments" });
    return list;
  };

  const logUserOut = () => {
    navigate("/");
  };
  const goBack = () => {
    navigate(-1);
  };
  // console.log(location.pathname.split("/")[2], "location");
  return (
    <>
      <div className={classes.nav}>
        <AppBar className={classes.appBar} elevation={0}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.welcomeDiv}>
              {location.pathname.split("/")[2] !== "dashboard" ? (
                <IconButton onClick={goBack}>
                  <ArrowBackIosIcon />
                </IconButton>
              ) : null}

              <AltIcon />
              <Typography className={classes.welcomeText}>
                Welcome to People Metrics
              </Typography>
            </div>
            <div className={classes.navWidgets}>
              {/* <Select
                IconComponent={() => <KeyboardArrowDown />}
                className={classes.select}
              >
                <option>Sales Department</option>
              </Select> */}
              <NavSelect
                value={department}
                placeholder={"Sales Department"}
                options={getDepartmentsListObjects()}
                handleOptionChange={(e) => {
                  setDepartment(e.target.value);
                  dispatch(departmentChanged({ department: e.target.value }));
                }}
              />
              <Divider flexItem orientation="vertical" />
              <InputBase
                placeholder="Search here..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                startAdornment={
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment>
                    <SettingAdjustIcon />
                  </InputAdornment>
                }
              />
              <Divider orientation="vertical" flexItem />
              <div className={classes.iconWidgetsContainer}>
                <div className={classes.widgetIconBUtton}>
                  <MessageBoxIcon />
                </div>
                <Badge
                  color="error"
                  badgeContent={getNonViewedAlertsCount()}
                  // max={12}
                  overlap="circular"
                  className={classes.badge}
                >
                  <div
                    className={`${classes.widgetIconBUtton} ${classes.buttonHover}`}
                    onClick={handleAlertsClick}
                  >
                    {/* <BellIcon /> */}
                    <NotificationsNoneRoundedIcon />
                  </div>
                </Badge>
                <div className={classes.widgetIconBUtton}>
                  <SupportIcon />
                </div>
              </div>
              <Divider orientation="vertical" flexItem />
              <div
                className={classes.navProfileWidget}
                onClick={handleProfileClick}
              >
                <div className={classes.userInfoContainer}>
                  <Avatar src="sd" alt="Ahmed" className={classes.avatar} />
                  <div className={classes.userInfoText}>
                    <Typography className={classes.username}>Ahmed</Typography>
                    <Typography className={classes.userRole}>Admin</Typography>
                  </div>
                </div>
                {Boolean(menuAnchor) ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Menu
        anchorEl={menuAnchor}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <List>
          <MenuItem disabled>
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem onClick={logUserOut}>
            <ListItemIcon>
              <PowerSettingsNewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </List>
      </Menu>

      <Menu
        className={classes.notificationMenu}
        anchorEl={alertMenuAnchor}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(alertMenuAnchor)}
        onClose={() => {
          setAlertMenuAnchor(null);
        }}
      >
        <List id="menu-card-alerts-tray">{renderAlerts()}</List>
      </Menu>
    </>
  );
}

export default withStyles(styles)(DrawerNav);
