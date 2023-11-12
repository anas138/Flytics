import { format, millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds } from 'date-fns';
export const getUTCDate = (date) => {
  const utc_date = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  // console.log('date', date);
  // console.log('utc_date', utc_date);
  // console.log('new Date utc_date', new Date(utc_date));
  return utc_date;
};

export const convertLocalTimeToUTC = (localTime: string) => {
  if (!localTime) {
    throw new Error("Time can't be empty");
  }
  return new Date(`${new Date().toJSON().slice(0, 10)} ${localTime}`)
    .toISOString()
    .slice(11, 16);
};

export const convertUTCToLocal = (UTCTime) => {
  if (!UTCTime) {
    throw new Error("Time can't be empty");
  }
  const currentUTCDate = new Date().toISOString().substring(0, 10);
  const inputUTCDateTime = `${currentUTCDate}T${UTCTime}:00.000Z`;
  return format(new Date(inputUTCDateTime), 'HH:mm');
};

export const fixFloat = (decimalPlaces, number) => {
  let multiplier = 10 * 10 ** decimalPlaces;
  return Math.round((number + Number.EPSILON) * multiplier) / multiplier;
};

export const formatTime = (milliSeconds) => {
  const hours = millisecondsToHours(milliSeconds);
  const minutes = millisecondsToMinutes(milliSeconds) % 60;
  const seconds = millisecondsToSeconds(milliSeconds) % 60;

  if (hours === 0) {
    if (minutes === 0) {
      if (seconds === 0) return 'N/A';
      else return `${seconds} sec`;
    } else return `${minutes} mins`;
  }
  return `${hours < 10 ? hours : hours} hr ${minutes} min`;
};
