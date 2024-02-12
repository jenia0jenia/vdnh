import { useNavigate, useParams } from "react-router-dom";
import quizplease from "data/quizplease";
import { useContext, useState } from "react";
import {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";
import { TNavParams } from "./Functions";
import Confetti from "./Confetti";

function Answer() {
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const navigate = useNavigate();
  const question = quizplease[quizname].questions[Number(id)];
  return (
    <>
      <Confetti></Confetti>
      {/* <h1 className="text-3xl mb-4">{question.title}</h1> */}
      <h2 className="text-lg">Это правильный ответ =)</h2>
      <div className="answer">
        <div className="max-w-screen-md m-auto p-8">
          <div
            className="text-card text-card--gray"
            dangerouslySetInnerHTML={{ __html: question.text_answer || "" }}
          ></div>
          <button
            className="answer__back-button"
            onClick={(e) => {
              navigate(`/quizplease/${quizname}/${Number(id) + 1}`);
            }}
          >
            Следующий вопрос
          </button>
        </div>
      </div>
    </>
  );
}

export default Answer;
