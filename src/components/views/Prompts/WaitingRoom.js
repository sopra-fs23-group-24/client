import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import 'styles/views/WaitingRoom.scss';
import BaseContainer from "components/ui/BaseContainer";
import QuestionImage from "../Images/questiony.png"

const WaitingRoom = props => {
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
                localStorage.setItem("gameLastState", response.data.status)
                if (response.data.status !== 'PROMPT') {
                    history.push("/quizAnswer");
                }
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
        };

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <BaseContainer>
            <div className="waitingroom container">
                <div className="waitingroom form">
                    <img src={QuestionImage} alt="" className="waitingroom questionimg"   />
                </div>
                <div  className="waitingroom form2">
                    <h1>Waiting for other players to answer the questions!</h1>
                </div>
            </div>
        </BaseContainer>
    );
};

export default WaitingRoom;
