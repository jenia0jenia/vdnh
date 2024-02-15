import { useNavigate, useParams } from 'react-router-dom';
import quizplease, {
  TQuizPleaseOption,
  TQuizPleaseQuestion,
} from 'data/quizplease';
import { useEffect, useState } from 'react';
import { useAnswersDispatch } from 'contexts/AnswerContext/AnswerContext';
import { TNavParams } from './Functions';
import { shuffle } from 'utils/index';
// import Timer from "./Timer";

function Question() {
  const [options, setOptions] = useState<TQuizPleaseOption[]>([]);
  const [selectPair, setSelectPair] = useState<any>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [currentOption, setCurrentOption] = useState(-1);
  const [uncorrectOptions, setUncorrectOptions] = useState<number[]>([]);
  const [scores, setScores] = useState<number>(0);
  const dispatch = useAnswersDispatch();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);
  const navigate = useNavigate();
  const question: TQuizPleaseQuestion = quizplease[quizname].questions[_id];
  if (_id >= quizplease[quizname].questions.length) {
    navigate(`${quizname}/result`);
  }
  useEffect(() => {
    setOptions(shuffle(question.options));
  }, []);
  useEffect(() => {
    if (!selected || !selected.length) return;
    console.log(question.need_pairs);
    console.log(selected.length);
    console.log(options.length);
    if (
      (question.need_pairs && selected.length === question.need_pairs * 2) ||
      selected.length === question.options.length
    ) {
      if (question.text_answer) {
        navigate(`answer`);
      } else if (quizplease[quizname].questions.length - 1 <= _id) {
        navigate(`/quizplease/${quizname}/result`);
      } else {
        navigate(`/quizplease/${quizname}/${_id + 1}`);
      }
    }
  }, [selected]);
  return (
    <>
      {/* <h1 className="text-3xl mb-4">{question.title}</h1> */}
      {/* <h2 className='text-xl'>Внимание! Вопрос!</h2> */}
      <div className='question'>
        <div className='grid grid-cols-12'>
          <div className='lg:col-span-2'></div>
          <div className='col-span-12 lg:col-span-8'>
            <div className='m-auto p-8'>
              {question.images && (
                <div className='question__image-list'>
                  {question.images.map((image, i) => {
                    return (
                      <div className='question__image' key={i}>
                        <img src={`/q/${image}`} alt='' />
                      </div>
                    );
                  })}
                </div>
              )}

              {question.text && (
                <div
                  className='text-card text-card--violet'
                  dangerouslySetInnerHTML={{ __html: question.text }}
                ></div>
              )}

              {question.type === 'no-correct' && <></>}

              {(question.type === 'simple' || !question.type) && (
                <div className='options'>
                  {question.options.map((option, i) => {
                    return (
                      <div
                        className={`options__item basis-1/2${
                          option.image ? ' image' : ''
                        }`}
                        key={i}
                      >
                        {option.image && (
                          <div className='options__image'>
                            <img src={`/q/${option.image}`} alt='' />
                          </div>
                        )}
                        <button
                          className={
                            'options__item-button' +
                            (currentOption === i ? ' is-current-answer' : '') +
                            (uncorrectOptions.includes(i) ? ' disabled' : '')
                          }
                          disabled={uncorrectOptions.includes(i) ? true : false}
                          onClick={(e) => {
                            setCurrentOption(i);
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
                  {options.map((option, i) => {
                    const text = '' + option.text;
                    const pair = '' + option.pair;
                    return (
                      <div key={i} className='flex gap-20'>
                        <div className='options__item'>
                          <button
                            className={
                              'options__item-button' +
                              (selectPair === i ? ' is-current-answer' : '') +
                              ` options__item-button-val1` +
                              (selected.includes(i) ? ' disabled' : '')
                            }
                            disabled={selected.includes(i) ? true : false}
                            onClick={(e) => {
                              if (typeof selectPair === 'number') {
                                console.log(pair);
                                console.log(options[selectPair].text);
                                if (options[selectPair].text === pair) {
                                  setSelected((current) => {
                                    return [...current, i, selectPair];
                                  });
                                }
                                setSelectPair(null);
                              } else {
                                setSelectPair(i);
                              }
                            }}
                          >
                            {text}
                          </button>
                        </div>
                      </div>
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
                          (currentOption === 0 ? ' is-current-answer' : '')
                        }
                        onClick={(e) => {
                          setCurrentOption(0);
                        }}
                      >
                        Да
                      </button>
                    </div>
                    <div className='options__item basis-1/2'>
                      <button
                        className={
                          'options__item-button' +
                          (currentOption === 1 ? ' is-current-answer' : '')
                        }
                        onClick={(e) => {
                          setCurrentOption(1);
                        }}
                      >
                        Нет
                      </button>
                    </div>
                  </div>
                </>
              )}

              {question.type === 'no-correct' && (
                <>
                  <div className='question__answer'>
                    <button
                      className={`question__answer-button`}
                      onClick={(e) => {
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
                      }}
                    >
                      {question.text_answer
                        ? 'Узнать ответ'
                        : quizplease[quizname].questions.length &&
                          quizplease[quizname].questions.length - 1 === _id
                        ? `Завершить!`
                        : `Следующий вопрос`}{' '}
                    </button>
                  </div>
                </>
              )}

              {question.type !== 'match' && question.type !== 'no-correct' && (
                <div className='question__answer'>
                  <button
                    className={`question__answer-button ${
                      currentOption === -1 ? ' disabled' : ''
                    }`}
                    disabled={currentOption === -1 ? true : false}
                    onClick={(e) => {
                      setCurrentOption(-1);
                      if (question.options[currentOption].correct) {
                        dispatch &&
                          dispatch({
                            action: 'answer',
                            answer: {
                              quizplease: quizname,
                              answerId: id,
                              answerValue: currentOption,
                              scores: currentOption,
                            },
                          });

                        setUncorrectOptions([]);
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
                      } else if (
                        typeof question.options[currentOption].value !==
                        'undefined'
                      ) {
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
                        setUncorrectOptions((current) => {
                          const result = [...current];
                          result.push(currentOption);
                          return result;
                        });
                      }
                    }}
                  >
                    {question.text_answer ||
                    quizplease[quizname].questions.length - 1 !== _id
                      ? `Ответить`
                      : `Завершить!`}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='col-span-2'>{/* <Timer></Timer> */}</div>
        </div>
      </div>
    </>
  );
}

export default Question;
