import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from "./../../config.json";

const baseURL = configData.url.baseURL;
const departmentList = configData.url.departmentList;
const url = `${baseURL}${departmentList}`;

const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

const slice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    totalCount: 0,
    loading: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    departmentListRequested: (departments, action) => {
      departments.loading = true;
      departments.error = false;
      departments.errorMessage = "";
    },
    departmentListReceived: (departments, action) => {
      departments.list = action.payload.data;
      departments.totalCount = action.payload.data.length;
      departments.loading = false;
      departments.error = false;
      departments.errorMessage = "";
    },
    departmentListRequestFailed: (departments, action) => {
      departments.loading = false;
      departments.error = true;
      departments.errorMessage = action.payload.message;
    },
  },
});

const {
  departmentListRequested,
  departmentListReceived,
  departmentListRequestFailed,
} = slice.actions;

export const { newDepartmentReceived } = slice.actions;

export const loadDepartments = () =>
  apiCallBegan({
    url: `${url}`,
    method: "get",
    headers,
    onStart: departmentListRequested.type,
    onError: departmentListRequestFailed.type,
    onSuccess: departmentListReceived.type,
  });

export default slice.reducer;
