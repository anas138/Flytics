import configData from "./../config.json";
import axios from "axios";
import * as dateFns from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const baseUrl = configData.url.baseURL;
const getImages = configData.url.getOperatorImage;
const url = `${baseUrl}${getImages}`;

const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

export const trimId = (id) => {
  const firstChars = id.substring(0, 2).toUpperCase();
  const lastChar = id[id.length - 1];
  return `${firstChars}_${lastChar}`;
};

export const fixFloat = (decimalPlaces, number) => {
  let multiplier = 10 * 10 ** decimalPlaces;
  return Math.round((number + Number.EPSILON) * multiplier) / multiplier;
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};
//TODO
export const formateTimeToLocal = (time) => {
  const currentUTCDate = new Date().toISOString().substring(0, 10);
  const inputUTCDateTime = `${currentUTCDate}T${time}:00.000Z`;
  return dateFns.format(new Date(inputUTCDateTime), "HH:mm");
};

export const formatTime = (milliSeconds) => {
  const hours = dateFns.millisecondsToHours(milliSeconds);
  const minutes = dateFns.millisecondsToMinutes(milliSeconds) % 60;
  const seconds = dateFns.millisecondsToSeconds(milliSeconds) % 60;

  return `${hours < 10 ? hours : hours} hr, ${minutes} min, ${seconds} sec`;
};
export const formatDate = (date) => {
  return dateFns.format(new Date(date), "dd-MM-yyyy");
};

export const formatAssessmentTime = (milliSeconds) => {
  const hours = dateFns.millisecondsToHours(milliSeconds);
  const minutes = dateFns.millisecondsToMinutes(milliSeconds) % 60;
  const seconds = dateFns.millisecondsToSeconds(milliSeconds) % 60;
  if (hours === 0) {
    if (minutes === 0) {
      if (seconds === 0) return "N/A";
      else return `${seconds} sec`;
    } else return `${minutes} mins`;
  }
  return `~ ${hours < 10 ? hours : hours} hr, ${minutes} min`;
};

export const formatTimeToHumanFriendly = (time) => {
  const today = new Date();
  const timeDate = new Date(time);
  return dateFns.formatDistanceToNow(timeDate, { addSuffix: true });
};

export const getStaffImage = async (imageId) => {
  try {
    // const response = await axios.request({
    //   url: `${url}?image-id=${imageId}`,
    //   method: "get",
    //   headers,
    // });
    // const resBlob = response.blob();
    // const blobImg = new Blob([response.data],{type:'image/webp'});
    // console.log(blobImg)
    // console.log(URL.createObjectURL(resBlob));
    // console.log(response);
    // const encodedResponse = Buffer.from(response.data).toString('base64');
    // console.log("encoded response",encodedResponse)
    // console.log("encoded response", response);
    const imgSrc = await fetch(`${url}?image-id=${imageId}`, { headers })
      .then((response) => response.blob())
      .then((img) => {
        const imageUrl = URL.createObjectURL(img);
        return imageUrl;
      });
    // return "response.data";
    return imgSrc;
  } catch (err) {
    let error;
    if (err.response) error = err.response.data;
    else
      error = {
        message: err.message,
        error: {
          statusCode: 408,
          status: "time out",
        },
      };
    return null;
  }
};
