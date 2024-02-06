import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

import "./index.css";
import App from "./App";
import Stat from "./components/Stat/Stat";
import Nota3 from "./components/Nota3/Nota3";

import Root from "./routes/root";
import AnswerContext, {
  AnswerProvider,
} from "contexts/AnswerContext/AnswerContext";
import QuizPlease from "components/QuizPlease/QuizPlease";
import Question from "components/QuizPlease/Question";
import QuizPleaseList from "components/QuizPlease/QuizPleaseList";
import Answer from "components/QuizPlease/Answer";

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
    element: <QuizPlease />,
    children: [
      {
        path: "",
        element: <QuizPleaseList />,
      },
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
