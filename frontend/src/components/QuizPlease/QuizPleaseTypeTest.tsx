import AnswerContext from 'contexts/AnswerContext/AnswerContext';

import { useContext } from 'react';
import quizplease from 'data/quizplease';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import QuizPleaseHeader from './QuizPleaseHeader';
import QuizPleaseFooter from './QuizPleaseFooter';
import { TNavParams } from './Functions';

function QuizPleaseTypeTest() {
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  return (
    <>
      <QuizPleaseHeader></QuizPleaseHeader>
      <div className={`quizplease__main quizname-${quizname}`}>
        <div className='container m-auto relative'>
          <Outlet></Outlet>
        </div>
      </div>
      <QuizPleaseFooter></QuizPleaseFooter>
    </>
  );
}

export default QuizPleaseTypeTest;
