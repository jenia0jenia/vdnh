import AnswerContext from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import quizplease from "data/quizplease";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function QuizPleaseTypeTest() {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-12">
        {Object.keys(quizplease).map((key, i) => {
          const { name, slug: quizname } = quizplease[key];
          return (
            <div
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
              key={i}
            >
              <button
                onClick={(e) => {
                  navigate(quizname);
                }}
                className={"quizplease__item clip-path-button"}
              >
                {name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuizPleaseTypeTest;
