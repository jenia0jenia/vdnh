import { useNavigate, useParams } from 'react-router-dom';
import quizplease from 'data/quizplease';
import { useContext, useState } from 'react';
import {
  useAnswers,
  useAnswersDispatch,
} from 'contexts/AnswerContext/AnswerContext';
import { TNavParams } from './Functions';
import Confetti from './Confetti';

function Answer() {
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const navigate = useNavigate();
  const _id = Number(id);
  const question = quizplease[quizname].questions[_id];
  return (
    <>
      <Confetti></Confetti>
      {/* <h1 className="text-3xl mb-4">{question.title}</h1> */}
      <h2 className='text-lg'>Это правильный ответ =)</h2>
      <div className='answer'>
        <div className='max-w-screen-md m-auto p-8'>
          <div
            className='text-card text-card--violet'
            dangerouslySetInnerHTML={{ __html: question.text_answer || '' }}
          ></div>
          <button
            className='answer__back-button'
            onClick={(e) => {
              if (quizplease[quizname].questions.length - 1 <= _id) {
                navigate(`/quizplease/${quizname}/result`);
              } else {
                navigate(`/quizplease/${quizname}/${_id + 1}`);
              }
            }}
          >
            {quizplease[quizname].questions.length - 1 <= _id ? `Завершить!` : `Следующий вопрос`}
          </button>
        </div>
      </div>
    </>
  );
}

export default Answer;
