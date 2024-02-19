import QuizPleaseContext, {
  useQuizPlease,
  useAnswersDispatch,
} from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
// import quizplease from 'data/quizplease';
import { TNavParams } from './Functions';
import { getQuizFromJson } from 'utils';
import { TQuizPleaseQuestion } from 'types/quizplease';

function QuizPleaseHello() {
  const navigate = useNavigate();
  const { slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const { quizplease } = useQuizPlease();
  return (
    <>
      {quizplease && (
        <div className='container m-auto'>
          <div className='quizplease__info'>
            {quizplease && (
              <div className='quizplease__info-left'>
                <h1 className='quizplease__info-title h1'>
                  {quizplease[quizname].name}
                </h1>
                <div className='quizplease__info-rectangle'>
                  <div className='quizplease__info-description-one'>
                    {quizplease[quizname].text_before}
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
            )}
            <div className='quizplease__info-right'>
              <div className='quizplease__info-image'>
                <img src='/images/stella_green.svg' alt='' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizPleaseHello;
