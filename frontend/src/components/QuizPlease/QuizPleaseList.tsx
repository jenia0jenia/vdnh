import AnswerContext from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import questions from "data/questions";
import { NavLink, Outlet } from "react-router-dom";

function QuizPleaseList() {
  const { answers } = useContext(AnswerContext);
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
              {answers[i] < 0 ? (
                <NavLink
                  to={i.toString()}
                  className={"quizplease__button quizplease__item"}
                >
                  {question.title}
                </NavLink>
              ) : (
                <button
                  className="quizplease__button quizplease__item is-disabled"
                  disabled
                >
                  {question.title}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuizPleaseList;
