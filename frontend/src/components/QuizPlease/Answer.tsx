import { useNavigate, useParams } from "react-router-dom";
import questions from "data/questions";
import { useContext, useState } from "react";
import {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";

function Answer() {
  const params = useParams<{ id: string }>();
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const dispatch = useAnswersDispatch();
  const answerId = Number(params.id);
  const navigate = useNavigate();

  const question = questions[Number(answerId)];
  return (
    <>
      <h1 className="text-3xl mb-4">{question.title}</h1>
      <h2 className="text-lg">А теперь паравильный ответ =)</h2>
      <div className="answer">
        <div className="max-w-screen-md m-auto p-8">
          <div className="text-card text-card--gray">{question.correct}</div>
          <button
            className="quizplease__button answer__back-button"
            onClick={(e) => {
              navigate(`/quizplease/`);
            }}
          >
            К вопросам
          </button>
        </div>
      </div>
    </>
  );
}

export default Answer;
