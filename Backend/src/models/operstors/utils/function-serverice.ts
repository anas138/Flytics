import { Event } from 'src/models/events/schemas/events.schema';
import * as dateFns from 'date-fns';
import { convertLocalTimeToUTC } from 'src/common/utils/misc-functions';
import { zonedTimeToUtc } from 'date-fns-tz';

const getTimesFormArray = (eventsArray: Event[]) => {
  const timeList = eventsArray.map((event) => event.eventTime);
  // const timeList = eventsArray.map((event) =>
  //   Number(new Date(event.eventTime)) ? new Date(event.eventTime) : 0.0,
  // );
  return timeList;
};
const getPresenceTimeLapsed = (eventsArray) => {
  let presenceTime = 0.0;
  for (let i = 0; i < eventsArray.length; i++) {
    if (eventsArray[i].presence === 1 && eventsArray[i].distraction === 0) {
      if (
        i !== 0 &&
        eventsArray[i - 1].presence === 1 &&
        eventsArray[i - 1].distraction === 0
      )
        continue;
      for (let j = i; j < eventsArray.length; j++) {
        if (
          eventsArray[j].distraction === 1 ||
          (eventsArray[j].presence === 0 && eventsArray[j].distraction === 0)
        ) {
          const diff = Math.abs(
            new Date(eventsArray[i].eventTime).getTime() -
              new Date(eventsArray[j].eventTime).getTime(),
          );
          presenceTime += diff;
          break;
        }
      }
      continue;
    }
  }

  return presenceTime;
};

const getTimeDifferenceFromArray = (timesArray: any) => {
  //@ts-ignore
  const totalTime =
    new Date(timesArray[0]).getTime() -
    new Date(timesArray[timesArray.length - 1]).getTime();
  let diff = Math.ceil(totalTime / 1000);
  const difference = Math.abs(diff);
  return difference;
};

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
};

const formatTime = (milliSeconds: number) => {
  let hour = 0;
  let min = 0;
  let sec = 0;
  sec = Math.ceil(milliSeconds / 1000);
  min = Math.ceil(sec / 60);
  hour = Math.ceil(min / 60);

  sec = sec % 60;
  min = sec >= 30 ? min + 1 : min;
  min = min % 60;
  return `${hour < 10 ? padTo2Digits(hour) : hour} hours, ${padTo2Digits(
    min,
  )} minutes, ${padTo2Digits(sec)} sec`;
};

const getStatsFromEvents = (events, eventTimeDiff) => {
  if (events.length) {
    let eventsTimeDiff = 0;
    if (eventTimeDiff) eventsTimeDiff = eventTimeDiff;
    else {
      const eventsTimes = getTimesFormArray(events);
      eventsTimeDiff = getTimeDifferenceFromArray(eventsTimes);
    }
    const attendancePercentage = 100;
    const presentTime = getPresenceTimeLapsed(events);
    const distractedTime = eventsTimeDiff * 1000 - presentTime;
    const attentionTime =
      presentTime - distractedTime > 0 ? presentTime - distractedTime : 0.0;
    const presencePercentage = Number(
      (presentTime / (eventsTimeDiff * 1000)) * 100,
    )
      ? (presentTime / (eventsTimeDiff * 1000)) * 100
      : 0.0;
    const distractionPercentage = Number(
      (distractedTime / (eventsTimeDiff * 1000)) * 100,
    )
      ? (distractedTime / (eventsTimeDiff * 1000)) * 100
      : 0.0;
    const attentionPercentage = Number((attentionTime / presentTime) * 100)
      ? (attentionTime / presentTime) * 100
      : 0.0;

    const rating = Number(
      (presencePercentage + 100 + attentionPercentage) / 3 / 10,
    )
      ? (presencePercentage + 100 + attentionPercentage) / 3 / 10
      : 0.0;
    return {
      totalTime: eventsTimeDiff * 1000,
      presentTime,
      distractedTime,
      attentionTime,
      presencePercentage,
      distractionPercentage,
      attentionPercentage,
      attendancePercentage,
      rating,
    };
  }
  return {
    totalTime: 0,
    presentTime: 0,
    distractedTime: 0,
    attentionTime: 0,
    presencePercentage: 0,
    distractionPercentage: 0,
    attentionPercentage: 0,
    attendancePercentage: 0,
    rating: 0,
  };
};

