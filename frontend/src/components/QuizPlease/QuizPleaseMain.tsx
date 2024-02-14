import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import quizplease from "data/quizplease";

function QuizPleaseMain() {
  return (
    <>
      <div className="quizplease">
        <Outlet />
      </div>
    </>
  );
}

export default QuizPleaseMain;
