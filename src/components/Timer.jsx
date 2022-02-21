import React, { useState, useEffect } from 'react';

export default function Timer({
  numOfMinutes,
  timerStart,
  handleToCheckBoard,
}) {
  const [timer, setTimer] = useState(1);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    let seconds = numOfMinutes * 60;
    setTimer(seconds);
  }, []);
  useEffect(() => {
    setIsActive(timerStart);
    if (timer === 0) {
      console.log('timer zero');
      setIsActive(false);
      handleToCheckBoard();
    }
  }, [timer]);

  useEffect(() => {
    let timerInterval;
    if (isActive === true) {
      let sec = numOfMinutes * 60;
      setTimer(sec);
      timerInterval = setInterval(() => {
        sec--;
        setTimer(sec);
      }, 1000);
      console.log(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isActive]);

  console.log(timer);

  return (
    <div
      className={
        timer !== 0 && timer < 50
          ? 'timer-container time-is-gone'
          : 'timer-container'
      }
    >
      <span >{Math.floor(timer / 60)} </span> <span>:</span>
      <span className='count'>
        {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </span>
    </div>
  );
}
