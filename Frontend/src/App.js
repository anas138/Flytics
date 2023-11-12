import "./App.css";
import { ThemeProvider } from "@mui/styles";
import theme from "./resources/themes/themes";
import SideDrawer from "./components/modules/drawer/SideDrawer";
import {
  AdminDashboard,
  ManagerDashboard,
} from "./components/modules/dashboard";
import ContentPane from "./components/helpers/content-pane/ContentPane";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/modules/auth";
import AdminStaff from "./components/modules/staff/AdminStaff";
import Alerts from "./components/modules/Alerts/Alerts";
import IndividualStaffDetails from "./components/modules/staff/IndividualStaffDetails";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="admin" element={<SideDrawer />}>
              <Route
                path="dashboard"
                element={
                  <ContentPane>
                    <AdminDashboard />
                  </ContentPane>
                }
              />
              <Route
                path="staff"
                element={
                  <ContentPane>
                    <AdminStaff />
                  </ContentPane>
                }
              />
              <Route
                path="staff/:operatorId"
                element={
                  <ContentPane>
                    <IndividualStaffDetails />
                  </ContentPane>
                }
              />
              <Route
                path="alerts"
                element={
                  <ContentPane>
                    <Alerts />
                  </ContentPane>
                }
              />
            </Route>
            <Route path="manager" element={<SideDrawer />}>
              <Route
                path="dashboard"
                element={
                  <ContentPane>
                    <ManagerDashboard />
                  </ContentPane>
                }
              />
            </Route>
          </Routes>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
