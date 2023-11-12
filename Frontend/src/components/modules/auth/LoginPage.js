import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import styles from "./LoginPageStyles";
import logo from "./../../../resources/design-images/login-logo.svg";
import { useNavigate } from "react-router-dom";
import configData from "./../../../config.json";

function LoginPage(props) {
  const { classes } = props;
  const [shownPass, setShown] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const verson = configData.version.current_version;

  const navigate = useNavigate();
  const handlePassChange = (e) => {
    setIsError(false);
    setErrorMsg("");
    setPassValue(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setIsError(false);
    setErrorMsg("");
    setUsername(e.target.value);
  };

  const togglePass = () => setShown(!shownPass);

  const handleFormSubmitt = (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMsg("");
    if (username.trim() === "" || passValue.trim() === "") {
      setIsError(true);
      setErrorMsg("Username or Password can't be empty!");
      return;
    } else if (username === "admin_user") {
      if (passValue === "admin_user") {
        setPassValue("");
        return navigate("/admin/dashboard");
      } else {
        setIsError(true);
        setErrorMsg("Username or Password incorrect!");
        return;
      }
    } else if (username === "manager_user") {
      if (passValue === "admin_user") {
        setPassValue("");
        navigate("/manager/dashboard");
      } else {
        setIsError(true);
        setErrorMsg("Username or Password incorrect!");
        return;
      }
    } else {
      setIsError(true);
      setErrorMsg("Username or Password incorrect!");
      return;
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.root}>
      <div className={classes.sideImage}>
        {/* <img
          src="face.webp"
          width="500ppx"
          height="500px"
          style={{
            dispaly: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        /> */}
      </div>

      <div className={classes.paperForm}>
        <Paper className={classes.paper} elevation={0}>
          <div className={classes.logoContainer}>
            <img src={logo} />
          </div>
          <form className={classes.form} onSubmit={handleFormSubmitt}>
            <Typography className={classes.formTitle} variant="h4">
              Log in
            </Typography>
            <FormControl margin="normal" fullWidth required variant="outlined">
              {/* <InputLabel htmlFor="phone" id="phn">{strings.phoneNumber}</InputLabel> */}
              <TextField
                variant="outlined"
                id="username"
                type="tel"
                value={username}
                onChange={handleUsernameChange}
                label={"Username"}
                error={isError}
                helperText={errorMsg}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                id="password"
                type={shownPass ? "text" : "password"}
                value={passValue}
                onChange={handlePassChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePass}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {shownPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className={classes.fromBottomWraper}>
              <Button
                variant="contained"
                type="submit"
                className={classes.submit}
              >
                Continue
              </Button>
            </div>
          </form>
        </Paper>
      </div>
      <p className={classes.version}>Version {verson}</p>
    </div>
  );
}

export default withStyles(styles)(LoginPage);
