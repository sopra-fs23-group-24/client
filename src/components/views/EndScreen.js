import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/EndScreen.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import Game from "./Game";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
    return (
        <div className="EndScreen field">
            <label className="EndScreen label">
                {props.label}
            </label>
        </div>



    );
};



FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};



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
            console.log(playerList);
            console.log(response);
            console.log("test");
        };
        fetchData();
    }, []);




    if (playerList){
        contentPodium =
            <div className="endscreen form">

            <div className="endscreen displayName">
                <h1>{playerList[0].playerName}</h1>
                <div
                    className = "endscreen podiumForm" style={{ height: "250px" }}> <h2>Score: 10</h2> <h2>2 out of 7</h2>
                </div>
            </div>


            <div className="endscreen displayName">
                <h1>Username 2</h1>
                <div
                    className = "endscreen podiumForm" style={{ height: "300px" }}> <h2>Score: 20</h2> <h2>1 out of 7</h2>
                </div>
            </div>

            <div className="endscreen displayName">
                <h1>Us</h1>
                <div
                    className = "endscreen podiumForm" style={{ height: "200px" }}> <h2>Score: 0</h2> <h2>3 out of 7</h2>
                </div>
            </div>

        </div>
    }

    if (localStorage.getItem("isHost") === true){
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
        //code (request) to delete all scores / answers
        history.push("/lobby")
    };
    const endGame = async() => {
        //delete Lobby Code
    };

    const leaveLobby = async() => {
        //leave lobby code
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

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default EndScreen;
