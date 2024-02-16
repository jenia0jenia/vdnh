import AnswerContext from 'contexts/AnswerContext/AnswerContext';

import { useContext, useEffect, useState } from 'react';
// import quizplease from 'data/quizplease';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { TQuizPleaseQuestion } from 'types/quizplease';
import { getQuizFromJson } from 'utils';
import { TNavParams } from './Functions';

function QuizPleaseList() {
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);

  // const [question, setQuestion] = useState<TQuizPleaseQuestion>();
  const [quizplease, setQuizplease] = useState<any>();
  useEffect(() => {
    (async () => {
      const quizplease = await getQuizFromJson();
      setQuizplease(quizplease);
      // setQuestion(quizplease[quizname].questions[_id]);
    })();
  }, []);
  return (
    <>
      {quizplease && (
        <div className='quizplease__list-wrapper'>
          <div className='quizplease__list'>
            {Object.keys(quizplease).map((key, i) => {
              const {
                name,
                slug: quizname,
                color = '',
                text_before,
              } = quizplease[key];
              return (
                <div
                  onClick={(e) => {
                    text_before
                      ? navigate(`${quizname}/hello`)
                      : navigate(`${quizname}/0`);
                  }}
                  key={i}
                  className='quizplease__item'
                  style={{ backgroundColor: color }}
                >
                  <div className='quizplease__item-text'>{name}</div>
                </div>
              );
            })}
          </div>
          <div className='scroller'></div>
        </div>
      )}
    </>
  );
}

export default QuizPleaseList;
