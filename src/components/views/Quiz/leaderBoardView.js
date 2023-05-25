import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LeaderBoardView.scss';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from "react";
import QuestionImage from "../Images/questiony.png"
import QuestionImageWrong from "../Images/sad_question_mark.png"
import QuestionInstance from "../../../models/QuestionInstance";
import {Spinner} from "../../ui/Spinner";


const LeaderBoardView = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [imageContent, setImageContent] = useState(QuestionImage);


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/' + localStorage.getItem("gamePin"));
            localStorage.setItem("gameLastState", response.data.status)
            if (response.data.status === "END") {
                history.push("/EndScreen");
            }
            // this else if here is needed to avoid the error of reading null in the questionStatus
            else if (response.data.currentQuestion.questionStatus === 'NOT_FINISHED') {
                history.push("/quizAnswer");
            }


        };
        const fetchUsers = async () => {
            const response2 = await api.get('/games/' + localStorage.getItem("gamePin") + '/players');
            setUsers(response2.data);
            const response3 = await api.get('/games/' + localStorage.getItem("gamePin"))
            const currQuestion = new QuestionInstance(response3.data.currentQuestion);
            if (currQuestion.answerDisplayType === "IMAGE") {
                setIsImage(true);
            }

            setCorrectAnswer(currQuestion.correctAnswer);
        }

        const intervalId = setInterval(fetchData, 1000);
        fetchUsers();
        return () => clearInterval(intervalId);
    }, []);


    const nextQuestion = async () => {
        try {
            const changeCurrentQuestion = await api.put('/games/' + localStorage.getItem("gamePin") + '/quizQuestions', {}, {headers: {"playerToken": localStorage.getItem("Token")}});
            console.log(changeCurrentQuestion.data)

        } catch (error) {
            alert(`Something went wrong trying to go to the next question: \n${handleError(error)}`);
        }
    };

    function getColor(score) {
        if (score === 0) {
            return "red";
        } else if (score > 0) {
            return "green";
        } else {
            return "black";
        }
    }

    function getImage(score) {

        if (score <= 0) {
            return <img src={QuestionImageWrong} alt="" className="leaderboardview questionimg"/>

        } else if (score > 0) {
            return <img src={QuestionImage} alt="" className="leaderboardview questionimg"/>
        }
    }


    let content = <Spinner></Spinner>
    if (correctAnswer) {
        if (isImage) {
            content =
                <div className="leaderboardview form2">
                    <h1>You scored: {localStorage.getItem('earnedPoints')} Points!
                        <p>The correct Answer was: <img src={correctAnswer.answerOptionText} alt=""
                                                        className="quiz answerImage"/></p>
                    </h1>

                    {getImage(localStorage.getItem('earnedPoints'))}
                </div>
        } else {
            content =
                <div className="leaderboardview form2">
                    <h1>You scored: {localStorage.getItem('earnedPoints')} Points!
                        <p>The correct Answer was: {correctAnswer.answerOptionText}</p>
                    </h1>

                    {getImage(localStorage.getItem('earnedPoints'))}
                </div>
        }
    }
    if (localStorage.getItem('isHost') === 'true') {
        return (<BaseContainer>

                <div className="leaderboardview container">

                    {content}

                    <div className="leaderboardview form">
                        <h1>RANKING</h1>
                        <ul>
                            <span className="leaderboardview player-name"><h3>Player</h3></span>
                            <span className="leaderboardview score"><h3>Score</h3></span>

                        </ul>
                        <ul>{users !== null && users.map((user, index) => {
                            return <li key={index}>
                                <span className="leaderboardview player-name">{user.playerName}</span>
                                <span className="leaderboardview score">{user.score}</span>
                                <span className="leaderboardview latest-score"
                                      style={{color: getColor(user.latestScore)}}>{"+ " + user.latestScore}</span>
                            </li>
                        })}
                        </ul>
                        <div className="login button-container">
                            <Button className='secondary-button'
                                    style={{marginLeft: "auto"}}
                                    width="30%"
                                    onClick={() => nextQuestion()}
                            >
                                NEXT QUESTION
                            </Button>

                        </div>
                    </div>


                </div>

            </BaseContainer>

        );
    } else {
        return (
            <BaseContainer>

                <div className="leaderboardview container">
                    {content}

                    <div className="leaderboardview form">
                        <h1>RANKING</h1>
                        <ul>
                            <span className="leaderboardview player-name"><h3>Player</h3></span>
                            <span className="leaderboardview score"><h3>Score</h3></span>

                        </ul>
                        <ul>{users !== null && users.map((user, index) => {
                            return <li key={index}>
                                <span className="leaderboardview player-name">{user.playerName}</span>
                                <span className="leaderboardview score">{user.score}</span>
                                <span className="leaderboardview latest-score"
                                      style={{color: getColor(user.latestScore)}}>{"+ " + user.latestScore}</span>
                            </li>
                        })}
                        </ul>
                        <div className="login button-container">

                        </div>
                    </div>


                </div>

            </BaseContainer>

        );
    }
}


export default LeaderBoardView;
