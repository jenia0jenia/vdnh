import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { apiRequest } from "../../services/API/API";

import "./Top.css";
import { TopOptions } from "./options";
import { getValidDate } from "../../utils";

interface ITopProps {
  dateFrom: string | null;
  dateTo: string | null;
}

interface IBook {
  k: number;
  cover: string;
}

function Top(props: ITopProps | undefined) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [topBooks, setTopBooks] = useState<IBook[]>([]);
  const today = new Date();

  useEffect(() => {
    const bookContainer: HTMLElement | null =
      document.getElementById("bookContainer");
    console.log(bookContainer);

    apiRequest(
      "/rating/get?",
      {},
      {
        dateFrom: props?.dateFrom || getValidDate(today),
        dateTo: props?.dateFrom || getValidDate(today),
      }
    )?.then((data: IBook[]) => {
      console.log(data);
      setTopBooks(data);
    });
  }, []);

  return (
    <div className="Top">
      <h2 className="title">Книги по количеству выдач</h2>
      <div className="flex" id="bookContainer">
        {topBooks.map((book, i) => {
          return (
            <div className="book" key={i}>
              <div className="book-count">
                <span className="book-count-digit">{book.k}</span>
              </div>
              <img src={book.cover} height={120 + book.k * 10} />
            </div>
          );
        })}
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
