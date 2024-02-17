import QuizPleaseContext, { useQuizPlease } from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useContext, useEffect, useState } from 'react';
// import quizplease from 'data/quizplease';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { TNavParams } from './Functions';
import { TQuizPleaseQuestion } from 'types/quizplease';
import { getQuizFromJson } from 'utils';

function QuestionList() {
  const { answers } = useQuizPlease();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);

  const navigate = useNavigate();
  const [question, setQuestion] = useState<TQuizPleaseQuestion>();
  const { quizplease } = useQuizPlease();
  useEffect(() => {
    setQuestion(quizplease[quizname].questions[_id]);
  }, []);
  return (
    <>
      <div className='container m-auto'>
        <div className='grid grid-cols-12 gap-8'>
          {quizplease && quizplease[0].questions.map(
            (question: TQuizPleaseQuestion, i: number) => {
              return (
                <div
                  className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
                  key={i}
                >
                  <button
                    onClick={(e) => {
                      answers[quizname] &&
                        answers[quizname][i] < 0 &&
                        navigate(i.toString());
                    }}
                    className={
                      'quizplease__item clip-path-button' +
                      (answers[quizname] && answers[quizname][i] < 0
                        ? ''
                        : ' disabled')
                    }
                  >
                    {question.title}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default QuestionList;
