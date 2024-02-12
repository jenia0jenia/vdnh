import AnswerContext from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import quizplease from "data/quizplease";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function QuizPleaseList() {
  const navigate = useNavigate();
  return (
    <>
      <div className="quizplease">
        <div className="flex items-stretch quizplease__list">
          {Object.keys(quizplease).map((key, i) => {
            const { name, slug: quizname } = quizplease[key];
            return (
              <div
                onClick={(e) => {
                  navigate(`${quizname}/hello`);
                }}
                key={i}
                className="quizplease__item h-screen"
              >
                <div className="quizplease__item-text">
                  {name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default QuizPleaseList;