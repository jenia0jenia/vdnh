import { useNavigate, useParams } from 'react-router-dom';
// import quizplease from 'data/quizplease';
import { useContext, useEffect, useState } from 'react';
import {
  useQuizPlease,
  useAnswersDispatch,
} from 'contexts/QuizPleaseContext/QuizPleaseContext';
import { TNavParams } from './Functions';
import Confetti from './Confetti';
import { getQuizFromJson } from 'utils';
import {
  TQuizPlease,
  TQuizPleaseOption,
  TQuizPleaseQuestion,
} from 'types/quizplease';

function Answer() {
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const navigate = useNavigate();
  const _id = Number(id);

  const [question, setQuestion] = useState<TQuizPleaseQuestion>();
  const [options, setOptions] = useState<TQuizPleaseOption[]>();
  const { quizplease } = useQuizPlease();
  useEffect(() => {
    setQuestion(quizplease[quizname].questions[_id]);
    setOptions(quizplease[quizname].questions[_id].options);
    console.log(quizplease[quizname].questions[_id].options[0]);
  }, []);
  return (
    <>
      <Confetti></Confetti>
      {/* <h1 className="text-3xl mb-4">{question.title}</h1> */}
      {/* <h2 className='text-lg'>Это правильный ответ =)</h2> */}
      <div className='answer'>
        <div className=''>
          {quizplease && question && (
            <>
              <div className='answer__inner'>
                {options && options[0].image_answer && (
                  <div className='answer__image-list'>
                    {options.map((option, i) => {
                      return (
                        <div className='answer__image' key={i}>
                          <img src={`/quiz/${option.image_answer}`} alt='' />
                          {option.text_answer && (
                            <div className='answer__image-caption'>
                              {option.text_answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {question.images_answer && (
                  <div className='answer__image-list'>
                    {question.images_answer.map((image, i) => {
                      return (
                        <div className='answer__image' key={i}>
                          <img src={`/quiz/${image}`} alt='' />
                        </div>
                      );
                    })}
                  </div>
                )}
                {question.text_answer &&
                  typeof question.text_answer === 'string' && (
                    <div
                      className='text-card text-card--violet'
                      dangerouslySetInnerHTML={{
                        __html: question.text_answer || '',
                      }}
                    ></div>
                  )}
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
                  {quizplease[quizname].questions.length - 1 === _id
                    ? `Завершить!`
                    : `Следующий вопрос`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Answer;
