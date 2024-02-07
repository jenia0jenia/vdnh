import { AlphaTabApi, LayoutMode, synth } from "@coderline/alphatab";

export function alphatab() {
  const wrapper = document.querySelector(".at-wrap");
  const main = wrapper && wrapper.querySelector<HTMLElement>(".at-main");

  if (!wrapper || !main) throw "exception !wrapper || !main";

  // initialize alphatab
  const settings = {
    file: "/xml/n0001119.mvt1.xml",
    fontDirectory: "/font/",
    player: {
      enablePlayer: true,
      // soundFont: "/soundfont/sonivox.sf2",
      // soundFont: "/soundfont/wt_22khz.sf2",
      soundFont: "/soundfont/GeneralUser_GS.sf2",
      scrollElement: wrapper.querySelector(".at-viewport"),
    },
  };
  const api = new AlphaTabApi(main, settings);

  if (!api) throw "exception !api";

  // overlay logic
  const overlay = wrapper.querySelector<HTMLElement>(".at-overlay");

  if (!overlay) throw "exception !overlay";

  api.renderStarted.on(() => {
    overlay.style.display = "flex";
  });
  api.renderFinished.on(() => {
    overlay.style.display = "none";
  });

  // track selector
  function createTrackItem(track: any) {
    if (!document) throw "exception !document";

    const tmp = document.querySelector<HTMLMetaElement>("#at-track-template");
    const clone = tmp?.cloneNode(true);
    const trackItem = clone?.firstChild as HTMLElement;
    if (!trackItem) throw "exception !trackItem";
    const trackName = trackItem.querySelector<HTMLElement>(".at-track-name");
    if (!trackName) throw "exception !trackItem";

    trackName.innerText = track.name;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    trackItem.track = track;
    trackItem.onclick = (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      api.renderTracks([track]);
    };
    return trackItem;
  }

  const trackList = wrapper.querySelector(".at-track-list");
  if (!trackList) throw "exception trackList";

  api.scoreLoaded.on((score: { tracks: any[] }) => {
    // clear items
    trackList.innerHTML = "";
    // generate a track item for all tracks of the score
    score.tracks.forEach((track: any) => {
      trackList.appendChild(createTrackItem(track));
    });
  });
  api.renderStarted.on(() => {
    // collect tracks being rendered
    const tracks = new Map();
    api.tracks.forEach((t: { index: any }) => {
      tracks.set(t.index, t);
    });
    // mark the item as active or not
    const trackItems = trackList.querySelectorAll(".at-track");
    trackItems?.forEach((trackItem) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (tracks.has(trackItem.track.index)) {
        trackItem.classList.add("active");
      } else {
        trackItem.classList.remove("active");
      }
    });
  });

  /** Controls **/
  api.scoreLoaded.on((score: { title: any; artist: any }) => {
    const title = wrapper.querySelector<HTMLElement>(".at-song-title");
    if (title) title.innerText = score.title;

    const artist = wrapper.querySelector<HTMLElement>(".at-song-artist");
    if (artist) artist.innerText = score.artist;
  });

  const countIn = wrapper.querySelector<HTMLElement>(
    ".at-controls .at-count-in"
  );
  if (!countIn) throw "exception !countIn";
  countIn.onclick = () => {
    countIn.classList.toggle("active");
    if (countIn.classList.contains("active")) {
      api.countInVolume = 1;
    } else {
      api.countInVolume = 0;
    }
  };

  const metronome = wrapper.querySelector<HTMLElement>(
    ".at-controls .at-metronome"
  );
  if (!metronome) throw "exception !metronome";
  metronome.onclick = () => {
    metronome.classList.toggle("active");
    if (metronome.classList.contains("active")) {
      api.metronomeVolume = 1;
    } else {
      api.metronomeVolume = 0;
    }
  };

  const loop = wrapper.querySelector<HTMLElement>(".at-controls .at-loop");
  if (!loop) throw "exception !loop";
  loop.onclick = () => {
    loop.classList.toggle("active");
    api.isLooping = loop.classList.contains("active");
  };

  const print = wrapper.querySelector<HTMLElement>(".at-controls .at-print");
  if (!print) throw "exception !print";
  print.onclick = () => {
    api.print();
  };

  const zoom = wrapper.querySelector<HTMLElement>(
    ".at-controls .at-zoom select"
  );
  if (!zoom) throw "exception !zoom";
  zoom.addEventListener("change", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const zoomLevel = parseInt(zoom.value) / 100;
    api.settings.display.scale = zoomLevel;
    api.updateSettings();
    api.render();
  });

  const layout = wrapper.querySelector(".at-controls .at-layout select");
  if (!layout) throw "exception !layout";
  layout.addEventListener("change", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    switch (layout.value) {
      case "horizontal":
        api.settings.display.layoutMode = LayoutMode.Horizontal;
        break;
      case "page":
        api.settings.display.layoutMode = LayoutMode.Page;
        break;
    }
    api.updateSettings();
    api.render();
  });

  // player loading indicator
  const playerIndicator = wrapper.querySelector<HTMLElement>(
    ".at-controls .at-player-progress"
  );

  if (!playerIndicator) throw "exception !playerIndicator";

  api.soundFontLoad.on((e: { loaded: number; total: number }) => {
    const percentage = Math.floor((e.loaded / e.total) * 100);
    playerIndicator.innerText = percentage + "%";
  });
  api.playerReady.on(() => {
    playerIndicator.style.display = "none";
  });

  // main player controls
  const playPause = wrapper.querySelector<HTMLElement>(
    ".at-controls .at-player-play-pause"
  );
  const stop = wrapper.querySelector<HTMLElement>(
    ".at-controls .at-player-stop"
  );
  if (!playPause) throw "exception !playPause";
  playPause.onclick = (e) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    if (e.currentTarget.classList.contains("disabled")) {
      return;
    }
    api.playPause();
  };
  if (!stop) throw "exception !stop";
  stop.onclick = (e) => {
    const target = e.currentTarget;
    if (!target) return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (target.classList.contains("disabled")) {
      return;
    }
    api.stop();
  };
  api.playerReady.on(() => {
    playPause.classList.remove("disabled");
    stop.classList.remove("disabled");
  });
  api.playerStateChanged.on((e: { state: any }) => {
    if (e.state === synth.PlayerState.Playing) {
      playPause.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path></svg>';
    } else {
      playPause.innerHTML =
        '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"></path></svg>';
    }
  });

  // song position
  function formatDuration(milliseconds: number) {
    let seconds = milliseconds / 1000;
    const minutes = (seconds / 60) | 0;
    seconds = (seconds - minutes * 60) | 0;
    return (
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
  }

  const songPosition = wrapper.querySelector<HTMLElement>(".at-song-position");
  if (!songPosition) throw "exception !songPosition";
  let previousTime = -1;
  api.playerPositionChanged.on((e: { currentTime: number; endTime: any }) => {
    // reduce number of UI updates to second changes.
    const currentSeconds = (e.currentTime / 1000) | 0;
    if (currentSeconds === previousTime) {
      return;
    }

    songPosition.innerText =
      formatDuration(e.currentTime) + " / " + formatDuration(e.endTime);
  });
}
