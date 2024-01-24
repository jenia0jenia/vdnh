import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";

import "./index.css";
import App from "./App";
import Stat from "./components/Stat/Stat";
import Nota2 from "./components/Nota2/Nota2";

import Root from "./routes/root";

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
    element: <Nota2 />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
