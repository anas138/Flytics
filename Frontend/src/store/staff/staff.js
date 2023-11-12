import { createSlice } from "@reduxjs/toolkit";
import { getStaffImage } from "../../utils/HelperFunctions";
import { apiCallBegan } from "../api";
import configData from "./../../config.json";
import FileDownload from "js-file-download";

const baseURL = configData.url.baseURL;
const operatorsSummary = configData.url.getOperatorsStat;
const operatorsSummaryCsv = configData.url.getOperatorsStatCsv;
const url = `${baseURL}${operatorsSummary}`;

const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

const slice = createSlice({
  name: "staff",
  initialState: {
    list: [],
    overAllStats: {},
    loading: false,
    error: false,
    errorMessage: "",
    singleCallLoading: false,
    singleCallError: false,
    singleCallErrorMessage: "",
    fileLoading: false,
    fileError: false,
  },
  reducers: {
    staffListRequested: (staffs, action) => {
      staffs.loading = true;
      staffs.error = false;
      staffs.errorMessage = "";
    },
    staffListReceived: (staffs, action) => {
      staffs.list = action.payload.data.operators;
      staffs.overAllStats = action.payload.data.overAllStats;
      staffs.loading = false;
      staffs.error = false;
      staffs.errorMessage = "";
    },
    staffListRequestFailed: (staffs, action) => {
      staffs.loading = false;
      staffs.error = true;
      staffs.errorMessage = action.payload.message;
    },
    singleStaffStatsRequested: (staffs, action) => {
      staffs.singleCallLoading = true;
      staffs.singleCallError = false;
      staffs.singleCallErrorMessage = "";
    },
    singleStaffStatsReceived: (staffs, action) => {
      const operatorIndex = staffs.list.findIndex(
        (staff) => staff._id === action.payload?.data?._id
      );
      if (staffs.list[operatorIndex])
        staffs.list[operatorIndex] = action.payload.data;
      staffs.singleCallLoading = false;
      staffs.singleCallError = false;
      staffs.singleCallErrorMessage = "";
    },
    singleStaffStatsRequestFailed: (staffs, action) => {
      staffs.singleCallLoading = false;
      staffs.singleCallError = true;
      staffs.singleCallErrorMessage = action.payload.message;
    },
    staffLeftSeat: (staffs, action) => {
      const operatorIndex = staffs.list.findIndex(
        (staff) => staff._id === action.payload.operatorId
      );
      if (staffs.list[operatorIndex]) {
        staffs.list[operatorIndex] = {
          ...staffs.list[operatorIndex],
          isNotOnSeat: true,
        };
      }
    },
    staffReturnedToSeat: (staffs, action) => {
      const operatorIndex = staffs.list.findIndex(
        (staff) => staff._id === action.payload.operatorId
      );
      if (staffs.list[operatorIndex]) {
        staffs.list[operatorIndex] = {
          ...staffs.list[operatorIndex],
          isNotOnSeat: false,
        };
      }
    },
    staffImageUpdateRequested: (staffs, action) => {
      const operatorIndex = staffs.list.findIndex(
        (staff) => staff._id === action.payload.staffId
      );
      staffs.list[operatorIndex] = {
        ...staffs.list[operatorIndex],
        imageLoading: true,
      };
    },
    updateStaffImage: (staffs, action) => {
      const operatorIndex = staffs.list.findIndex(
        (staff) => staff._id === action.payload.staffId
      );
      staffs.list[operatorIndex] = {
        ...staffs.list[operatorIndex],
        imageSrc: action.payload.imageSrc,
        imageLoading: false,
      };
    },
    staffImageUpdateFailed: (staffs, action) => {
      const operatorIndex = staffs.list.findIndex(
        (staff) => staff._id === action.payload.staffId
      );
      staffs.list[operatorIndex] = {
        ...staffs.list[operatorIndex],
        imageLoading: false,
      };
    },
    fileDownloadRequested: (staffs, action) => {
      staffs.fileLoading = true;
      staffs.fileError = false;
    },
    fileDownloaded: (staffs, action) => {
      staffs.fileLoading = false;
      staffs.fileError = false;
    },
    fileDownloadFailed: (staffs, action) => {
      staffs.fileLoading = false;
      staffs.fileError = true;
    },
  },
});

const {
  staffListRequested,
  staffListReceived,
  staffListRequestFailed,
  singleStaffStatsRequested,
  singleStaffStatsReceived,
  singleStaffStatsRequestFailed,
  staffImageUpdateRequested,
  updateStaffImage,
  staffImageUpdateFailed,
  fileDownloadRequested,
  fileDownloaded,
  fileDownloadFailed,
} = slice.actions;

export const { staffLeftSeat, staffReturnedToSeat } = slice.actions;

export const loadStaffSummary = (queryParams) =>
  apiCallBegan({
    url: `${url}?quick-filter=${queryParams.quickFilter}&date-from=${queryParams.dateFrom}&date-to=${queryParams.dateTo}&department=${queryParams.department}`,
    method: "get",
    headers,
    onStart: staffListRequested.type,
    onError: staffListRequestFailed.type,
    onSuccess: staffListReceived.type,
  });

export const loadSingleStaffStats = (operatorId, queryParams) =>
  apiCallBegan({
    url: `${url}/${operatorId}?quick-filter=${queryParams.quickFilter}&date-from=${queryParams.dateFrom}&date-to=${queryParams.dateTo}`,
    method: "get",
    headers,
    onStart: singleStaffStatsRequested.type,
    onError: singleStaffStatsRequestFailed.type,
    onSuccess: singleStaffStatsReceived.type,
  });

export const loadStaffImage = (staffId, imageId) => async (dispatch) => {
  dispatch(staffImageUpdateRequested({ staffId }));
  try {
    const imageSrc = await getStaffImage(imageId);
    dispatch(updateStaffImage({ staffId, imageSrc }));
  } catch (err) {
    dispatch(staffImageUpdateFailed({ staffId }));
  }
};

export const downloadStaffSummaryReport =
  (queryParams, fileName) => async (dispatch) => {
    dispatch(fileDownloadRequested());
    fetch(
      `${baseURL}${operatorsSummaryCsv}?quick-filter=${queryParams.quickFilter}&date-from=${queryParams.dateFrom}&date-to=${queryParams.dateTo}`,
      { headers }
    )
      .then((res) => res.blob())
      .then((csv) => {
        console.log("csv->received", csv);
        console.log("csv->received=>type", typeof csv);
        FileDownload(csv, fileName);
        dispatch(fileDownloaded);
      })
      .catch((err) => dispatch(fileDownloadFailed()));
  };

export default slice.reducer;
