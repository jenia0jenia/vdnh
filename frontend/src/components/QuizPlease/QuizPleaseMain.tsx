import QuizPleaseContext, {
  useQuizPlease,
  useAnswersDispatch,
} from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import quizplease from 'data/quizplease';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

function QuizPleaseMain() {
  return (
    <>
      <div className='quizplease'>
        <ScrollToTop />

        <Outlet />
      </div>
    </>
  );
}

export default QuizPleaseMain;
