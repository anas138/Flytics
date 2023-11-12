import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { Fragment, useCallback, useContext, useEffect } from "react";
import styles from "./DrawerStyles";
import logo from "./../../../resources/design-images/drawer-logo.svg";
//import { DashboardIcon } from "./../../../resources/design-icons/drawer-icons";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import {
  LocationIcon,
  ReportIcon,
  SettingsIcon,
  StaffIcon,
} from "../../../resources/design-icons/drawer-icons";
import { KeyboardArrowDown } from "@mui/icons-material";
import DrawerNav from "../drawer-nav/DrawerNav";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import configData from "./../../../config.json";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { SocketContext } from "../../../contexts/socket-context";
import { useSnackbar } from "notistack";
import {
  loadSingleStaffStats,
  staffLeftSeat,
  staffReturnedToSeat,
} from "../../../store/staff/staff";
import { newAlertReceived } from "../../../store/alerts/alerts";

function SideDrawer(props) {
  const { classes } = props;
  const selected = useSelector((state) => state.ui.drawer.selection);

  const staff = useSelector((state) => state.entities.staff.list);

  const quickFilter = useSelector(
    (state) => state.ui.filters.dashboardFilters.quickFilter
  );
  const dateFrom = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateFrom
  );
  const dateTo = useSelector(
    (state) => state.ui.filters.dashboardFilters.dateTo
  );

  const getQueryParam = () => {
    return {
      quickFilter,
      dateFrom,
      dateTo,
    };
  };

  const navigate = useNavigate();
  const routerParams = useLocation();
  const version = configData.version.current_version;

  const dispatch = useDispatch();
  const isSelected = (str) => {
    return str === selected;
  };
  const changeSelection = (value) => () => {
    dispatch(drawerSelectionChanged(value));
    navigate(`/${routerParams.pathname.split("/")[1]}/${value}`);
  };

  const auth = {
    id: "629d8fd360b7b92ca2abcb5e",
  };

  /**
   * Alerts handling state + methods
   */
  const updateSingleStaffStats = (personId) => {
    const operator = staff.find((person) => person._id === personId);
    if (operator) dispatch(loadSingleStaffStats(operator._id, getQueryParam()));
  };

  const { user, setUserObject, socket } = useContext(SocketContext);
  useEffect(() => {
    if (!Object.keys(user).length) setUserObject(auth);
    socket?.on("notification", (payload) => {
      dispatch(staffLeftSeat({ operatorId: payload.event.personId }));
      handleNotificationSnack(payload.message);
      dispatch(newAlertReceived(payload));
      updateSingleStaffStats(payload.event?.personId);
    });
    socket?.on("presence-alert", (payload) => {
      dispatch(staffReturnedToSeat({ operatorId: payload.event?.personId }));
      updateSingleStaffStats(payload.event?.personId);
    });
    socket?.on("stats-change-alert", (payload) => {
      updateSingleStaffStats(payload.personId);
    });
  }, [socket]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNotificationSnack = useCallback(
    (msg) => {
      enqueueSnackbar(`${msg}`, {
        variant: "default",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        persist: true,
        action: (key) => (
          <Fragment>
            {/* <Button
            size="small"
            onClick={() =>
              alert(`Clicked on action of snackbar with id: ${key}`)
            }
          >
            Detail
          </Button> */}
            <Button size="small" onClick={() => closeSnackbar(key)}>
              Dismiss
            </Button>
          </Fragment>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );
  return (
    <div className={classes.root}>
      <Drawer variant="persistent" className={classes.drawer} open>
        <div className={classes.logoContainer}>
          <img
            src={logo}
            alt="people-metrics-logo"
            className={classes.logoImage}
          />
        </div>
        <List>
          <Divider />
          <ListItemButton
            className={
              isSelected("dashboard")
                ? classes.selectedListButton
                : classes.listButton
            }
            onClick={changeSelection("dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon
                className={isSelected("dashboard") ? classes.selectedIcon : ""}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <Divider />
          <ListItemButton
            className={
              isSelected("staff")
                ? classes.selectedListButton
                : classes.listButton
            }
            onClick={changeSelection("staff")}
          >
            <ListItemIcon>
              <StaffIcon
                className={isSelected("staff") ? classes.selectedIcon : ""}
              />
            </ListItemIcon>
            <ListItemText primary="Staff" />
            {/* <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon> */}
          </ListItemButton>

          <Divider />
          {/* <ListItemButton
            className={
              isSelected("locations")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <LocationIcon />
            </ListItemIcon>
            <ListItemText primary="Locations" />
            <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon>
          </ListItemButton>

          <Divider /> */}
          <ListItemButton
            className={
              isSelected("report")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
            {/* <ListItemIcon>
              <KeyboardArrowDown />
            </ListItemIcon> */}
          </ListItemButton>

          <Divider />
          <ListItemButton
            className={
              isSelected("settings")
                ? classes.selectedListButton
                : classes.listButton
            }
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <Divider />
        </List>
        <div className={classes.appVersion}>Version: {version}</div>
      </Drawer>
      <DrawerNav />
      <Outlet />
    </div>
  );
}

export default withStyles(styles)(SideDrawer);
