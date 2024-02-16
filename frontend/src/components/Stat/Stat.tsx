import Map from '../Map/Map';
import Top from '../Top/Top';
import PerMinute from '../PerMinute/PerMinute';
import { getValidDate } from 'utils';
import './stat.css';
import { useState } from 'react';

function App() {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);
  const [currentStat, setCurrentStat] = useState<number>(0);

  return (
    <>
      <div className='Stat'>
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
