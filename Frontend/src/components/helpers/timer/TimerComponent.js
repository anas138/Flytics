import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadStaffSummary } from "../../../store/staff/staff";

function TimerComponent(props) {
  const { getQueryParam, timeRemaining, setTimeRemaining } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining <= 1) {
        dispatch(loadStaffSummary(getQueryParam()));
        setTimeRemaining(30);
      } else setTimeRemaining(timeRemaining - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);
  return <div>Refreshing stats in {timeRemaining} seconds</div>;
}

export default TimerComponent;
