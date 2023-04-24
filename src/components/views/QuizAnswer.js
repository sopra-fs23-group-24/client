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

    const history = useHistory();
    const [question, setQuestion] = useState(null);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [leaderboardStatus, setLeaderBoardStatus] = useState(false);


    /*
    api.post('/games/'+ localStorage.getItem("gamePin") + 'quizQuestions')
    */
    const getQuestions = async () => {
        //TODO look at naming convention in question
        let response = await api.get('/games/'+ localStorage.getItem("gamePin") + '/quizQuestions');
        const questionInstance = new QuestionInstance(response.data);
        setQuestion(questionInstance);
    };

    const submitAnswer = (value) => {
        setSelectedAnswerId(value);
        const requestBody = JSON.stringify({answerOptionId:selectedAnswerId});
        api.post('/games/'+ localStorage.getItem("gamePin") + '/gameQuestions/'+question.questionId+'/answers'
            ,requestBody,{headers:{"playerToken":localStorage.getItem('Token')}})
        setLeaderBoardStatus(true);
    }

    function changeLeaderboardStatus(){
        setLeaderBoardStatus(!leaderboardStatus);
    }


    let content = <Spinner/>

    if(leaderboardStatus===false){
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
    }
    else{
        //TODO set content to Leaderboard View
        content=<Spinner/>
    }

    return (
        <BaseContainer>
            <div className="login button-container">
                <Button
                    width="100%"
                    onClick={() => getQuestions()}
                >
                    JOIN GAME
                </Button>

            </div>
            <div className="prompt container">
                {content}
            </div>

        </BaseContainer>

    );
};


export default QuizAnswer;