/**
 * Function to format the filtration object from query parameters
 */
const generateFilterObject = (
  quickFilter: string,
  dateFrom: string,
  dateTo: string,
) => {
  let filterOptions = { dateFrom: '', dateTo: '' };
  if (quickFilter) {
    const today = new Date();
    const todayDate = `${today.toISOString().split('T')[0]}T00:00:00.000+00:00`;
    switch (quickFilter.toLocaleLowerCase()) {
      case 'd': {
        filterOptions = { dateFrom: todayDate, dateTo: todayDate };
        break;
      }
      case 'w': {
        const startDate = dateFns.sub(today, { weeks: 1 });
        const weekStart = `${
          startDate.toISOString().split('T')[0]
        }T00:00:00.000+00:00`;
        filterOptions = { dateFrom: weekStart, dateTo: todayDate };
        break;
      }
      case 'm': {
        const startDate = dateFns.sub(today, { months: 1 });
        const monthStart = `${
          startDate.toISOString().split('T')[0]
        }T00:00:00.000+00:00`;
        filterOptions = { dateFrom: monthStart, dateTo: todayDate };
        break;
      }
      case 'null': {
        const fromDate = dateFns.add(new Date(dateFrom), { days: 1 });
        const toDate = dateFns.add(new Date(dateTo), { days: 1 });
        const filterStart = `${
          fromDate.toISOString().split('T')[0]
        }T00:00:00.000+00:00`;
        const filterEnd = `${
          toDate.toISOString().split('T')[0]
        }T00:00:00.000+00:00`;
        filterOptions = { dateFrom: filterStart, dateTo: filterEnd };
      }
    }
  } else if (dateFrom && dateTo) {
    const fromDate = dateFns.add(new Date(dateFrom), { days: 1 });
    const toDate = dateFns.add(new Date(dateTo), { days: 1 });
    const filterStart = `${
      fromDate.toISOString().split('T')[0]
    }T00:00:00.000+00:00`;
    const filterEnd = `${
      toDate.toISOString().split('T')[0]
    }T00:00:00.000+00:00`;
    filterOptions = { dateFrom: filterStart, dateTo: filterEnd };
  } else {
    filterOptions = { dateFrom: null, dateTo: null };
  }
  return filterOptions;
};

/**
 * Revamped stats calculation methods which use the data from OperatorsStats table and do not loop over the events.
 */

const isTimeSlotEnded = (timeSlotEnd) => {
  const today = new Date(new Date().toISOString());
  const todayString = today.toISOString().split('T')[0];
  const currentTime = today.getTime(); //new Date().getTime();
  const slotEnd = new Date(todayString + 'T' + timeSlotEnd + 'Z'); //new Date();
  // let end_hours = Number(timeSlotEnd.split(':')[0]);
  // let end_Minutes = Number(timeSlotEnd.split(':')[1]);
  // slotEnd.setHours(end_hours);
  // slotEnd.setMinutes(end_Minutes);
  return slotEnd.getTime() <= currentTime;
};

const isTimeSlotStarted = (timeSlotStart) => {
  const today = new Date(new Date().toISOString());
  const todayString = today.toISOString().split('T')[0];
  const currentTime = today.getTime(); //new Date().getTime();
  const slotStart = new Date(todayString + 'T' + timeSlotStart + 'Z');
  return slotStart.getTime() >= currentTime;
};

