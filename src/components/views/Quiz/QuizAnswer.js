import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import TextQuizAnswer from "./TextQuizAnswer";
import TFQuizAnswer from "./TFQuizAnswer";
import DrawingQuizAnswer from "./DrawingQuizAnswer";
import QuestionInstance from "../../../models/QuestionInstance";
import ImageAsAnswer from "./ImageAsAnswer";


const QuizAnswer = props => {

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
                localStorage.setItem("gameLastState", response.data.status)
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
        }catch (error) {
            if (error.response.status === 404) {
                alert("The game has been ended by the host.")
                localStorage.removeItem("playerId");
                localStorage.removeItem("isHost");
                localStorage.removeItem("gamePin");
                localStorage.removeItem("Token");
                localStorage.removeItem("gameLastState");
                history.push("/startscreen");
            }
        }
    }, []);

    const history = useHistory();
    const [question, setQuestion] = useState(null);
    const [pointsEarned, setPointsEarned] = useState(0);

    const submitAnswer = async (value, remainingTime) => {
        const requestBody = JSON.stringify({pickedAnswerOptionId:value, "timer":remainingTime});
        const response = await api.post('/games/' + localStorage.getItem("gamePin") + '/quiz-questions/' + question.questionId + '/answers'
            , requestBody, {headers: {"playerToken": localStorage.getItem('Token')}});
        setPoints(response.data)
        localStorage.setItem('earnedPoints',response.data);
    }
    const setPoints=(value) => {
        console.log(value)
        setPointsEarned(value);
    }


    let content = null;

        if(question) {
            if (question.imageToDisplay != null) {
                content =
                    <DrawingQuizAnswer question={question} submitAnswer={submitAnswer}>

                    </DrawingQuizAnswer>
            } else {
                if (question.answerDisplayType === "IMAGE"){
                    content =
                        <ImageAsAnswer question={question} submitAnswer={submitAnswer}>
                        </ImageAsAnswer>
                }
                else {
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
