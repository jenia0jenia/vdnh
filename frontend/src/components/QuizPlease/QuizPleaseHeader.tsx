import {
  useQuizPlease,
  useAnswersDispatch,
} from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TNavParams } from './Functions';
// import quizplease from 'data/quizplease';

function QuizPleaseHeader() {
  const dispatch = useAnswersDispatch();
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);
  const { quizplease } = useQuizPlease();

  useEffect(() => {
    if (_id === 0) {
      dispatch && dispatch({ action: 'reset' });
    }
  }, []);
  return (
    <>
      <div className='quizplease__head'>
        <div className='container m-auto'>
          <div className='flex gap-8 justify-between'>
            <div className='quizplease__head-left flex gap-8'>
              <div className='quizplease__head-item'>
                <div
                  className='quizplease__again'
                  onClick={(e) => {
                    dispatch && dispatch({ action: 'reset' });
                    navigate(`/quizplease/${quizname}/0`);
                    // if (window.confirm('Вы уверены?')) {
                    // }
                  }}
                >
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
                  </svg>{' '}
                  Начать заново
                </div>
              </div>
              <div className='quizplease__head-item'>
                {quizplease && (
                  <div className='quizplease__stat'>
                    Ответов: {id ? id : quizplease[quizname].questions.length}/
                    {quizplease[quizname].questions.length}
                  </div>
                )}
              </div>
            </div>
            <div className='quizplease__head-right'>
              <div className='quizplease__head-item m--home'>
                <div
                  className='quizplease__home'
                  onClick={(e) => {
                    dispatch && dispatch({ action: 'reset' });
                    navigate('/');
                    // if (window.confirm('Вы уверены?')) {
                    // }
                  }}
                >
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
                    <path fill='#fff' d='M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z' />
                  </svg>
                  На главный экран
                </div>
              </div>
              <div className='quizplease__head-item m--home'>
                <div
                  className='quizplease__home'
                  onClick={(e) => {
                    dispatch && dispatch({ action: 'reset' });
                    navigate('/quizplease');
                    // if (window.confirm('Вы уверены?')) {
                    // }
                  }}
                >
                  К выбору викторины
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPleaseHeader;
