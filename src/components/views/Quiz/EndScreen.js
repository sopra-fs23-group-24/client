import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/EndScreen.scss';
import BaseContainer from "components/ui/BaseContainer";


const EndScreen = props => {
    const history = useHistory();
    const [playerList, setPlayerList] = useState(null);
    let content = null;
    let contentPodium = null;


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/' + localStorage.getItem('gamePin') + '/players', {headers: {"playerToken": localStorage.getItem("Token")}});
            setPlayerList(response.data);
        };
        fetchData();
    }, []);

    //useEffect for redirecting Players to Lobby at restartgame
    useEffect(() => {
        const fetchGameState = async () => {
            try {
                const gameStateResponse = await api.get('/games/' + localStorage.getItem("gamePin"));
                localStorage.setItem("gameLastState", gameStateResponse.data.status)
                if (gameStateResponse.data.status === "LOBBY") {
                    history.push("/lobby");
                }
            } catch (error) {
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
        }
        const intervalId = setInterval(fetchGameState, 1000);
        return () => clearInterval(intervalId);
    }, []);


    if (playerList) {
        contentPodium =
            <div className="endscreen form">

                <div className="endscreen displayName">
                    <h1 style={{fontSize: "4vw"}}>{playerList[1].playerName}</h1>
                    <div
                        className="endscreen podiumForm" style={{height: "250px"}}><h2>{playerList[1].score}</h2>
                        <h3>SECOND PLACE!</h3>
                    </div>
                </div>


                <div className="endscreen displayName">
                    <h1 style={{fontSize: "5vw"}}>{playerList[0].playerName}</h1>
                    <div
                        className="endscreen podiumForm" style={{height: "300px"}}><h2>{playerList[0].score}</h2>
                        <h2>FIRST PLACE!</h2>
                    </div>
                </div>

                <div className="endscreen displayName">
                    <h1 style={{fontSize: "3vw"}}>{playerList[2].playerName}</h1>
                    <div
                        className="endscreen podiumForm" style={{height: "200px"}}><h2>{playerList[2].score}</h2>
                        <h4>THIRD PLACE!</h4>
                    </div>
                </div>

            </div>
    }

    if (localStorage.getItem("isHost") === "true") {
        content =
            <div className="endscreen form2">
                <div className="login button-container">
                    <Button className="endscreen button"
                            width="300px"
                            onClick={() => restartGame()}
                    >
                        Restart Game
                    </Button>
                </div>

                <div className="login button-container">
                    <Button className="endscreen button"
                            width="300px"
                            onClick={() => endGame()}
                    >
                        End Game
                    </Button>
                </div>
            </div>
    } else {
        content =
            <div className="endscreen form2">
                <div className="login button-container">
                    <Button className="endscreen button"
                            width="300px"
                            onClick={() => leaveGame()}
                    >
                        Leave Lobby
                    </Button>
                </div>
            </div>
    }


    const restartGame = async () => {
        //dieser put request funktioniert nicht
        const newState = JSON.stringify({status: "LOBBY"});
        await api.put('/games/' + localStorage.getItem("gamePin"), newState, {headers: {"playerToken": localStorage.getItem('Token')}});
    };

    const endGame = async () => {
        await api.delete('/games/' + localStorage.getItem("gamePin"), {headers: {"playerToken": localStorage.getItem("Token")}});

    };

    const leaveGame = async () => {
        try {
            await api.delete('/games/' + localStorage.getItem("gamePin") + '/players/' + localStorage.getItem("playerId"), {headers: {"playerToken": localStorage.getItem("Token")}});
            localStorage.removeItem("playerId");
            localStorage.removeItem("isHost");
            localStorage.removeItem("gamePin");
            localStorage.removeItem("gameLastState");
            localStorage.removeItem("Token");

            history.push(`/startscreen`);
        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="endscreen container">
                {contentPodium}

                {content}


            </div>
        </BaseContainer>

    );
};


export default EndScreen;
