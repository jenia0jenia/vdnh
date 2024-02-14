import { useNavigate, useParams } from 'react-router-dom';
import quizplease, {
  TQuizPleaseOption,
  TQuizPleaseQuestion,
} from 'data/quizplease';
import { useState } from 'react';
import { useAnswersDispatch } from 'contexts/AnswerContext/AnswerContext';
import { TNavParams } from './Functions';
// import Timer from "./Timer";

function Question() {
  const [pair, setPair] = useState<string | null | undefined>(null);
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const [uncorrectAnswers, setUncorrectAnswers] = useState<number[]>([]);
  const dispatch = useAnswersDispatch();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);
  const navigate = useNavigate();
  const question: TQuizPleaseQuestion = quizplease[quizname].questions[_id];

  return (
    <>
      {/* <h1 className="text-3xl mb-4">{question.title}</h1> */}
      {/* <h2 className='text-xl'>Внимание! Вопрос!</h2> */}
      <div className='question'>
        <div className='grid grid-cols-12'>
          <div className='lg:col-span-2'></div>
          <div className='col-span-12 lg:col-span-8'>
            <div className='max-w-screen-md m-auto p-8'>
              <div
                className='text-card text-card--violet'
                dangerouslySetInnerHTML={{ __html: question.text }}
              ></div>
              {(question.type === 'simple' || !question.type) && (
                <div className='options'>
                  {question.options.map((option, i) => {
                    return (
                      <div className='options__item basis-1/2' key={i}>
                        <button
                          className={
                            'options__item-button' +
                            (currentAnswer === i ? ' is-current-answer' : '') +
                            (uncorrectAnswers.includes(i) ? ' disabled' : '')
                          }
                          disabled={uncorrectAnswers.includes(i) ? true : false}
                          onClick={(e) => {
                            setCurrentAnswer(i);
                          }}
                        >
                          {option.text}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {question.type === 'match' && (
                <div className='options'>
                  {question.options.map((option, i) => {
                    return (
                      <>
                        <div className='options__item'>
                          <button
                            className={
                              'options__item-button' +
                              (pair === option.text
                                ? ' is-current-answer'
                                : '') +
                              ` options__item-button-val1`
                            }
                            data-text={option.text}
                            data-pair={option.pair}
                            data-id={option.id}
                            onClick={(e) => {
                              setPair(option.text);
                            }}
                          >
                            {option.text}
                          </button>
                        </div>

                        <div className='options__item'>
                          <button
                            className={
                              'options__item-button' +
                              (pair === option.pair
                                ? ' is-current-answer'
                                : '') +
                              ` options__item-button-val2`
                            }
                            data-text={option.text}
                            data-pair={option.pair}
                            data-id={option.id}
                            onClick={(e) => {
                              setPair(option.text);
                            }}
                          >
                            {option.pair}
                          </button>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}

              {question.type === 'test' && (
                <>
                  <div className='options'>
                    <div className='options__item basis-1/2'>
                      <button
                        className={
                          'options__item-button' +
                          (currentAnswer === 0 ? ' is-current-answer' : '')
                        }
                        onClick={(e) => {
                          setCurrentAnswer(0);
                        }}
                      >
                        Да
                      </button>
                    </div>
                    <div className='options__item basis-1/2'>
                      <button
                        className={
                          'options__item-button' +
                          (currentAnswer === 1 ? ' is-current-answer' : '')
                        }
                        onClick={(e) => {
                          setCurrentAnswer(1);
                        }}
                      >
                        Нет
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className='question__answer'>
                <button
                  className={`question__answer-button ${
                    currentAnswer === -1 ? ' disabled' : ''
                  }`}
                  disabled={currentAnswer === -1 ? true : false}
                  onClick={(e) => {
                    setCurrentAnswer(-1);
                    if (question.options[currentAnswer].correct) {
                      dispatch &&
                        dispatch({
                          action: 'answer',
                          answer: {
                            quizplease: quizname,
                            answerId: id,
                            answerValue: currentAnswer,
                          },
                        });

                      setUncorrectAnswers([]);
                      if (question.text_answer) {
                        navigate(`answer`);
                      } else if (
                        quizplease[quizname].questions.length - 1 <=
                        _id
                      ) {
                        navigate(`/quizplease/${quizname}/result`);
                      } else {
                        navigate(`/quizplease/${quizname}/${_id + 1}`);
                      }
                    } else if (question.options[currentAnswer].value) {
                      if (question.text_answer) {
                        navigate(`answer`);
                      } else if (
                        quizplease[quizname].questions.length - 1 <=
                        _id
                      ) {
                        navigate(`/quizplease/${quizname}/result`);
                      } else {
                        navigate(`/quizplease/${quizname}/${_id + 1}`);
                      }
                    } else {
                      setUncorrectAnswers((current) => {
                        const result = [...current];
                        result.push(currentAnswer);
                        return result;
                      });
                    }
                  }}
                >
                  Ответить
                </button>
              </div>
            </div>
          </div>
          <div className='col-span-2'>{/* <Timer></Timer> */}</div>
        </div>
      </div>
    </>
  );
}

export default Question;
