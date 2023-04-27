import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import TextQuizAnswer from "./TextQuizAnswer";
import TFQuizAnswer from "./TFQuizAnswer";
import DrawingQuizAnswer from "./DrawingQuizAnswer";
import QuestionInstance from "../../models/QuestionInstance";


const QuizAnswer = props => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            if (response.data.currentQuestion.questionStatus === 'FINISHED') {
                history.push("/leaderboard/"+pointsEarned);
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
    let pointsEarned = 0;

    const submitAnswer = async (value) => {
        const requestBody = JSON.stringify({pickedAnswerOptionId:value});
        const response = await api.post('/games/' + localStorage.getItem("gamePin") + '/quiz-questions/' + question.questionId + '/answers'
            , requestBody, {headers: {"playerToken": localStorage.getItem('Token')}});
        setPoints(response.data)
    }
    const setPoints=(value) => {
        pointsEarned = value;
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
