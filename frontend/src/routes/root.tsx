import "App.css";

export default function Root() {
  return (
    <>
      <nav className="nav">
        <ul className="flex h-svh">
            <li className="w-1/2 nav__left nav__item">
                <a className="nav__link hover-animation" href="/stat/">Статистика</a>
            </li>
            <li className="w-1/2 nav__right nav__item">
                <a className="nav__link hover-animation" href="/notes/">Ноты</a>
            </li>
        </ul>
      </nav>
    </>
  );
}
