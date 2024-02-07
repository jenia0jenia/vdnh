import { useNavigate, useParams } from "react-router-dom";
import questions from "data/questions";
import { useContext, useState } from "react";
import {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";
import Timer from "./Timer";

function Question() {
  const params = useParams<{ id: string }>();
  const answerId = Number(params.id);
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const dispatch = useAnswersDispatch();
  const navigate = useNavigate();
  const question = questions[Number(answerId)];

  return (
    <>
      <h1 className="text-3xl mb-4">{question.title}</h1>
      <h2 className="text-xl">Внимание! Вопрос!</h2>
      <div className="question">
        <div className="grid grid-cols-12">
          <div className="col-span-2"></div>
          <div className="col-span-8">
            <div className="max-w-screen-md m-auto p-8">
              <div className="text-card text-card--blue">{question.text}</div>
              <div className="columns-2 gap-8">
                {question.options.map((option, i) => {
                  return (
                    <button
                      className={
                        "options__item" +
                        (currentAnswer === i ? " is-current-answer" : "")
                      }
                      key={i}
                      onClick={(e) => {
                        setCurrentAnswer(i);
                      }}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
              <button
                className={`question__answer-button clip-path-button${
                  currentAnswer === -1 ? " disabled" : ""
                }`}
                disabled={currentAnswer === -1 ? true : false}
                onClick={(e) => {
                  dispatch &&
                    dispatch({
                      action: "answer",
                      key: answerId,
                      value: currentAnswer,
                    });
                  navigate(`/quizplease/${answerId}/answer`);
                }}
              >
                Ответить
              </button>
            </div>
          </div>
          <div className="col-span-2">{/* <Timer></Timer> */}</div>
        </div>
      </div>
    </>
  );
}

export default Question;
