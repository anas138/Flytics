import { createSlice } from "@reduxjs/toolkit";
import configData from "../../config.json";
import axios from "axios";

const baseURL = configData.url.baseURL;
const operator = configData.url.operators;
const url = `${baseURL}${operator}`;
const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

const slice = createSlice({
  name: "image upload",
  initialState: {
    list: [],
    loading: false,
    error: false,
    errorMessage: "",
    openDialogue: false,
  },
  reducers: {
    imagetListRequested: (image, action) => {
      image.loading = true;
      image.error = false;
      image.errorMessage = "";
    },
    imagetListReceived: (image, action) => {
      //console.log(action.payload.data.result, "dataImage");
      image.list = action.payload.data.result;
      image.loading = false;
      image.error = false;
      image.errorMessage = "";
    },
    imagetListUpdated: (image, action) => {
      image.loading = false;
      image.error = false;
      image.errorMessage = "";
    },
    imagetListRequestFailed: (image, action) => {
      console.log(action.payload, "action");
      image.loading = false;
      image.error = true;
      image.errorMessage = action.payload.data;
    },
    imageRemoveMessage: (image) => {
      image.errorMessage = "";
    },
    toggleDialogue: (image) => {
      image.openDialogue = !image.openDialogue;
    },
    invalidImageFile: (image) => {
      image.errorMessage = "File should be of image type";
    },
  },
});

export const {
  imagetListRequested,
  imagetListReceived,
  imagetListRequestFailed,
  imagetListUpdated,
  imageRemoveMessage,
  toggleDialogue,
  invalidImageFile,
} = slice.actions;

export const patchtImage = (id, file) => {
  console.log(file, "myFile");
  console.log("form Data", file.get("file"));

  return async function (dispatch) {
    dispatch(imagetListRequested());
    try {
      const requestedCsv = await axios({
        method: "patch",
        url: `${url}/${id}/update-image`,
        data: file,
        headers: headers,
      });
      if (requestedCsv) {
        console.log(requestedCsv, "request");
        dispatch(imagetListUpdated(requestedCsv.data));
        dispatch(toggleDialogue());
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response, "eResponse");
        dispatch(imagetListRequestFailed(error.response));
      }
    }
  };
};
export default slice.reducer;