const getTimeSlotDuration = (timeSlotStart, timeSlotEnd) => {
  // const slotStart = new Date();
  // const slotEnd = new Date();
  // let start_hours = Number(timeSlotStart.split(':')[0]);
  // let start_Minutes = Number(timeSlotStart.split(':')[1]);
  // let end_hours = Number(timeSlotEnd.split(':')[0]);
  // let end_Minutes = Number(timeSlotEnd.split(':')[1]);

  // slotStart.setHours(start_hours);
  // slotStart.setMinutes(start_Minutes);
  // slotEnd.setHours(end_hours);
  // slotEnd.setMinutes(end_Minutes);
  const today = new Date(new Date().toISOString());
  const todayString = today.toISOString().split('T')[0];
  const currentTime = today.getTime();
  const slotStart = new Date(todayString + 'T' + timeSlotStart + 'Z');
  const slotEnd = new Date(todayString + 'T' + timeSlotEnd + 'Z');
  const duration = slotStart.getTime() - slotEnd.getTime();
  return Math.abs(duration);
};

const getTimeDurationTillNow = (timeSlotStart) => {
  // const currentTime = new Date().getTime();
  // const slotStart = new Date();
  // let start_hours = Number(timeSlotStart.split(':')[0]);
  // let start_Minutes = Number(timeSlotStart.split(':')[1]);

  // slotStart.setHours(start_hours);
  // slotStart.setMinutes(start_Minutes);
  const today = new Date(new Date().toISOString());
  const todayString = today.toISOString().split('T')[0];
  const currentTime = today.getTime();
  const slotStart = new Date(todayString + 'T' + timeSlotStart + 'Z');
  const duration = slotStart.getTime() - currentTime;
  return Math.abs(duration);
};

