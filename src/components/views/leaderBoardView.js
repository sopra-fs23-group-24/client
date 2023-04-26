import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LeaderBoardView.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import axios from "axios";
import User from "../../models/User";
import user from "../../models/User";


const FormField = props => {
    return (
        <div className="leaderboardview field">
            <label className="leaderboardview label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="XXXXXX"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const LeaderBoardView = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.put('/games/'+ localStorage.getItem("gamePin") + '/quizQuestions');
            if (response.data.currentQuestion.questionStatus === 'NOT_FINISHED') {
                history.push("/quizAnswer");
            }

        };

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);



    const nextQuestion = async () => {
        try {
            const changeCurrentQuestion =  api.put('/games/' + localStorage.getItem("gamePin") + '/quizQuestions', {headers: {"playerToken": localStorage.getItem("Token")}});

        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }


    };

//games/gamepin/quizquestions PUT
    if (localStorage.getItem('isHost') === 'true') {
        return ( <BaseContainer>

                <div className="leaderboardview container">
                    <h1>GAME: {localStorage.getItem("gamePin")}</h1>

                    <div  className="leaderboardview form2">

                        <img style={{ width: '50%', height: '50%' }} src="/src/components/views/Images/questiony.png" alt="" className="leaderboardview questionimg"/>

                    </div>

                    <div className="leaderboardview
                     form">
                        <h1>Players</h1>
                        <ul>{users !== null && users.map(user => {
                            return <div>{user.playerName}</div>})}
                        </ul>
                        <div className="login button-container">
                            <Button
                                width="100%"
                                onClick={() => nextQuestion()}
                            >
                                CONTINUE
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
                    <h1>GAME: {localStorage.getItem("gamePin")}</h1>

                    <div  className="leaderboardview form2">

                        <img style={{ width: '50%', height: '50%' }} src="/src/components/views/Images/questiony.png" alt="" className="leaderboardview questionimg"/>

                    </div>

                    <div className="leaderboardview form">
                        <h1>Players</h1>
                        <ul>{users !== null && users.map(user => {
                            return <div>{user.playerName}</div>})}
                        </ul>
                        <div className="login button-container">

                        </div>
                    </div>


                </div>

            </BaseContainer>

        );}
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default LeaderBoardView;
