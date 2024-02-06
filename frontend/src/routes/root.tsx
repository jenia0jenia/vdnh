import "App.css";
import { NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="grid grid-cols-12 p-8">
        <div className="col-span-12 sm:col-span-12 lg:col-start-5 lg:col-span-4">
          <nav className="menu margin-auto">
            <ul className="grid grid-cols-12 gap-4 menu__list">
              <li className="menu__item col-span-12 sm:col-span-12 lg:col-span-4">
                <NavLink className="menu__link" to="/quizplease/">
                  Викторина
                </NavLink>
              </li>
              <li className="menu__item col-span-12 sm:col-span-12 lg:col-span-4">
                <NavLink className="menu__link" to="/stat/">
                  Статистика
                </NavLink>
              </li>
              <li className="menu__item col-span-12 sm:col-span-12 lg:col-span-4">
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
