// import quizplease from 'data/quizplease';
import { Dispatch, ReactElement, Reducer, ReducerAction, createContext, useContext, useEffect, useReducer, useState } from 'react';

import { TQuizPlease } from 'types/quizplease';
import { getQuizFromJson } from 'utils';

const QuizPleaseContext = createContext<any>({});

export type TDispatchQuizPleaseContextObj = {
    quizplease?: TQuizPlease[];
    currentOption?: number
};

export interface IAnswer {
    quizplease: string;
    answerId: string;
    answerValue: number;
    scores?: number;
}

export interface IDispatchAnswer {
    action: 'answer' | 'reset' | 'setCurrentOption';
    answer?: IAnswer;
    scores?: number;
    currentOption?: number
}

const AnswerDispacthContext = createContext<React.Dispatch<IDispatchAnswer> | null>(null);

interface IProps {
    children: ReactElement;
}

export function QuizPleaseProvider({ children }: IProps) {
    const [answers, dispatch] = useReducer(answersReducer, quizPleaseInit());

    const [quizplease, setQuizPlease] = useState(null);
    const [loading, setLoading] = useState(false);

    const getQuizPlease = async () => {
        setLoading(true);
        const responseQuizPlease = await getQuizFromJson();
        setQuizPlease(responseQuizPlease);
        setLoading(false);
    };

    useEffect(() => {
        getQuizPlease();
    }, []);

    return (
        <QuizPleaseContext.Provider value={{ loading, quizplease, answers }}>
            <AnswerDispacthContext.Provider value={dispatch}>{children}</AnswerDispacthContext.Provider>
        </QuizPleaseContext.Provider>
    );
}

function answersReducer(answers: TDispatchQuizPleaseContextObj, newAnswer: IDispatchAnswer) {
    if (newAnswer.action === 'reset') {
        return quizPleaseInit();
    }

    if (newAnswer.action === 'setCurrentOption') {
        return {
            currentOption: newAnswer.currentOption
        }
    }

    // if (newAnswer.action === 'answer') {
    //     const result: TDispatchQuizPleaseContextObj = { ...answers };
    //     if (typeof newAnswer.answer !== 'undefined') {
    //         const quizname = newAnswer.answer.quizplease;

    //         if (quizname && !result[quizname])
    //             result[quizname] = {
    //                 scores: 0,
    //             };
    //         result[quizname][`${newAnswer.answer.answerId}`] = newAnswer.answer.answerValue;
    //         return result;
    //     } else {
    //         console.error('no new answer');
    //     }
    // }

    return answers;
}

export function useQuizPlease() {
    return useContext(QuizPleaseContext);
}

export function useAnswersDispatch() {
    return useContext(AnswerDispacthContext);
}

export default QuizPleaseContext;

function quizPleaseInit(): TDispatchQuizPleaseContextObj {
    return {
        currentOption: -1
    };
}
