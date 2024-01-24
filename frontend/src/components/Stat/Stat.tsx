import Map from "../Map/Map";
import Top from "../Top/Top";
import PerMinute from "../PerMinute/PerMinute";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getValidDate } from "../../utils";

function App() {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);

  return (
    <div className="Stat">

      <Map property="kv" title="Количество книговыдач сегодня" />

      <Map property="newR" title="Зарегистрированных читателей сегодня" />

      <Map property="nekz" title="Объём фонда" />

      <Top dateFrom={dateFrom} dateTo={dateTo} />

      <PerMinute />
    </div>
  );
}

export default App;
