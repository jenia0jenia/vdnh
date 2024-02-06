import Embed from "flat-embed";
import { useEffect, useState } from "react";

import notes from "data/notes";
import {
  AlphaTabApi,
  LayoutMode,
  LogLevel,
  PlayerSettings,
  RenderingResources,
  Settings,
  StaveProfile,
} from "@coderline/alphatab";

import "./Nota.css";
import { alphatab } from "./script";

function Nota(...props: any[]) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(notes[0].name);

  useEffect(function () {
    alphatab();
  }, []);

  return (
    <div className="nota-page">
      <div className="w-1/5 flex flex-col">
        <div className="logo pb-8" id="logo">
          <img className="" src="/logo.svg" alt="logo" />
        </div>
        <div
          className={
            "notes-side no-text" + (loading ? " loading loading--blank" : "")
          }
        >
          <div className="overflow-auto">
            <div className="notes__list" id="notes">
              {notes.map((note, i) => {
                return (
                  <div
                    className="note"
                    onClick={(e) => {
                      Array.from(
                        document.getElementsByClassName("note")
                      ).forEach((el) => {
                        el.classList.remove("is-active");
                      });
                      e.currentTarget.classList.add("is-active");
                    }}
                    key={i}
                  >
                    {note.image ? (
                      <img
                        src={"/images/notes/" + note.image}
                        alt={note.name}
                      />
                    ) : (
                      <div className="note__noimage">{note.name}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4">
        <div className="flex flex-col">
          <div className="text">
            <p>
              Перед вами результат оцифровки произведений всем известных
              композиторов. Эту трудную работу сделал робот. Теперь мы можем
              прослушать то, что раньше было записано на бумаге.
            </p>
            <br />
            <p>
              Конечно, робот не понимает музыку так, как понимает её человек,
              поэтому не все ноты оцифрованы правильно. Робот ещё пока учиться!
            </p>
            <br />
            <p>Выберите композицию и нажмите "Play"!</p>
          </div>
        </div>

        <div className={"w-full pt-8 px-8" + (loading ? " loading" : "")}>
          <h1 className="notes__h1">{title}</h1>

          <div className="at-wrap">
            <div className="at-overlay">
              <div className="at-overlay-content">Music sheet is loading</div>
            </div>
            <div className="at-content">
              <div className="at-sidebar">
                <div className="at-sidebar-content">
                  <div className="at-track-list"></div>
                </div>
              </div>
              <div className="at-viewport">
                <div className="at-main"></div>
              </div>
            </div>
            <div className="at-controls">
              <div className="at-controls-left">
                <a className="btn at-player-stop disabled">
                  <i className="fas fa-step-backward"></i>
                </a>
                <a className="btn at-player-play-pause disabled">
                  <i className="fas fa-play"></i>
                </a>
                <span className="at-player-progress">0%</span>
                <div className="at-song-info">
                  <span className="at-song-title"></span> -
                  <span className="at-song-artist"></span>
                </div>
                <div className="at-song-position">00:00 / 00:00</div>
              </div>
              <div className="at-controls-right">
                <a className="btn toggle at-count-in">
                  <i className="fas fa-hourglass-half"></i>
                </a>
                <a className="btn at-metronome">
                  <i className="fas fa-edit"></i>
                </a>
                <a className="btn at-loop">
                  <i className="fas fa-retweet"></i>
                </a>
                <a className="btn at-print">
                  <i className="fas fa-print"></i>
                </a>
                <div className="at-zoom">
                  <i className="fas fa-search"></i>
                  <select defaultValue={"100"}>
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                    <option value="90">90%</option>
                    <option value="100">100%</option>
                    <option value="110">110%</option>
                    <option value="125">125%</option>
                    <option value="150">150%</option>
                    <option value="200">200%</option>
                  </select>
                </div>
                <div className="at-layout">
                  <select defaultValue={"page"}>
                    <option value="horizontal">Horizontal</option>
                    <option value="page">Page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <template id="at-track-template">
            <div className="at-track">
              <div className="at-track-icon">
                <i className="fas fa-guitar"></i>
              </div>
              <div className="at-track-details">
                <div className="at-track-name"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  );
}

export default Nota;
