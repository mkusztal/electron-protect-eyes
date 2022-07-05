import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const TIMER_STATUS = {
    OFF: 'off',
    WORK: 'work',
    REST: 'rest',
  };

  const [status, setStatus] = useState(TIMER_STATUS.OFF);
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    setTime(1200);
    setStatus(TIMER_STATUS.WORK);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 50)
    );
  };

  useEffect(() => {
    if (time === 0) {
      playBell();
      if (status === TIMER_STATUS.WORK) {
        setStatus(TIMER_STATUS.REST);
        setTime(600);
      } else {
        setStatus(TIMER_STATUS.WORK);
        setTime(1200);
      }
    }
  }, [time]);

  let seconds = String(Math.floor(time % 60)).padStart(2, '0');
  let minutes = String(Math.floor(time / 60)).padStart(2, '0');

  const stopTimer = () => {
    setTime(null);
    setStatus(TIMER_STATUS.OFF);
    clearInterval(timer);
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const quitApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === TIMER_STATUS.OFF && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === TIMER_STATUS.WORK && <img src="./images/work.png" />}
      {status === TIMER_STATUS.REST && <img src="./images/rest.png" />}
      {status !== TIMER_STATUS.OFF && (
        <div className="timer">
          {minutes}:{seconds}
        </div>
      )}
      {status === TIMER_STATUS.OFF && (
        <button className="btn" onClick={startTimer}>
          Start
        </button>
      )}
      {status !== TIMER_STATUS.OFF && (
        <button className="btn" onClick={stopTimer}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={quitApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
