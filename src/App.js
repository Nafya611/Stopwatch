import React, { useState, useEffect } from 'react';
import './index.css';

// App component
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [laps, setLaps] = useState([]);

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  function addLap() {
    setLaps([...laps, count]);
  }

  function reset() {
    setCount(0);
    setIsPlaying(false);
    setLaps([]);
  }

  return (
    <div className='container'>
      <Stopwatch isPlaying={isPlaying} count={count} setCount={setCount} />
      <Buttons isPlaying={isPlaying} togglePlaying={togglePlaying} reset={reset} addLap={addLap} />
      <Laps laps={laps} />
    </div>
  );
}

export default App;

// Stopwatch, Buttons, Button components
function Stopwatch({ isPlaying, count, setCount }) {
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, setCount]);

  const hours = Math.floor(count / 3600);
  const minutes = Math.floor((count % 3600) / 60);
  const seconds = Math.floor(count % 60);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className='stopwatch'>
      <h2><span>{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</span></h2>
    </div>
  );
}

function Buttons({ isPlaying, togglePlaying, reset, addLap }) {
  return (
    <div className='button-container'>
      <Button shape='circle' children={'lap'} onClick={addLap} />
      <Button className="pla" shape={isPlaying ? 'pause' : 'play'} children={isPlaying ? 'pause' : 'play'} onClick={togglePlaying} />
      <Button shape='reset' children={'reset'} onClick={reset} />
    </div>
  );
}

function Button({ shape, children, onClick }) {
  return (
    <div className='button' onClick={onClick}>
      <i className={`bx bx-${shape}`}></i>
      <br />
      {children}
    </div>
  );
}

function Laps({ laps }) {
  return (
    <div className='laps'>
      {laps.map((lap, index) => (
        <Lap key={index} lapTime={lap} index={index + 1} />
      ))}
    </div>
  );
}

function Lap({ lapTime, index }) {
  const hours = Math.floor(lapTime / 3600);
  const minutes = Math.floor((lapTime % 3600) / 60);
  const seconds = Math.floor(lapTime % 60);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className='lap'>
      <p><span>{`Lap ${index}`}</span></p>
      <p><span>{`${formattedHours}:${formattedMinutes}:${formattedSeconds}`}</span></p>
    </div>
  );
}