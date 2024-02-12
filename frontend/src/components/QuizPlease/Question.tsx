import { useNavigate, useParams } from "react-router-dom";
import quizplease from "data/quizplease";
import { useContext, useState } from "react";
import {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";
import { TNavParams } from "./Functions";
// import Timer from "./Timer";

function Question() {
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const [uncorrectAnswers, setUncorrectAnswers] = useState<number[]>([]);
  const dispatch = useAnswersDispatch();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const navigate = useNavigate();
  const question = quizplease[quizname].questions[Number(id)];

  return (
    <>
      {/* <h1 className="text-3xl mb-4">{question.title}</h1> */}
      <h2 className="text-xl">Внимание! Вопрос!</h2>
      <div className="question">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-2"></div>
          <div className="col-span-12 lg:col-span-8">
            <div className="max-w-screen-md m-auto p-8">
              <div
                className="text-card text-card--blue"
                dangerouslySetInnerHTML={{ __html: question.text }}
              ></div>
              <div className="options grid grid-cols-12 gap-8">
                {question.options.map((option, i) => {
                  return (
                    <div
                      className="options__item md:col-span-6 sm:col-span-12"
                      key={i}
                    >
                      <button
                        className={
                          "options__item-button" +
                          (currentAnswer === i ? " is-current-answer" : "") +
                          (uncorrectAnswers.includes(i) ? " disabled" : "")
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
              <div className="question__answer">
                <button
                  className={`question__answer-button ${
                    currentAnswer === -1 ? " disabled" : ""
                  }`}
                  disabled={currentAnswer === -1 ? true : false}
                  onClick={(e) => {
                    if (question.options[currentAnswer]?.correct) {
                      dispatch &&
                        dispatch({
                          action: "answer",
                          answer: {
                            quizplease: quizname,
                            answerId: id,
                            answerValue: currentAnswer,
                          },
                        });

                      setUncorrectAnswers([]);
                      if (question.text_answer) {
                        navigate(`answer`);
                      } else {
                        navigate(`${Number(id) + 1}`);
                      }
                    } else {
                      setUncorrectAnswers((current) => {
                        const result = [...current];
                        result.push(currentAnswer);
                        setCurrentAnswer(-1);
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
          <div className="col-span-2">{/* <Timer></Timer> */}</div>
        </div>
      </div>
    </>
  );
}

export default Question;
