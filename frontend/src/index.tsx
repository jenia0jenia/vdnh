import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';

import './index.css';
import './assets/css/fonts.css';
import App from './App';
import Stat from './components/Stat/Stat';
import Nota3 from './components/Nota3/Nota3';

import Root from './routes/root';
import QuizPleaseContext, {
  QuizPleaseProvider,
} from 'contexts/QuizPleaseContext/QuizPleaseContext';
import QuizPleaseTypeStepByStep from 'components/QuizPlease/QuizPleaseTypeStepByStep';
import Question from 'components/QuizPlease/Question';
import QuizPleaseList from 'components/QuizPlease/QuizPleaseList';
import Answer from 'components/QuizPlease/Answer';
import QuizPleaseMain from 'components/QuizPlease/QuizPleaseMain';
import QuestionList from 'components/QuizPlease/QuestionList';
// import QuizPleaseTypeQuestionList from "components/QuizPlease/QuizPleaseTypeQuestionList";
import QuizPleaseTypeTest from 'components/QuizPlease/QuizPleaseTypeTest';
import QuizPleaseHello from 'components/QuizPlease/QuizPleaseHello';
import QuizPleaseResult from 'components/QuizPlease/QuizPleaseResult';
import QuizPleaseType from 'components/QuizPlease/QuizPleaseType';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <App />,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/index.html',
    // element: <App />,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'stat',
    element: <Stat />,
  },
  {
    path: 'notes',
    element: <Nota3 text='text' />,
  },
  {
    path: 'quizplease',
    element: <QuizPleaseMain />,
    children: [
      {
        path: '',
        element: <QuizPleaseList />,
      },
      {
        path: ':slug/hello',
        element: <QuizPleaseHello />,
      },
      {
        path: ':slug',
        element: <QuizPleaseType />,
        children: [
          {
            path: ':id',
            element: <Question />,
          },
          {
            path: ':id/answer',
            element: <Answer />,
          },
          {
            path: 'result',
            element: <QuizPleaseResult />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <QuizPleaseProvider>
    <App>
      <RouterProvider router={router} />
    </App>
  </QuizPleaseProvider>
  // </React.StrictMode>
);
