import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from "contexts/AnswerContext/AnswerContext";

import { useContext } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import "./QuizPlease.css";
import quizplease from "data/quizplease";

function QuizPleaseHello() {
  const navigate = useNavigate();
  const { slug: quizname } = useParams();
  return (
    <>
      <div className="container m-auto">
        <div className="quizplease__hello">
          <div className="basis-3/4">
            <h1 className="quizplease__hello-title h1">ЛИНИЯ ЛЮБВИ</h1>
            <div className="quizplease__hello-rectangle">
              <div className="quizplease__hello-description-one">
                Пройдите тест и узнайте, любовная линия какого знаменитого
                литературного произведения подходит именно вам!
              </div>
              <div className="quizplease__hello-description-two">
                Откройте флакон с ароматом и помните: Любовь витает в воздухе!
              </div>
              <button
                onClick={(e) => {
                  navigate(`/quizplease/${quizname}/0`);
                }}
                className="quizplease__hello-start"
              >
                <span>Начать тест</span>
              </button>
            </div>
          </div>
          <div className="quizplease__hello-image">
            <img src="/images/stella_green.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPleaseHello;
