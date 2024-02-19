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
import AlphaTab from './Alphatab';
import { useNavigate } from 'react-router-dom';

function Nota(...props: any[]) {
  const [loading, setLoading] = useState(false);
  const [currentNota, setNota] = useState({
    id: 0,
    title: notes[0].name,
    source: notes[0].source,
    active: true,
  });
  const navigate = useNavigate();

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

          <div className='w-3/4 text-left'>
            <button className={'p-6'} onClick={() => navigate('/')}>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fas'
                data-icon='retweet'
                className='svg-inline--fa fa-retweet'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 50 50'
                width='25px'
                height='25px'
              >
                <path
                  fill='#000'
                  d='M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z'
                />
              </svg>
              На главный экран
            </button>
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

            <AlphaTab
              key={currentNota.id}
              nota={currentNota}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nota;
