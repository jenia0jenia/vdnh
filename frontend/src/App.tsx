import React, { useEffect, useRef, ReactNode } from "react";

import Map from "./components/Map/Map";
import Top from "./components/Top/Top";
import PerMinute from "./components/PerMinute/PerMinute";
// import Nota from "./components/Nota/Nota";
import AnswerContext from "./contexts/AnswerContext/AnswerContext";

import Nota2 from "./components/Nota2/Nota2";

import "./App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getValidDate } from "./utils";

interface IProps {
  children: ReactNode;
}

function App({ children }: IProps) {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);

  return (
    <div className="App">
      { children }
      {/* <Nota2></Nota2> */}

      {/* <Nota></Nota> */}

    </div>
  );
}

export default App;
