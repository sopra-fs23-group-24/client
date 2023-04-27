import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/EndScreen.scss';
import BaseContainer from "components/ui/BaseContainer";


const EndScreen = props => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [playerList, setPlayerList] = useState(null);
    let content = null;
    let contentPodium = null;


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/' + localStorage.getItem('gamePin') + '/players', { headers: { "playerToken": localStorage.getItem("Token") } });
            setPlayerList(response.data);
        };
        fetchData();
    }, []);

    //useEffect for redirecting Players to Lobby at restartgame
    useEffect(() => {
        const fetchGameState = async () => {
            const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            if (response.data.status === "LOBBY") {
                history.push("/lobby");
            }
        }
        const intervalId = setInterval(fetchGameState, 1000);
        return () => clearInterval(intervalId);
    }, []);

    //useEffect for redirecting Players to startscreen at deletegame
    useEffect(() => {
        const fetchGameNull = async () => {
            const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            if (response.status === 404) {

                history.push("/startscreen");
                localStorage.removeItem("Token");
                localStorage.removeItem("gamePin");
                localStorage.removeItem("playerId");
                localStorage.removeItem("isHost");
            }
        }
        const intervalId = setInterval(fetchGameNull, 1000);
        return () => clearInterval(intervalId);
    }, []);




    if (playerList){
        contentPodium =
            <div className="endscreen form">

            <div className="endscreen displayName">
                <h1 style={{fontSize: "4vw"}} >{playerList[1].playerName}</h1>
                <div
                    className = "endscreen podiumForm" style={{ height: "250px" }}> <h2>{playerList[1].score}</h2> <h3>SECOND PLACE!</h3>
                </div>
            </div>


            <div className="endscreen displayName">
                <h1 style={{fontSize: "5vw"}}>{playerList[0].playerName}</h1>
                <div
                    className = "endscreen podiumForm" style={{ height: "300px" }}> <h2>{playerList[0].score}</h2> <h2>FIRST PLACE!</h2>
                </div>
            </div>

            <div className="endscreen displayName">
                <h1 style={{fontSize: "3vw"}}>{playerList[2].playerName}</h1>
                <div
                    className = "endscreen podiumForm" style={{ height: "200px" }}> <h2>{playerList[2].score}</h2> <h4>Third PLACE!</h4>
                </div>
            </div>

        </div>
    }

    if (localStorage.getItem("isHost") === "true"){
        content =
            <div  className="endscreen form2">
            <div className="login button-container">
                <Button className = "endscreen button"
                        width="300px"
                        onClick={() => restartGame()}
                >
                    Restart Game
                </Button>
            </div>

            <div className="login button-container">
                <Button className = "endscreen button"
                        width="300px"
                        onClick={() => endGame()}
                >
                    End Game
                </Button>
            </div>
        </div>
    } else{
        content =
            <div  className="endscreen form2">
                <div className="login button-container">
                    <Button className = "endscreen button"
                            width="300px"
                            onClick={() => leaveLobby()}
                    >
                        Leave Lobby
                    </Button>
                </div>
            </div>
    }





    const restartGame = async() => {
        const requestBody = JSON.stringify({status: "LOBBY"});
        await api.put('/games/' + localStorage.getItem('gamePin'), requestBody, { headers: { "playerToken": localStorage.getItem("Token") } });
    };

    const endGame = async() => {
        console.log(localStorage.getItem('gamePin'))
        const response = await api.delete('/games/' + localStorage.getItem("gamePin"), {headers: {"playerToken": localStorage.getItem("Token")}});
        console.log(response)
        localStorage.removeItem("Token")
        localStorage.removeItem("gamePin")
        localStorage.removeItem("playerId")
        localStorage.removeItem("isHost")
        //rediret with 404
    };

    const leaveLobby = async() => {
        await api.delete('/games/' + localStorage.getItem("gamePin") + '/players/' + localStorage.getItem("playerId"), {headers: {"playerToken": localStorage.getItem("Token")}});
        localStorage.removeItem("Token")
        localStorage.removeItem("gamePin")
        localStorage.removeItem("playerId")
        localStorage.removeItem("isHost")
        history.push(`/startscreen`);
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
