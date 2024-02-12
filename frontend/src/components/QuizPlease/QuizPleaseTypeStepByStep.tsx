import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./QuizPlease.css";
import QuizPleaseHeader from "./QuizPleaseHeader";
import QuizPleaseFooter from "./QuizPleaseFooter";

function QuizPleaseTypeStepByStep() {
  const { answers } = useAnswers();
  const dispatch = useAnswersDispatch();
  const navigate = useNavigate();
  return (
    <>
      <QuizPleaseHeader></QuizPleaseHeader>
      <div className="p-8">
        <div className="container m-auto relative">
          <Outlet></Outlet>
        </div>
      </div>
      <QuizPleaseFooter></QuizPleaseFooter>
    </>
  );
}

export default QuizPleaseTypeStepByStep;
