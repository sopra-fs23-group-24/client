import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import User from "../../models/User";
import QuestionImage from "./Images/questiony.png"

const Lobby = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [countUsers, setCountUsers] = useState(0);

    useEffect( () => {

        try {
            const fetchDataLobby = async () => {

                const response = await api.get('/games/' + localStorage.getItem("gamePin") + '/players');
                setUsers(response.data);
                const responseLobby = await api.get('/games/'+ localStorage.getItem("gamePin"));
                if (responseLobby.data.status !== 'LOBBY') {
                    history.push("/answerPrompt");
                }
            };
            createQrCode();
            const intervalId = setInterval(fetchDataLobby, 1000);
            return () => clearInterval(intervalId);

        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the users! See the console for details.");
        }
    }, []);

    useEffect(()=> {

        const checkPlayers = () => {
            if(users!==null){
                let isPLayerFound = false;
                for (let i = 0; i < users.length; i++) {
                    const user = new User(users[i]);
                    if (user.playerId.toString() === localStorage.getItem("playerId")) {
                        isPLayerFound = true;
                    }
                }
                setCountUsers(users.length);
                if (isPLayerFound === false) {
                    localStorage.removeItem("playerId");
                    localStorage.removeItem("Token");
                    history.push("/startscreen");
                }
            }
        }
        const intervalId = setInterval(checkPlayers, 300);
        return () => clearInterval(intervalId);
    },[users])

        const createQrCode = () => {
            const options = {
                method: 'GET',
                url: 'https://codzz-qr-cods.p.rapidapi.com/getQrcode',
                params: {type: 'url', value: 'https://sopra-fs23-group-24-client.oa.r.appspot.com/entername/' + localStorage.getItem('gamePin')},
                headers: {
                    'X-RapidAPI-Key': '9706f0679bmshb78281c4935e15bp14358cjsn25618d800385',
                    'X-RapidAPI-Host': 'codzz-qr-cods.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                setQrCode(response.data);
            }).catch(function (error) {
                console.error(error);
            });

        };

        const leaveGame = async () => {
        try {
            await api.delete('/games/' + localStorage.getItem("gamePin") + '/players/' + localStorage.getItem("playerId"), {headers: {"playerToken": localStorage.getItem("Token")}});
            localStorage.removeItem("Token")
            localStorage.removeItem(("isHost"))

            history.push(`/startscreen`);

        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }


    };

        const deleteUser = async (playerId) => {
            try {
            const response = await api.delete('/games/' + localStorage.getItem("gamePin") + '/players/' + playerId, {headers: {"playerToken": localStorage.getItem("Token")}});

        } catch (error) {
        alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
    }

};

    const endGame = async () => {
        try {
            console.log(localStorage.getItem('gamePin'))
            const response = await api.delete('/games/' + localStorage.getItem("gamePin"), {headers: {"playerToken": localStorage.getItem("Token")}});
            console.log(response)

        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }

    };

    const startGame = async () => {
        try {
            history.push("/answerPrompt");


        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }

    };

    let playerCountContent = "minimum 4 PLayers required"
    if(countUsers>3){
        playerCountContent=null;
    }


    if (localStorage.getItem('isHost') === 'true') {
        return ( <BaseContainer>

                <div className="lobby container">


                    <div  className="lobby form2">
                        <h1>GAME: {localStorage.getItem("gamePin")}</h1>
                        <div>
                            <div style={{float: 'left', width: '50%'}}>{qrCode !== null && <img style={{ width: 125, height: 125, marginTop: 40 }} src={qrCode.url} alt="qr code"/>}</div>
                            <div style={{ float: 'right', width: '50%'}}><img style={{ width: 250, height: 250 }} src={QuestionImage} alt="" className="lobby questionimg"/></div>
                        </div>
                    </div>

                    <div className="lobby form">
                        <h1>Players</h1>
                        <ul>{users !== null && users.map((user, index) => {
                            return <li key={index}>{user.playerName}
                                <a
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => deleteUser(user.playerId)}
                                > X </a>
                            </li>})}
                        </ul>
                        <div className="login button-container">
                            <Button className='secondary-button'
                                style={{ marginLeft: "auto" }}
                                width="30%"
                                onClick={() => endGame()}
                            >
                                END
                            </Button>

                            <Button
                                style={{ marginLeft: "auto" }}
                                width="30%"
                                onClick={() => startGame()}
                                disabled={countUsers<4}
                            >
                                START
                            </Button>
                            {playerCountContent}
                        </div>
                    </div>


                </div>

            </BaseContainer>

        );
    }
    else {
        return (
        <BaseContainer>

            <div className="lobby container">


                <div  className="lobby form2">
                    <h1>GAME: {localStorage.getItem("gamePin")}</h1>
                    <div>
                     <div style={{float: 'left', width: '50%'}}>{qrCode !== null && <img style={{ width: 125, height: 125, marginTop: 40 }} src={qrCode.url} alt="qr code"/>}</div>
                     <div style={{ float: 'right', width: '50%'}}><img style={{ width: 250, height: 250 }} src={QuestionImage} alt="" className="lobby questionimg"/></div>
                    </div>
                </div>

                <div className="lobby form">
                    <h1>Players</h1>
                    <ul>{users !== null && users.map((user, index) => {
                        return <li key={index}>{user.playerName}</li>})}
                    </ul>
                    <div className="login button-container">
                        <Button className='secondary-button'
                            style={{ marginLeft: "auto" }}
                            width="30%"
                            onClick={() => leaveGame()}
                        >
                            LEAVE
                        </Button>
                    </div>
                </div>


            </div>

        </BaseContainer>

    );}
};

export default Lobby;
