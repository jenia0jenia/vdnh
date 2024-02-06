import Embed from "flat-embed";
import { useEffect, useState } from "react";

import notes from "data/notes";

function Nota(...props: any[]) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(notes[0].name);

  useEffect(function () {
    loadNote(notes[0]);
  }, []);

  window.addEventListener("resize", onResize);
  window.dispatchEvent(new Event("resize"));

  function loadNote(note: {
    mxl: string;
    name: string;
    image?: string;
    volume?: number;
    speed?: number;
  }): import("react").MouseEventHandler<HTMLDivElement> | undefined {
    document.getElementById("embed-container")?.remove();
    const parent = document.getElementById("embed-parent");

    if (parent) {
      let container = document.createElement("div");
      container.classList.add("embed-container");
      container.id = "embed-container";
      parent?.appendChild(container);
      setLoading(true);
      setTitle("");
      const embed = new Embed(container, {
        height: "700",
        embedParams: {
          locale: "ru",
          hideTempo: true,
          branding: false,
          themePrimary: "#E53935",
          hideFlatPlayback: false,
          appId: "654c9b88ed732934d03558ac",
          controlsFullscreen: false,
          controlsZoom: false,
          zoom: 1,
          controlsPosition: "top",
        },
      });

      fetch("/mxl/" + note.mxl)
        .then(function (response) {
          return response.arrayBuffer();
        })
        .then(function (mxl) {
          return embed.loadMusicXML(new Uint8Array(mxl));
        })
        .then(function () {
          embed.setPlaybackSpeed(note.speed || 0.8).then(function () {});
          embed.setMasterVolume({ volume: note.volume || 60 });
          setTitle(note.name);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);

          // Unable to load the score
        });
    }
    return;
    // throw new Error("Function not implemented.");
  }

  function onResize(this: Window, ev: UIEvent): any {
    const notes = document.getElementById("notes");
    const logo = document.getElementById("logo");
    // console.log(document.body.clientHeight);
    // console.log(logo?.offsetHeight);
    // console.log(window.innerHeight);

    if (notes && logo) {
      notes.style.height =
        document.body.offsetHeight - logo?.offsetHeight - 24 + "px";
    }
  }

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
                      loadNote(note);
                    }}
                    key={i}
                  >
                    {note.image ? <img src={"/images/notes/" + note.image} alt={note.name} /> : <div className="note__noimage">{note.name}</div> }
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

          <div id="embed-parent"></div>
        </div>
      </div>
    </div>
  );
}

export default Nota;
