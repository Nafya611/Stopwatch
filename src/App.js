import React, { useState, useEffect } from 'react';
import './index.css';

function Stopwatch({ isPlaying, count, setCount }) {
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCount(count++);
      }, 1000);
    } else if (!isPlaying && count !== 0) {
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

function Buttons({ isPlaying, togglePlaying }) {
  return (
    <div className='button-container'>
      <Button shape='circle' children={'lap'} />
      <Button className="pla" shape={isPlaying ? 'pause' : 'play'} children={isPlaying ? 'pause' : 'play'} onClick={togglePlaying} />
      <Button shape='reset' children={'reset'} />
    </div>
  );
}

function Button({ shape, children, onClick }) {
  return (
    <div className='button' onClick={onClick}>
      <i className={`bx bx-${shape}`}></i>
      <br />
      <span>{children}</span>
    </div>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className='container'>
      <Stopwatch isPlaying={isPlaying} count={count} setCount={setCount} />
      <Buttons isPlaying={isPlaying} togglePlaying={togglePlaying} />
    </div>
  );
}

export default App;