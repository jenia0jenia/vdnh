import Embed from 'flat-embed';
import { useEffect, useState } from 'react';

import notes from 'data/notes';
import {
  AlphaTabApi,
  LayoutMode,
  LogLevel,
  PlayerSettings,
  RenderingResources,
  Settings,
  StaveProfile,
} from '@coderline/alphatab';

import './Nota.css';
import { alphatab } from './script';

function Nota(...props: any[]) {
  const [loading, setLoading] = useState(false);
  const [currentNote, setNota] = useState({
    id: 0,
    title: notes[0].name,
    source: notes[0].source,
    active: true,
  });

  let alphatabApi: AlphaTabApi;

  useEffect(function () {
    alphatabApi = alphatab(currentNote.source);
  }, []);

  useEffect(
    function () {
      // alphatabApi && alphatabApi.load();
    },
    [currentNote]
  );

  return (
    <div className='nota-page__wrapper'>
      <div className='container m-auto'>
        <div className='nota-page'>
          <div className='notes-side'>
            <div className='logo pb-8' id='logo'>
              <img className='' src='/logo.svg' alt='logo' />
            </div>
            <div
              className={'no-text' + (loading ? ' loading loading--blank' : '')}
            >
              <div className='overflow-auto'>
                <div className='notes__list' id='notes'>
                  {notes.map((note, i) => {
                    return (
                      <div
                        className={'note' + (note.id === i ? ' is-active' : '')}
                        onClick={(e) => {
                          setNota({
                            id: note.id,
                            title: note.name,
                            active: true,
                            source: note.source,
                          });
                        }}
                        key={i}
                      >
                        {note.image ? (
                          <img
                            src={'/images/notes/' + note.image}
                            alt={note.name}
                          />
                        ) : (
                          <div className='note__noimage'>{note.name}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className='w-3/4'>
            <div className='flex flex-col'>
              <div className='text-info'>
                <p>
                  Перед вами результат оцифровки произведений всем известных
                  композиторов. Эту трудную работу сделал робот. Теперь мы можем
                  прослушать то, что раньше было записано на бумаге.
                </p>
                <br />
                <p>
                  Конечно, робот не понимает музыку так, как понимает её
                  человек, поэтому не все ноты оцифрованы правильно. Робот ещё
                  пока учиться!
                </p>
                <br />
                <p>Выберите композицию и нажмите "Play"!</p>
              </div>
            </div>

            <div className={'w-full pt-8 px-8' + (loading ? ' loading' : '')}>
              <h1 className='notes__h1'>{currentNote.title}</h1>

              <div className='at-wrap'>
                <div className='at-overlay'>
                  <div className='at-overlay-content'>
                    Music sheet is loading
                  </div>
                </div>
                <div className='at-content'>
                  <div className='at-sidebar'>
                    <div className='at-sidebar-content'>
                      <div className='at-track-list'></div>
                    </div>
                  </div>
                  <div className='at-viewport'>
                    <div className='at-main'></div>
                  </div>
                </div>
                <div className='at-controls'>
                  <div className='at-controls-left'>
                    <a className='btn at-player-stop disabled'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='backward-step'
                        className='svg-inline--fa fa-backward-step'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 320 512'
                      >
                        <path
                          fill='currentColor'
                          d='M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z'
                        ></path>
                      </svg>
                    </a>
                    <a className='btn at-player-play-pause disabled'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='play'
                        className='svg-inline--fa fa-play'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 384 512'
                      >
                        <path
                          fill='currentColor'
                          d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z'
                        ></path>
                      </svg>
                    </a>
                    <span className='at-player-progress'>0%</span>
                    <div className='at-song-info'>
                      <span className='at-song-title'></span> -
                      <span className='at-song-artist'></span>
                    </div>
                    <div className='at-song-position'>00:00 / 00:00</div>
                  </div>
                  <div className='at-controls-right'>
                    <a className='btn toggle at-count-in'>
                      <i className='fas fa-hourglass-half'></i>
                    </a>
                    <a className='btn at-metronome'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='pen-to-square'
                        className='svg-inline--fa fa-pen-to-square'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                      >
                        <path
                          fill='currentColor'
                          d='M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z'
                        ></path>
                      </svg>
                    </a>
                    <a className='btn at-loop'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='retweet'
                        className='svg-inline--fa fa-retweet'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 640 512'
                      >
                        <path
                          fill='currentColor'
                          d='M614.2 334.8C610.5 325.8 601.7 319.1 592 319.1H544V176C544 131.9 508.1 96 464 96h-128c-17.67 0-32 14.31-32 32s14.33 32 32 32h128C472.8 160 480 167.2 480 176v143.1h-48c-9.703 0-18.45 5.844-22.17 14.82s-1.656 19.29 5.203 26.16l80 80.02C499.7 445.7 505.9 448 512 448s12.28-2.344 16.97-7.031l80-80.02C615.8 354.1 617.9 343.8 614.2 334.8zM304 352h-128C167.2 352 160 344.8 160 336V192h48c9.703 0 18.45-5.844 22.17-14.82s1.656-19.29-5.203-26.16l-80-80.02C140.3 66.34 134.1 64 128 64S115.7 66.34 111 71.03l-80 80.02C24.17 157.9 22.11 168.2 25.83 177.2S38.3 192 48 192H96V336C96 380.1 131.9 416 176 416h128c17.67 0 32-14.31 32-32S321.7 352 304 352z'
                        ></path>
                      </svg>
                    </a>
                    <a className='btn at-print'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='retweet'
                        className='svg-inline--fa fa-retweet'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 640 512'
                      >
                        <path
                          fill='currentColor'
                          d='M614.2 334.8C610.5 325.8 601.7 319.1 592 319.1H544V176C544 131.9 508.1 96 464 96h-128c-17.67 0-32 14.31-32 32s14.33 32 32 32h128C472.8 160 480 167.2 480 176v143.1h-48c-9.703 0-18.45 5.844-22.17 14.82s-1.656 19.29 5.203 26.16l80 80.02C499.7 445.7 505.9 448 512 448s12.28-2.344 16.97-7.031l80-80.02C615.8 354.1 617.9 343.8 614.2 334.8zM304 352h-128C167.2 352 160 344.8 160 336V192h48c9.703 0 18.45-5.844 22.17-14.82s1.656-19.29-5.203-26.16l-80-80.02C140.3 66.34 134.1 64 128 64S115.7 66.34 111 71.03l-80 80.02C24.17 157.9 22.11 168.2 25.83 177.2S38.3 192 48 192H96V336C96 380.1 131.9 416 176 416h128c17.67 0 32-14.31 32-32S321.7 352 304 352z'
                        ></path>
                      </svg>
                    </a>
                    <div className='at-zoom'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='fas'
                        data-icon='magnifying-glass'
                        className='svg-inline--fa fa-magnifying-glass'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                      >
                        <path
                          fill='currentColor'
                          d='M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z'
                        ></path>
                      </svg>
                      <select defaultValue={'100'}>
                        <option value='25'>25%</option>
                        <option value='50'>50%</option>
                        <option value='75'>75%</option>
                        <option value='90'>90%</option>
                        <option value='100'>100%</option>
                        <option value='110'>110%</option>
                        <option value='125'>125%</option>
                        <option value='150'>150%</option>
                        <option value='200'>200%</option>
                      </select>
                    </div>
                    <div className='at-layout'>
                      <select defaultValue={'page'}>
                        <option value='horizontal'>Horizontal</option>
                        <option value='page'>Page</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <template id='at-track-template'>
                <div className='at-track'>
                  <div className='at-track-icon'>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='fas'
                      data-icon='guitar'
                      className='svg-inline--fa fa-guitar '
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='currentColor'
                        d='M502.7 39.02L473 9.37c-12.5-12.5-32.74-12.49-45.24 .0106l-46.24 46.37c-3.875 3.875-6.848 8.506-8.598 13.76l-12.19 36.51L284.5 182.3C272.4 173.5 259 166.5 244.4 163.1C211 155.4 177.4 162.3 154.5 185.1C145.3 194.5 138.3 206 134.3 218.6C128.3 237.1 111.1 251.3 92.14 253C68.52 255.4 46.39 264.5 29.52 281.5c-45.62 45.5-37.38 127.5 18.12 183c55.37 55.38 137.4 63.51 182.9 18c16.1-16.88 26.25-38.85 28.5-62.72c1.75-18.75 15.84-36.16 34.47-42.16c12.5-3.875 24.03-10.87 33.4-20.25c22.87-22.88 29.75-56.38 21.1-89.76c-3.375-14.63-10.39-27.99-19.14-40.11l76.25-76.26l36.53-12.17c5.125-1.75 9.894-4.715 13.77-8.59l46.36-46.29C515.2 71.72 515.2 51.52 502.7 39.02zM208 352c-26.5 0-48-21.5-48-48c0-26.5 21.5-48 48-48s47.1 21.5 47.1 48C256 330.5 234.5 352 208 352z'
                      ></path>
                    </svg>
                  </div>
                  <div className='at-track-details'>
                    <div className='at-track-name'></div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nota;