const calculateOperatorStats = (operator, opStats, filters) => {
  let operatorPresenceTime = 0.0;
  let operatorDistractionTime = 0.0;
  let operatorsTotalTime = 0.0;
  let operatorPresentDays = 0;
  let lastUpdated = '';
  let isNotOnSeat = null;
  let currentDate = new Date(filters.dateFrom);
  const endDate = new Date(filters.dateTo);

  if (opStats.length > 0) {
    while (currentDate <= endDate) {
      const currentStat = opStats.find(
        (stat) =>
          stat.statsDate ===
          currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00',
      );
      if (currentStat) {
        operatorPresentDays++;
        operatorPresenceTime += currentStat.presenceTime;
        operatorDistractionTime += currentStat.distractionTime;
        switch (currentStat.lastEvent) {
          case 'p': {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
            const lastEventTime = zonedTimeToUtc(
              new Date(currentStat.lastPresenceEvent),
              operator.timeZone,
            )
              .toISOString()
              .slice(11, 16); //currentStat.lastPresenceEvent.split(' ')[1];
            const currentTime = new Date(today.toISOString()).getTime();
            const lastEventTimeUTC = convertLocalTimeToUTC(lastEventTime);
            const slotEndUTC = convertLocalTimeToUTC(currentStat.timeSlotEnd);
            const eventTime = new Date(
              `${todayString}T${lastEventTime}Z`,
            ).getTime();
            const slotEndTime = new Date(
              `${todayString}T${slotEndUTC}Z`,
            ).getTime();
            // (slotEndHours + slotEndMinutes / 60) * 3600 * 1000;
            if (
              currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00' ==
              today.toISOString().split('T')[0] + 'T00:00:00.000+00:00'
            ) {
              if (currentTime >= slotEndTime) {
                const difference = Math.abs(slotEndTime - eventTime);
                operatorPresenceTime += difference;
              } else if (currentTime < slotEndTime) {
                const difference = Math.abs(currentTime - eventTime);
                operatorPresenceTime += difference;
              }
            } else {
              const difference = Math.abs(slotEndTime - eventTime);
              operatorPresenceTime += difference;
            }
            break;
          }
          case 'd': {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
            const lastEventTime = zonedTimeToUtc(
              new Date(currentStat.lastDistractionEvent),
              operator.timeZone,
            )
              .toISOString()
              .slice(11, 16);
            const currentTime = new Date(today.toISOString()).getTime();
            const lastEventTimeUTC = convertLocalTimeToUTC(lastEventTime);
            const slotEndUTC = convertLocalTimeToUTC(currentStat.timeSlotEnd);
            const eventTime = new Date(
              `${todayString}T${lastEventTime}Z`,
            ).getTime();
            const slotEndTime = new Date(
              `${todayString}T${slotEndUTC}Z`,
            ).getTime(); //(slotEndHours + slotEndMinutes / 60) * 3600 * 1000;
            if (
              currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00' ==
              today.toISOString().split('T')[0] + 'T00:00:00.000+00:00'
            ) {
              if (currentTime >= slotEndTime) {
                const difference = Math.abs(slotEndTime - eventTime);
                operatorDistractionTime += difference;
              } else if (currentTime < slotEndTime) {
                const difference = Math.abs(currentTime - eventTime);
                operatorDistractionTime += difference;
              }
            } else {
              const difference = Math.abs(slotEndTime - eventTime);
              operatorDistractionTime += difference;
            }
            break;
          }
        }
      }
      if (
        currentDate.toISOString().split('T')[0] + 'T00:00:00.000+00:00' ===
        new Date().toISOString().split('T')[0] + 'T00:00:00.000+00:00'
      ) {
        if (isTimeSlotEnded(operator.timeSlotEnd)) {
          operatorsTotalTime += getTimeSlotDuration(
            operator.timeSlotStart,
            operator.timeSlotEnd,
          );
        } else {
          operatorsTotalTime += getTimeDurationTillNow(operator.timeSlotStart);
          if (currentStat?.lastEvent !== 'a') isNotOnSeat = false;
          else isNotOnSeat = true;
        }
      } else {
        operatorsTotalTime += getTimeSlotDuration(
          operator.timeSlotStart,
          operator.timeSlotEnd,
        );
      }
      currentDate = dateFns.add(currentDate, { days: 1 });
    }
  }
  if (!isTimeSlotEnded(operator.timeSlotEnd)) {
  }
  const daysDifference =
    dateFns.differenceInBusinessDays(endDate, new Date(filters.dateFrom)) + 1;
  const presencePercentage = Number(
    (operatorPresenceTime / operatorsTotalTime) * 100,
  )
    ? (operatorPresenceTime / operatorsTotalTime) * 100
    : 0.0;
  const distractionPercentage = Number(
    (operatorDistractionTime / operatorPresenceTime) * 100,
  )
    ? (operatorDistractionTime / operatorPresenceTime) * 100
    : 0.0;
  const attendancePercentage = Number(
    (operatorPresentDays / daysDifference) * 100,
  )
    ? (operatorPresentDays / daysDifference) * 100
    : 0.0;
  const attentionTime = Math.abs(
    operatorPresenceTime - operatorDistractionTime,
  );
  const attentionPercentage = Number(
    (attentionTime / operatorPresenceTime) * 100,
  )
    ? Number((attentionTime / operatorPresenceTime) * 100)
    : 0.0;
  const rating = Number(
    (attendancePercentage + presencePercentage + attentionPercentage) / 3 / 10,
  )
    ? (attendancePercentage + presencePercentage + attentionPercentage) / 3 / 10
    : 0.0;
  switch (opStats[opStats.length - 1]?.lastEvent) {
    case 'p': {
      lastUpdated = opStats[opStats.length - 1]?.lastPresenceEvent;
      break;
    }
    case 'd': {
      lastUpdated = opStats[opStats.length - 1]?.lastDistractionEvent;
      break;
    }
    default: {
      lastUpdated = opStats[opStats.length - 1]?.lastPresenceEvent;
      break;
    }
  }
  const isSlotEnded = isTimeSlotEnded(operator.timeSlotEnd);
  const isSlotStarted = !isTimeSlotStarted(operator.timeSlotStart);
  return {
    totalTime: operatorsTotalTime,
    presentTime: operatorPresenceTime,
    distractedTime: operatorDistractionTime,
    attentionTime,
    presencePercentage,
    attentionPercentage,
    attendancePercentage,
    distractionPercentage,
    rating,
    lastUpdated,
    isNotOnSeat,
    isSlotEnded,
    isSlotStarted,
    daysDifference,
    operatorPresentDays,
  };
};

export { getStatsFromEvents, generateFilterObject, calculateOperatorStats };
