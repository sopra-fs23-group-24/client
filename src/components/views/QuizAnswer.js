import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Spinner} from "../ui/Spinner";
import TextQuizAnswer from "./TextQuizAnswer";
import TFQuizAnswer from "./TFQuizAnswer";
import DrawingQuizAnswer from "./DrawingQuizAnswer";
import QuestionInstance from "../../models/QuestionInstance";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const QuizAnswer = props => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            if (response.data.currentQuestion.questionStatus === 'FINISHED') {
                history.push("/leaderboard");
            }

        };
        const initialize = async () => {
            let response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            const questionInstance = new QuestionInstance(response.data.currentQuestion);
            setQuestion(questionInstance);
        };

        initialize();
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const history = useHistory();
    const [question, setQuestion] = useState(null);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);


    /*
    api.post('/games/'+ localStorage.getItem("gamePin") + 'quizQuestions')
    */

    const submitAnswer = (value) => {
        setSelectedAnswerId(value);
        const requestBody = JSON.stringify({pickedAnswerOptionId:selectedAnswerId});
        api.post('/games/'+ localStorage.getItem("gamePin") + '/quiz-questions/'+question.questionId+'/answers'
            ,requestBody,{headers:{"playerToken":localStorage.getItem('Token')}})
    }


    let content = null;

        if(question) {
            if (question.imageToDisplay != null) {
                content =
                    <DrawingQuizAnswer question={question} submitAnswer={submitAnswer}>

                    </DrawingQuizAnswer>
            } else {
                if (question.answerOptions.length === 4) {
                    content =
                        <TextQuizAnswer question={question} submitAnswer={submitAnswer}>
                        </TextQuizAnswer>
                }
                if (question.answerOptions.length === 2) {
                    content =
                        <TFQuizAnswer question={question} submitAnswer={submitAnswer}>

                        </TFQuizAnswer>
                }
            }
        }


    return (
        <BaseContainer>

            <div className="prompt container">
                {content}
            </div>

        </BaseContainer>

    );
};


export default QuizAnswer;
