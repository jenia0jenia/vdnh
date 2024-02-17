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
