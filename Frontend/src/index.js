import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { SocketProvider } from "./contexts/socket-context";
import { SnackbarProvider } from "notistack";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SocketProvider>
      <SnackbarProvider maxSnack={5}>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </SnackbarProvider>
    </SocketProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
