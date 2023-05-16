import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import User from "../../models/User";
import QuestionImage from "./Images/questiony.png"
import parse from 'html-react-parser'

const Lobby = () => {
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [countUsers, setCountUsers] = useState(0);

  useEffect(() => {

    const fetchDataLobby = async () => {
      try {
        const responseLobby = await api.get('/games/' + localStorage.getItem("gamePin"));
        localStorage.setItem("gameLastState", responseLobby.data.status)
        if (responseLobby.data.status === 'PROMPTS') {
            //TODO: make it so players don't get redirected until prompts ready
            history.push("/answerPrompt");
        }
        const response = await api.get('/games/' + localStorage.getItem("gamePin") + '/players');
        setUsers(response.data);

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
    createQrCode();
    const intervalId = setInterval(fetchDataLobby, 1000);
    return () => clearInterval(intervalId);


  }, []);

  useEffect(() => {

    const checkPlayers = () => {
      if (users !== null) {
        let isPLayerFound = false;
        for (let i = 0; i < users.length; i++) {
          const user = new User(users[i]);
          if (user.playerId.toString() === localStorage.getItem("playerId")) {
            isPLayerFound = true;
          }
        }
        setCountUsers(users.length);
        if (isPLayerFound === false) {
          alert("You were removed from the game.")
          localStorage.removeItem("playerId");
          localStorage.removeItem("isHost");
          localStorage.removeItem("gamePin");
          localStorage.removeItem("Token");
          localStorage.removeItem("gameLastState");
          history.push("/startscreen");
        }
      }
    }
    const intervalId = setInterval(checkPlayers, 300);
    return () => clearInterval(intervalId);
  }, [users])

  const createQrCode = () => {
    const options = {
      method: 'GET',
      url: 'https://codzz-qr-cods.p.rapidapi.com/getQrcode',
      params: {
        type: 'url',
        value: 'https://sopra-fs23-group-24-client.oa.r.appspot.com/entername/' + localStorage.getItem('gamePin')
      },
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

  const deleteUser = async (playerId) => {
    try {
      const response = await api.delete('/games/' + localStorage.getItem("gamePin") + '/players/' + playerId, {headers: {"playerToken": localStorage.getItem("Token")}});

    } catch (error) {
      alert(`Something went wrong trying to delete the user: \n${handleError(error)}`);
    }

  };

  const endGame = async () => {
    try {
      console.log(localStorage.getItem('gamePin'))
      const response = await api.delete('/games/' + localStorage.getItem("gamePin"), {headers: {"playerToken": localStorage.getItem("Token")}});
      localStorage.removeItem("playerId");
      localStorage.removeItem("isHost");
      localStorage.removeItem("gamePin");
      localStorage.removeItem("gameLastState");
      localStorage.removeItem("Token");
      console.log(response)

    } catch (error) {
      alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
    }

  };

    const startGame = async () => {
        try {
            const newState = JSON.stringify({status: "SELECTION"});
            const response = await api.put('/games/'+ localStorage.getItem("gamePin"), newState, {headers:{"playerToken":localStorage.getItem('Token')}});
            localStorage.setItem("gameLastState", response.data.status)

            history.push("/selectionpage");


        } catch (error) {
            alert(`Something went wrong trying to go to the selection stage: \n${handleError(error)}`);
        }

  };

  let playerCountContent = "Minimum 4 Players required"
  if (countUsers > 3) {
    playerCountContent = null;
  }


  if (localStorage.getItem('isHost') === 'true') {
    return (
      <BaseContainer>

        <div className="lobby container">


          <div className="lobby form2">
            <h1>GAME: {localStorage.getItem("gamePin")}</h1>
            <div>
              <div style={{float: 'left', width: '50%'}}>{qrCode !== null &&
                <img style={{width: 125, height: 125, marginTop: 40}} src={qrCode.url} alt="qr code"/>}</div>
              <div style={{float: 'right', width: '50%'}}><img style={{width: 250, height: 250}} src={QuestionImage}
                                                               alt="" className="lobby questionimg"/>
              </div>
            </div>
          </div>

          <div className="lobby form">
            <h1>Players</h1>
            <ul>{users !== null && users.map((user, index) => {
              return <li key={index}><span className="leaderboardview player-name">{parse(user.playerName)}</span>

                <a
                  style={{marginLeft: "auto"}}
                  onClick={() => deleteUser(user.playerId)}
                > <span className="leaderboardview score" style={{color: "red"}}>X</span> </a>
              </li>
            })}
            </ul>
            <div className="login button-container">
              <Button className='secondary-button'
                      style={{marginLeft: "auto"}}
                      width="30%"
                      onClick={() => endGame()}
              >
                END
              </Button>

              <Button
                style={{marginLeft: "auto"}}
                width="30%"
                onClick={() => startGame()}
                disabled={countUsers < 4}
              >
                START
              </Button>
              {playerCountContent}
            </div>
          </div>
        </div>

      </BaseContainer>
    )

  } else {
    return (
      <BaseContainer>

        <div className="lobby container">


          <div className="lobby form2">
            <h1>GAME: {localStorage.getItem("gamePin")}</h1>
            <div>
              <div style={{float: 'left', width: '50%'}}>{qrCode !== null &&
                <img style={{width: 125, height: 125, marginTop: 40}} src={qrCode.url} alt="qr code"/>}</div>
              <div style={{float: 'right', width: '50%'}}><img style={{width: 250, height: 250}} src={QuestionImage}
                                                               alt="" className="lobby questionimg"/></div>
            </div>
          </div>

          <div className="lobby form">
            <h1>Players</h1>
            <ul>{users !== null && users.map((user, index) => {
              return <li key={index}>{user.playerName}</li>
            })}
            </ul>
            <div className="login button-container">
              <Button className='secondary-button'
                      style={{marginLeft: "auto"}}
                      width="30%"
                      onClick={() => leaveGame()}
              >
                LEAVE
              </Button>
            </div>
          </div>


        </div>
      </BaseContainer>
    );
  }
};

export default Lobby;
