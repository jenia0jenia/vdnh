import React, { useEffect, useRef, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { apiRequest } from 'services/API/API';

import './Top.css';
import { TopOptions } from './options';
import { getValidDate } from 'utils';
import { FTP_BASE_URL } from '../../constants/index';
import { BASE_URL } from '../../constants';

interface ITopProps {
  dateFrom: string | undefined;
  dateTo: string | undefined;
}

interface IBook {
  k: number;
  cover: string;
}

function Top({ ...props }) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>();
  const [topBooks, setTopBooks] = useState<IBook[]>([]);
  const today = new Date();

  useEffect(() => {
    const bookContainer: HTMLElement | null =
      document.getElementById('bookContainer');

    apiRequest(
      '/rating/get?',
      {},
      {
        dateFrom: props.dateFrom || getValidDate(today),
        dateTo: props.dateFrom || getValidDate(today),
      }
    )?.then((data: IBook[]) => {
      setTopBooks(data);
    });
  }, []);

  return (
    <div className='Top'>
      <h2 className='title'>Книги по количеству выдач</h2>
      <div className='w-full m-auto mb-14'>
        <div className='flex overflow-x-auto px-10' id='bookContainer'>
          {topBooks.map((book, i) => {
            const cover =
              !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
                ? book.cover.replace(FTP_BASE_URL, BASE_URL)
                : book.cover.replace(FTP_BASE_URL, '');

            return (
              <div className='book' key={i}>
                <div className='book-count'>
                  <span className='book-count-digit'>{book.k}</span>
                </div>
                <img src={cover} height={120 + book.k * 10} width={200} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <HighchartsReact
        highcharts={Highcharts}
        options={TopOptions}
        allowChartUpdate={true}
        ref={chartComponentRef}
        // {...props}
      /> */}
    </div>
  );
}

export default Top;
