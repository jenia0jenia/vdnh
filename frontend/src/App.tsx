import React, { useEffect, useRef, ReactNode } from 'react';

import Map from './components/Map/Map';
import Top from './components/Top/Top';
import PerMinute from './components/PerMinute/PerMinute';
import QuizPleaseContext from './contexts/QuizPleaseContext/QuizPleaseContext';

import Nota2 from './components/Nota2/Nota2';

import './App.css';
import './assets/css/fonts.css';
import './assets/css/fontawesome.css';

import { getValidDate } from './utils';

interface IProps {
  children: ReactNode;
}

function App({ children }: IProps) {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);

  return (
    <div className='App'>
      {children}
    </div>
  );
}

export default App;
