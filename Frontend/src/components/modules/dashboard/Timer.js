import React, { useEffect, useState } from "react";

function TimerTest(props) {
  const [timeRemaining, setTimeRemaining] = useState(30);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining <= 1) setTimeRemaining(30);
      else setTimeRemaining(timeRemaining - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);
  return <div>Refreshing stats in {timeRemaining} seconds</div>;
}
export default TimerTest;
