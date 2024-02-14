import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from 'contexts/AnswerContext/AnswerContext';

import { useContext } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import quizplease from 'data/quizplease';
import { TNavParams } from './Functions';
import Confetti from './Confetti';
import video from 'assets/video.mp4';

function QuizPleaseResult() {
  const navigate = useNavigate();

  return (
    <>
      <div className='container m-auto'>
        <div className='quizplease__result'>
          <div className='basis-3/4'>
            <Confetti></Confetti>
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
            <Link to="/quizplease" className='answer__back-button'>К выбору викторины</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPleaseResult;
