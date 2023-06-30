/* eslint-disable import/prefer-default-export */
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';

function getDisplayTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
  });
}

export const Home = () => {
  const [clockText, setClockText] = useState(getDisplayTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockText(getDisplayTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fechaActual = format(new Date(), 'PPPP', { locale: es });
  return (
    <div className="background">
      <div className="hero__title2">
        {fechaActual.toLocaleUpperCase()}
      </div>
      <div className="hero__title">
        {clockText}
      </div>
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </div>
  );
};
