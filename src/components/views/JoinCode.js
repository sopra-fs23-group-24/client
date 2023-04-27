import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

import QuestionImage from "./Images/questiony.png"

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
    return (
        <div className="joincode field">
            <label className="joincode label">
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

const JoinCode = props => {
    const history = useHistory();
    const [gamePin, setGamePin] = useState(null);

    const joinGame = async () => {
        try {
            const response = await api.get('/games/' + gamePin);

            // Get the returned user and update a new object.
            //TODO: if it gets correct response continue with code:
            const game = new GameInstance(response.data);

            // Store the id and gamepin into the local storage.
            localStorage.setItem('isHost', "false");

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/entername/` + game.gamePin); //TODO: find out what this is called

        } catch (error) {
            alert(`Something went wrong trying to host the game: \n${handleError(error)}`);
        }
    };



    return (
        <BaseContainer>
            <div className="joincode container">
                <div className="joincode form">

                    <FormField
                        label="Enter lobby-code"
                        value={gamePin}
                        onChange={n => setGamePin(n)}
                    />
                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => joinGame()}
                        >
                            JOIN GAME
                        </Button>
                    </div>

                </div>

                <div  className="joincode form2">
                    <img src={QuestionImage} alt="" className="joincode questionimg"/>


                </div>


            </div>
        </BaseContainer>

    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default JoinCode;
