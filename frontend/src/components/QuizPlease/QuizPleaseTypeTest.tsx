import { useQuizPlease } from 'contexts/QuizPleaseContext/QuizPleaseContext';

import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import QuizPleaseHeader from './QuizPleaseHeader';
import QuizPleaseFooter from './QuizPleaseFooter';
import { TNavParams } from './Functions';

function QuizPleaseTypeStepByStep() {
    const { quizplease } = useQuizPlease();
    const { slug: quizname } = useParams<keyof TNavParams>() as TNavParams;
    useEffect(() => {}, []);
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
                    <div className="container m-auto relative">
                        <Outlet></Outlet>
                    </div>
                </div>
            )}
            <QuizPleaseFooter></QuizPleaseFooter>
        </>
    );
}

export default QuizPleaseTypeStepByStep;
