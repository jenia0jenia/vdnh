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

function Nota(...props: any[]) {
  const [loading, setLoading] = useState(false);
  const [currentNota, setNota] = useState({
    id: 0,
    title: notes[0].name,
    source: notes[0].source,
    active: true,
  });

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
