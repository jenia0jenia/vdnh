import QuizPleaseContext, {
  useQuizPlease,
  useAnswersDispatch,
} from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
// import quizplease from 'data/quizplease';
import { TNavParams } from './Functions';
import Confetti from './Confetti';
// import video from 'assets/video.mp4';
import { TQuizPleaseQuestion, TQuizPleaseResult } from 'types/quizplease';
import { getQuizFromJson } from 'utils';

function getRandomResult(result: TQuizPleaseResult[] | undefined) {
  if (!result) return;

  return result[Math.floor(Math.random() * result.length)];
}

function QuizPleaseResult() {
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);
  const [question, setQuestion] = useState<TQuizPleaseQuestion>();
  const [result, setResult] = useState<TQuizPleaseResult>();
  const { quizplease } = useQuizPlease();

  useEffect(() => {
    setQuestion(quizplease[quizname].questions[_id]);
    setResult(() => {
      return getRandomResult(quizplease[quizname].result);
    });
  }, []);

  useEffect(() => {
    const target = document
      .getElementById('video_element')
      ?.getElementsByTagName('source')[0] as HTMLSourceElement;

    if (target) {
      target.addEventListener('error', () => {
        target.parentElement?.remove();
      });
    }
  }, [quizplease]);
  return (
    <>
      <div className='container m-auto'>
        <div className='quizplease__result'>
          {quizplease && (
            <div className='basis-3/4 mb-10'>
              <Confetti></Confetti>
              {quizplease[quizname].type !== 'test' && (
                <>
                  <h1 className='h1 text-center'>
                    Поздравляем! Вы ответили на все вопросы викторины!
                  </h1>
                  <div
                    className='video'
                    onCanPlay={(e) => {
                      // e.currentTarget;
                    }}
                  >
                    <video controls autoPlay muted id='video_element'>
                      <source src='/video.mp4' type='video/mp4' />
                      Your browser doesn't support HTML5 video tag.
                    </video>
                  </div>
                  <Link to='/quizplease' className='answer__back-button'>
                    К выбору викторины
                  </Link>
                </>
              )}
              {quizplease[quizname].type === 'test' && result && (
                <>
                  <div>
                    <div className='container m-auto'>
                      <div className='quizplease__info'>
                        <div className='basis-3/4'>
                          <h1 className='quizplease__info-title h1'>
                            {result.title}
                          </h1>
                          <div className='quizplease__info-rectangle'>
                            {result.subtitle && (
                              <div className='quizplease__info-description-one'>
                                {result.subtitle}
                              </div>
                            )}
                            {result.text && (
                              <div
                                className='quizplease__info-description-two'
                                dangerouslySetInnerHTML={{
                                  __html: result.text || '',
                                }}
                              ></div>
                            )}
                            <button
                              onClick={(e) => {
                                navigate(`/quizplease/${quizname}/0`);
                              }}
                              className='quizplease__info-start'
                            >
                              Пройти ещё раз
                            </button>
                          </div>
                        </div>
                        <div className='quizplease__info-image'>
                          {result.image ? (
                            <img src={`/quiz/${result.image}`} alt='' />
                          ) : (
                            <img src='/images/stella_green.svg' alt='' />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizPleaseResult;
