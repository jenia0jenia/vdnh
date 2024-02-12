import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

import "./index.css";
import "./assets/css/fonts.css";
import App from "./App";
import Stat from "./components/Stat/Stat";
import Nota3 from "./components/Nota3/Nota3";

import Root from "./routes/root";
import AnswerContext, {
  AnswerProvider,
} from "contexts/AnswerContext/AnswerContext";
import QuizPleaseTypeStepByStep from "components/QuizPlease/QuizPleaseTypeStepByStep";
import Question from "components/QuizPlease/Question";
import QuizPleaseList from "components/QuizPlease/QuizPleaseList";
import Answer from "components/QuizPlease/Answer";
import QuizPleaseMain from "components/QuizPlease/QuizPleaseMain";
import QuestionList from "components/QuizPlease/QuestionList";
// import QuizPleaseTypeQuestionList from "components/QuizPlease/QuizPleaseTypeQuestionList";
import QuizPleaseTypeTest from "components/QuizPlease/QuizPleaseTypeTest";
import QuizPleaseHello from "components/QuizPlease/QuizPleaseHello";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "stat",
    element: <Stat />,
  },
  {
    path: "notes",
    element: <Nota3 text="text" />,
  },
  {
    path: "quizplease",
    element: <QuizPleaseMain />,
    children: [
      {
        path: "",
        element: <QuizPleaseList />,
      },
      {
        path: ":slug/hello",
        element: <QuizPleaseHello />,
      },
      {
        path: ":slug",
        element: <QuizPleaseTypeStepByStep />,
        children: [
          {
            path: ":id",
            element: <Question />,
          },
          {
            path: ":id/answer",
            element: <Answer />,
          },
        ],
      },
      // {
      //   path: "question-list/:slug",
      //   element: <QuizPleaseTypeQuestionList />,
      //   children: [
      //     {
      //       path: "",
      //       element: <QuestionList />,
      //     },
      //     {
      //       path: ":id",
      //       element: <Question />,
      //     },
      //     {
      //       path: ":id/answer",
      //       element: <Answer />,
      //     },
      //   ],
      // },
      {
        path: "test/:slug",
        element: <QuizPleaseTypeTest />,
        children: [
          {
            path: ":id",
            element: <Question />,
          },
          {
            path: "result",
            element: <Answer />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <AnswerProvider>
    <App>
      <RouterProvider router={router} />
    </App>
  </AnswerProvider>
  // </React.StrictMode>
);
