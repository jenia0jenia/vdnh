import AnswerContext from 'contexts/AnswerContext/AnswerContext';

import { useContext } from 'react';
import quizplease from 'data/quizplease';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function QuizPleaseList() {
  const navigate = useNavigate();
  return (
    <>
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
        <div className="scroller"></div>
      </div>
    </>
  );
}

export default QuizPleaseList;
