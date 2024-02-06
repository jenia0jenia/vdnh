import questions from "data/questions";
import {
  Dispatch,
  ReactElement,
  Reducer,
  ReducerAction,
  createContext,
  useContext,
  useReducer,
} from "react";

const AnswerContext = createContext<{ answers: TAnswers }>({
  answers: answersInit(),
});

export type TAnswers = number[];

export interface IAnswer {
  action: "answer" | "reset";
  key: number;
  value: number;
}

const AnswerDispacthContext = createContext<React.Dispatch<IAnswer> | null>(
  null
);

interface IProps {
  children: ReactElement;
}

export function AnswerProvider({ children }: IProps) {
  const [answers, dispatch] = useReducer(answersReducer, answersInit());

  return (
    <AnswerContext.Provider value={{ answers }}>
      <AnswerDispacthContext.Provider value={dispatch}>
        {children}
      </AnswerDispacthContext.Provider>
    </AnswerContext.Provider>
  );
}

function answersReducer(answers: TAnswers, answer: IAnswer) {
  console.log(answers);
  console.log(answer);
  
  if (answer.action === "reset") {
    return answersInit();
  }

  if (answer.action === "answer") {
      const result: TAnswers = [...answers];
      result[answer.key] = answer.value;
      return result;
  }

  return answers;
}

export function useAnswers() {
  return useContext(AnswerContext);
}

export function useAnswersDispatch() {
  return useContext(AnswerDispacthContext);
}

export default AnswerContext;

function answersInit(): TAnswers {
  return new Array(questions.length).fill(-1);
}
