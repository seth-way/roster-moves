import './App.css';
import React, { useState, useEffect } from 'react';
import Field from './components/Field';
import TeamSelector from './components/TeamSelector';

const calculateSeason = (scrollY, innerHeight) => {
  const scrolls = Math.floor(scrollY / innerHeight);
  return 2022 - scrolls;
};

const App = () => {
  const [innerHeight, updateInnerHeight] = useState(window.innerHeight);
  const [innerWidth, updateInnerWidth] = useState(window.innerWidth);
  const [season, updateSeason] = useState(2022);

  const onScroll = e => {
    const current = calculateSeason(window.scrollY, innerHeight);
    updateSeason(current);
  };

  const onResize = e => {
    updateInnerHeight(window.innerHeight);
    updateInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
  }, []);

  return (
    <div className='App'>
      <div className='Floating'>
        <div>{`Season: ${season}`}</div>
        <TeamSelector innerWidth={innerWidth} />
        <Field />
      </div>
    </div>
  );
};

export default App;
