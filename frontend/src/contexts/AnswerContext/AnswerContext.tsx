import quizplease from "data/quizplease";
import {
  Dispatch,
  ReactElement,
  Reducer,
  ReducerAction,
  createContext,
  useContext,
  useReducer,
} from "react";

const AnswerContext = createContext<{ answers: TDispatchAnswerObj }>({
  answers: answersInit(),
});

export type TDispatchAnswerObj = {
  [quizname: string]: {
    [answerId: string]: number;
  };
};

export interface IAnswer {
  quizplease: string;
  answerId: string;
  answerValue: number;
}

export interface IDispatchAnswer {
  action: "answer" | "reset";
  answer?: IAnswer;
}

const AnswerDispacthContext =
  createContext<React.Dispatch<IDispatchAnswer> | null>(null);

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

function answersReducer(
  answers: TDispatchAnswerObj,
  newAnswer: IDispatchAnswer
) {
  if (newAnswer.action === "reset") {
    return answersInit();
  }

  if (newAnswer.action === "answer") {
    const result: TDispatchAnswerObj = { ...answers };
    if (typeof newAnswer.answer !== "undefined") {
      if (!result[newAnswer.answer.quizplease])
        result[newAnswer.answer.quizplease] = {};
      result[newAnswer.answer.quizplease][`${newAnswer.answer.answerId}`] =
        newAnswer.answer.answerValue;
      return result;
    } else {
      console.log("no new answer");
    }
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

function answersInit(): TDispatchAnswerObj {
  return {};
}
