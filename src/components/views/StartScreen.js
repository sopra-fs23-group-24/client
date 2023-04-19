import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/StartScreen.scss';
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
        <div className="startscreen field">
            <label className="startscreen label">
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

const StartScreen = props => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);

    const hostGame = async () => {
        try {
            const response = await api.post('/games');

            // Get the returned user and update a new object.
            const game = new GameInstance(response.data);

            // Store the id and gamepin into the local storage.
            localStorage.setItem('gamePin', game.gamePin);
            localStorage.setItem('isHost', "true");


            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/enterName`); //TODO: find out what this is called
        } catch (error) {
            alert(`Something went wrong trying to host the game: \n${handleError(error)}`);
        }
    };

    const joinGame = async () => {
        try {

            history.push(`/joincode`);
        } catch (error) {
            alert(`Something went wrong during joining a game: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="startscreen container">
                <div className="startscreen form">




                    <img src="/bubbleQuest.png" alt="" className="startscreen questionimg"   />


                </div>

                <div  className="startscreen form2">
                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => hostGame()}
                        >
                            HOST GAME
                        </Button>
                    </div>

                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => joinGame()}
                        >
                            JOIN VIA CODE
                        </Button>
                    </div>
                </div>


            </div>
        </BaseContainer>

    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default StartScreen;
