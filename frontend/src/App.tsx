// import React, { useEffect, useRef } from "react";

import Map from "./components/Map/Map";
import Top from "./components/Top/Top";
import PerMinute from "./components/PerMinute/PerMinute";
// import Nota from "./components/Nota/Nota";

import Nota2 from "./components/Nota2/Nota2";

import "./App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getValidDate } from "./utils";

function App() {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);

  return (
    <div className="App">
      {/* <Nota2></Nota2> */}

      {/* <Nota></Nota> */}

      <PerMinute />
    </div>
  );
}

export default App;
