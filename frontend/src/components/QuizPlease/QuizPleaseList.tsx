import AnswerContext from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import questions from "data/questions";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function QuizPleaseList() {
  const { answers } = useContext(AnswerContext);
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-4xl mb-8">Вопросы викторины</h1>
      <div className="grid grid-cols-12 gap-8">
        {questions.map((question, i) => {
          return (
            <div
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              key={i}
            >
              <button
                onClick={(e) => {
                  answers[i] < 0 && navigate(i.toString());
                }}
                className={
                  "quizplease__item clip-path-button" + (answers[i] < 0 ? "" : " disabled")
                }
              >
                {question.title}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuizPleaseList;
