import Map from '../Map/Map';
import Top from '../Top/Top';
import PerMinute from '../PerMinute/PerMinute';
import { getValidDate } from 'utils';
import './stat.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);
  const [currentStat, setCurrentStat] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <>
      <div className='Stat'>
        <button className={''} onClick={() => navigate('/')}>
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='retweet'
            className='svg-inline--fa fa-retweet'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 50 50'
            width='25px'
            height='25px'
          >
            <path
              fill='#000'
              d='M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z'
            />
          </svg>
          На главный экран
        </button>
        <button
          className={'my-button' + (currentStat === 0 ? ' active' : '')}
          onClick={() => setCurrentStat(0)}
        >
          Количество книговыдач сегодня
        </button>
        <button
          className={'my-button' + (currentStat === 1 ? ' active' : '')}
          onClick={() => setCurrentStat(1)}
        >
          Зарегистрированных читателей сегодня
        </button>
        <button
          className={'my-button' + (currentStat === 2 ? ' active' : '')}
          onClick={() => setCurrentStat(2)}
        >
          Объём фонда
        </button>
        <button
          className={'my-button' + (currentStat === 3 ? ' active' : '')}
          onClick={() => setCurrentStat(3)}
        >
          Книги по количеству выдач
        </button>
        <button
          className={'my-button' + (currentStat === 4 ? ' active' : '')}
          onClick={() => setCurrentStat(4)}
        >
          Книговыдача в минуту
        </button>
      </div>
      <div>
        <div>
          {currentStat === 0 && (
            <Map property='kv' title='Количество книговыдач сегодня' />
          )}
        </div>
        <div>
          {currentStat === 1 && (
            <Map property='newR' title='Зарегистрированных читателей сегодня' />
          )}
        </div>
        <div>
          {currentStat === 2 && <Map property='nekz' title='Объём фонда' />}
        </div>
        <div className={'del3' + (currentStat !== 3 ? ' hidden' : '')}>
          <Top dateFrom={dateFrom} dateTo={dateTo} />
        </div>
        <div className={'del4' + (currentStat !== 4 ? ' hidden' : '')}>
          <PerMinute />
        </div>
      </div>
    </>
  );
}

export default App;
