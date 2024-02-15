import Map from "../Map/Map";
import Top from "../Top/Top";
import PerMinute from "../PerMinute/PerMinute";
import { getValidDate } from "utils";
import "./stat.css";

function App() {
  const today = new Date();
  const dateFrom = getValidDate(today);
  const dateTo = getValidDate(today);

  let activeElement: HTMLElement | null = null;

  const toggleAndHide = (className: string) => {
    const element = document.querySelector(className);
    if (element) {
      if (activeElement) {
        activeElement.classList.add('hidden');
      }
      element.classList.remove('hidden');
      activeElement = element as HTMLElement;
    }
  };

  return (
    <>
      <div className="Stat">
        <button className="my-button" onClick={() => toggleAndHide('.del')}>
          Количество книговыдач сегодня
        </button>
        <button className="my-button" onClick={() => toggleAndHide('.del1')}>
          Зарегистрированных читателей сегодня
        </button>
        <button className="my-button" onClick={() => toggleAndHide('.del2')}>
        Объём фонда 
        </button>
        <button className="my-button" onClick={() => toggleAndHide('.del3')}>
          Книги по количеству выдач
        </button>
        <button className="my-button" onClick={() => toggleAndHide('.del4')}>
          Книговыдача в минуту
        </button>
      </div>
      <div>
        <div className="hidden del">
          <Map property="kv" title="Количество книговыдач сегодня" />
        </div>
        <div className="hidden del1">
          <Map property="newR" title="Зарегистрированных читателей сегодня" />
        </div>
        <div className="hidden del2">
          <Map property="nekz" title="Объём фонда" />
        </div>
        <div className="hidden del3">
          <Top dateFrom={dateFrom} dateTo={dateTo} />
        </div>
        <div className="hidden del4">
          <PerMinute />
        </div>
      </div>
    </>
  );
}

export default App;