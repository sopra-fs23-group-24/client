import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LeaderBoardView.scss';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from "react";
import QuestionImage from "./Images/questiony.png"


const LeaderBoardView = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);
    const {points} = useParams();



    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            if (response.data.status === "END") {
                history.push("/EndScreen");
            }

            if (response.data.currentQuestion.questionStatus === 'NOT_FINISHED') {
                history.push("/quizAnswer");
            }


        };
        const fetchUsers = async () => {
            const response2 = await api.get('/games/' + localStorage.getItem("gamePin") + '/players');
            setUsers(response2.data);
        }

        const intervalId = setInterval(fetchData, 1000);
        fetchUsers();
        return () => clearInterval(intervalId);
    }, []);



    const nextQuestion = async () => {
        try {
            const changeCurrentQuestion = await api.put('/games/' + localStorage.getItem("gamePin") + '/quizQuestions', {},{headers: {"playerToken": localStorage.getItem("Token")}});
            console.log(changeCurrentQuestion.data)

        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }
    };


    if (localStorage.getItem('isHost') === 'true') {
        return ( <BaseContainer>

                <div className="leaderboardview container">


                    <div  className="leaderboardview form2">
                        <h1>You scored: {points} Points!</h1>

                        <img src={QuestionImage} alt="" className="leaderboardview questionimg"/>
                    </div>

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
                            </li>})}
                        </ul>
                        <div className="login button-container">
                            <Button className='secondary-button'
                                    style={{ marginLeft: "auto" }}
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
    }
    else {
        return (
            <BaseContainer>

                <div className="leaderboardview container">


                    <div  className="leaderboardview form2">
                        <h1>You scored: {points} Points!</h1>

                        <img src={QuestionImage} alt="" className="leaderboardview questionimg"/>
                    </div>

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
                            </li>})}
                        </ul>
                        <div className="login button-container">

                        </div>
                    </div>


                </div>

            </BaseContainer>

        );}
};


export default LeaderBoardView;
