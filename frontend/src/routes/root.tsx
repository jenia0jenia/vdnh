import "App.css";
import { NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="">
        <div className="">
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink className="menu__link" to="/quizplease/">
                  Викторина
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="menu__link" to="/stat/">
                  Статистика
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="menu__link" to="/notes/">
                  Ноты
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* <nav className="nav">
            <ul className="flex h-svh">
                <li className="w-1/2 nav__left nav__item">
                    <a className="nav__link hover-animation" href="/stat/">Статистика</a>
                </li>
                <li className="w-1/2 nav__right nav__item">
                    <a className="nav__link hover-animation" href="/notes/">Ноты</a>
                </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </>
  );
}
