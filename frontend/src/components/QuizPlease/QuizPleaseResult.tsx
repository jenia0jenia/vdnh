import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from 'contexts/AnswerContext/AnswerContext';

import { useContext } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import quizplease, { TQuizPleaseResult } from 'data/quizplease';
import { TNavParams } from './Functions';
import Confetti from './Confetti';
import video from 'assets/video.mp4';

function getRandomResult(result: TQuizPleaseResult[] | undefined) {
  if (!result) return;

  return result[Math.floor(Math.random() * result.length)];
}

function QuizPleaseResult() {
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const result: TQuizPleaseResult | undefined = getRandomResult(
    quizplease[quizname].result
  );
  return (
    <>
      <div className='container m-auto'>
        <div className='quizplease__result'>
          <div className='basis-3/4'>
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
                  <video controls autoPlay muted>
                    <source src={video} type='video/mp4' />
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
                    <div className='quizplease__hello'>
                      <div className='basis-3/4'>
                        <h1 className='quizplease__hello-title h1'>
                          {result.title}
                        </h1>
                        <div className='quizplease__hello-rectangle'>
                          {result.subtitle && (
                            <div className='quizplease__hello-description-one'>
                              {result.subtitle}
                            </div>
                          )}
                          {result.text && (
                            <div
                              className='quizplease__hello-description-two'
                              dangerouslySetInnerHTML={{
                                __html: result.text || '',
                              }}
                            ></div>
                          )}
                          <button
                            onClick={(e) => {
                              navigate(`/quizplease/${quizname}/0`);
                            }}
                            className='quizplease__hello-start'
                          >
                            <span>Пройти ещё раз</span>
                          </button>
                        </div>
                      </div>
                      <div className='quizplease__hello-image'>
                        {result.image ? (
                          <img src={`/q/${result.image}`} alt='' />
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
        </div>
      </div>
    </>
  );
}

export default QuizPleaseResult;
