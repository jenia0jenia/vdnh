import QuizPleaseContext from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useContext } from 'react';
// import quizplease from 'data/quizplease';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { TNavParams } from './Functions';
import QuizPleaseTypeTest from './QuizPleaseTypeTest';
import QuizPleaseTypeStepByStep from './QuizPleaseTypeStepByStep';

function QuizPleaseType() {
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  // const type = quizplease[quizname].type;
  return (
    <>
      <QuizPleaseTypeTest></QuizPleaseTypeTest>
      {/* {type === 'test' && }
      {type === 'step-by-step' && <QuizPleaseTypeStepByStep></QuizPleaseTypeStepByStep>} */}
    </>
  );
}

export default QuizPleaseType;
