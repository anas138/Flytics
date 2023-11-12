import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from "./../../config.json";

const baseURL = configData.url.baseURL;
const alertList = configData.url.alertList;
const markAsViewed = configData.url.markAlertAsRead;
const url = `${baseURL}${alertList}`;

const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

const slice = createSlice({
  name: "alerts",
  initialState: {
    list: [],
    totalCount: 0,
    loading: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    alertListRequested: (alerts, action) => {
      alerts.loading = true;
      alerts.error = false;
      alerts.errorMessage = "";
    },
    alertListReceived: (alerts, action) => {
      alerts.list = action.payload.data.result;
      alerts.totalCount = action.payload.data.count;
      alerts.loading = false;
      alerts.error = false;
      alerts.errorMessage = "";
    },
    alertListRequestFailed: (alerts, action) => {
      alerts.loading = false;
      alerts.error = true;
      alerts.errorMessage = action.payload.message;
    },
    newAlertReceived: (alerts, action) => {
      alerts.list.unshift(action.payload);
    },
    alertUpdated: (alerts, action) => {
      const index = alerts.list.findIndex(
        (alert) => alert._id === action.payload.data._id
      );
      alerts.list[index] = action.payload.data;
      alerts.loading = false;
      alerts.error = false;
      alerts.errorMessage = "";
    },
  },
});

const {
  alertListRequested,
  alertListReceived,
  alertListRequestFailed,
  alertUpdated,
} = slice.actions;

export const { newAlertReceived } = slice.actions;

export const loadAlertSummary = (page, rows) =>
  apiCallBegan({
    url: `${url}?page=${page}&rows=${rows}`,
    method: "get",
    headers,
    onStart: alertListRequested.type,
    onError: alertListRequestFailed.type,
    onSuccess: alertListReceived.type,
  });

export const markAlertAsRead = (alertId) =>
  apiCallBegan({
    url: `${url}/${alertId}${markAsViewed}`,
    method: "patch",
    headers,
    onSuccess: alertUpdated.type,
  });

export default slice.reducer;
