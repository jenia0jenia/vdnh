import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from 'contexts/AnswerContext/AnswerContext';

import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { TNavParams } from './Functions';
import { getQuizFromJson } from 'utils';
import { TQuizPleaseQuestion } from 'types/quizplease';
// import quizplease from 'data/quizplease';

function QuizPleaseHeader() {
  const { answers } = useAnswers();
  const dispatch = useAnswersDispatch();
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);
  const [question, setQuestion] = useState<TQuizPleaseQuestion>();
  const [quizplease, setQuizplease] = useState<any>();
  useEffect(() => {
    if (_id === 0) {
      dispatch && dispatch({ action: 'reset' });
    }
    (async () => {
      const quizplease = await getQuizFromJson();
      setQuizplease(quizplease);
      setQuestion(quizplease[quizname].questions[_id]);
    })();
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
                    if (window.confirm('Вы уверены?')) {
                      dispatch && dispatch({ action: 'reset' });
                      navigate(`/quizplease/${quizname}/0`);
                    }
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
                    if (window.confirm('Вы уверены?')) {
                      dispatch && dispatch({ action: 'reset' });
                      navigate('/quizplease');
                    }
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
