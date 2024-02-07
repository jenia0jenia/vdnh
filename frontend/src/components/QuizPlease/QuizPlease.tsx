import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./QuizPlease.css";

function QuizPlease() {
  const { answers } = useAnswers();
  const dispatch = useAnswersDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="p-8">
        <div className="container m-auto">
          <div className="quizplease">
            <div className="quizplease__head">
              <div className="grid grid-cols-12">
                <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                  <button
                    className="quizplease__again"
                    onClick={(e) => {
                      if (window.confirm("Вы уверены?")) {
                        dispatch &&
                          dispatch({ action: "reset", key: -1, value: -1 });
                        navigate("/quizplease");
                      }
                    }}
                  >
                    Начать заново
                  </button>
                </div>
                <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                  <div className="quizplease__stat">
                    Ответов:{" "}
                    {answers.reduce((value, answer) => {
                      return value + (answer < 0 ? 0 : 1);
                    }, 0)}
                    /{answers.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default QuizPlease;
