import AnswerContext, {
  useAnswers,
  useAnswersDispatch,
} from 'contexts/AnswerContext/AnswerContext';

import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import QuizPleaseHeader from './QuizPleaseHeader';
import QuizPleaseFooter from './QuizPleaseFooter';
import { TNavParams } from './Functions';
import { TQuizPleaseQuestion } from 'types/quizplease';
import { getQuizFromJson } from 'utils';
// import quizplease from 'data/quizplease';

function QuizPleaseTypeStepByStep() {
  const { answers } = useAnswers();
  const dispatch = useAnswersDispatch();
  const navigate = useNavigate();
  const { id, slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
  const _id = Number(id);
  const [question, setQuestion] = useState<TQuizPleaseQuestion>();
  const [quizplease, setQuizplease] = useState<any>();
  useEffect(() => {
    (async () => {
      const quizplease = await getQuizFromJson();
      setQuizplease(quizplease);
      setQuestion(quizplease[quizname].questions[_id]);
    })();
  }, []);
  return (
    <>
      <QuizPleaseHeader></QuizPleaseHeader>
      {quizplease && (
        <div
          className={`quizplease__main quizname-${quizname}`}
          style={{
            backgroundImage: `url(${
              quizplease[quizname].background_image
                ? '/bg/' + quizplease[quizname].background_image
                : '/images/bg_figures.png'
            })`,
          }}
        >
          <div className='container m-auto relative'>
            <Outlet></Outlet>
          </div>
        </div>
      )}
      <QuizPleaseFooter></QuizPleaseFooter>
    </>
  );
}

export default QuizPleaseTypeStepByStep;
