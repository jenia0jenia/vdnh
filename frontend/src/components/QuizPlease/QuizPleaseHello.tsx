import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from 'contexts/AnswerContext/AnswerContext';

import { useContext } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import quizplease from 'data/quizplease';
import { TNavParams } from './Functions';

function QuizPleaseHello() {
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const text_before = quizplease[quizname].text_before;

  return (
    <>
      <div className='container m-auto'>
        <div className='quizplease__info'>
          <div className='quizplease__info-left'>
            <h1 className='quizplease__info-title h1'>
              {quizplease[quizname].name}
            </h1>
            <div className='quizplease__info-rectangle'>
              <div className='quizplease__info-description-one'>
                {text_before}
              </div>
              <button
                onClick={(e) => {
                  navigate(`/quizplease/${quizname}/0`);
                }}
                className='quizplease__info-start'
              >
                <span>Начать тест</span>
              </button>
            </div>
          </div>
          <div className='quizplease__info-right'>
            <div className='quizplease__info-image'>
              <img src='/images/stella_green.svg' alt='' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPleaseHello;
