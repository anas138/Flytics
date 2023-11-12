import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from "../../config.json";
import axios from "axios";
import { getStaffImage } from "../../utils/HelperFunctions";

const baseURL = configData.url.baseURL;
const csv = configData.url.uploadCsv;
const url = `${baseURL}${csv}`;
const operator = configData.url.operators;
const operatorUrl = `${baseURL}${operator}`;
const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

const slice = createSlice({
  name: "operators",
  initialState: {
    list: [],
    loading: false,
    error: false,
    errorMessage: "",
    invalidRow: -1,
    invalidRecord: null,
    openDialogue: false,
    count: 0,
  },
  reducers: {
    operatorstListRequested: (operators, action) => {
      operators.loading = true;
      operators.error = false;
      operators.errorMessage = "";
    },
    operatorstListReceived: (operators, action) => {
      //console.log(action.payload.data.result, "data");
      operators.list = action.payload.data.result;
      operators.count = action.payload.data.count;
      operators.loading = false;
      operators.error = false;
      operators.errorMessage = "";
    },
    operatorstListRequestFailed: (operators, action) => {
      console.log(action.payload, "action");
      operators.loading = false;
      operators.error = true;
      operators.errorMessage = action.payload.data.message;
      operators.invalidRow = parseInt(action.payload.data.errObjectIndex);
      operators.invalidRecord = action.payload.data.errorObject;
      if (action.payload.data.data.length) {
        operators.list.push(...action.payload.data.data);
      }
    },
    operatorstListUpdated: (operators, action) => {
      if (action.payload.data?.result) {
        operators.list.unshift(...action.payload.data.result);
      }
      operators.loading = false;
      operators.error = false;
      operators.errorMessage = "";
    },
    operatorsRemoveMessage: (operators) => {
      operators.errorMessage = "";
      operators.invalidRow = -1;
    },
    toggleDialogue: (operators) => {
      operators.openDialogue = !operators.openDialogue;
    },
    invalidMessage: (operators) => {
      operators.errorMessage = "File must be of csv type.";
    },
    operatorImageUpdateRequested: (operators, action) => {
      const operatorIndex = operators.list.findIndex(
        (staff) => staff._id === action.payload.staffId
      );
      operators.list[operatorIndex] = {
        ...operators.list[operatorIndex],
        imageLoading: true,
      };
    },
    updateOperatorImage: (operators, action) => {
      const operatorIndex = operators.list.findIndex(
        (staff) => staff._id === action.payload.staffId
      );
      operators.list[operatorIndex] = {
        ...operators.list[operatorIndex],
        imageSrc: action.payload.imageSrc,
        imageLoading: false,
      };
    },
    operatorImageUpdateFailed: (operators, action) => {
      const operatorIndex = operators.list.findIndex(
        (staff) => staff._id === action.payload.staffId
      );
      operators.list[operatorIndex] = {
        ...operators.list[operatorIndex],
        imageLoading: false,
      };
    },
  },
});

export const {
  operatorstListRequested,
  operatorstListReceived,
  operatorstListRequestFailed,
  operatorstListUpdated,
  operatorsRemoveMessage,
  toggleDialogue,
  invalidMessage,
  operatorImageUpdateRequested,
  updateOperatorImage,
  operatorImageUpdateFailed,
} = slice.actions;

export const postCSV = (file) => {
  console.log(file, "myFile");
  console.log("form Data", file.get("file"));

  return async function (dispatch) {
    dispatch(operatorstListRequested());
    try {
      const requestedCsv = await axios({
        method: "post",
        url: `${url}`,
        data: file,
        headers: headers,
      });
      if (requestedCsv) {
        console.log(requestedCsv, "request");
        dispatch(operatorstListUpdated(requestedCsv.data));
        dispatch(toggleDialogue());
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response, "eResponse");
        dispatch(operatorstListRequestFailed(error.response));
      }
    }
  };
};
export const loadOperatorSummary = (page, rows) =>
  apiCallBegan({
    url: `${operatorUrl}?page=${page}&rows=${rows}`,
    method: "get",
    headers,
    onStart: operatorstListRequested.type,
    onError: operatorstListRequestFailed.type,
    onSuccess: operatorstListReceived.type,
  });
export const loadOperatorImage = (staffId, imageId) => async (dispatch) => {
  dispatch(operatorImageUpdateRequested({ staffId }));
  try {
    const imageSrc = await getStaffImage(imageId);
    dispatch(updateOperatorImage({ staffId, imageSrc }));
  } catch (err) {
    dispatch(operatorImageUpdateFailed({ staffId }));
  }
};

export default slice.reducer;
