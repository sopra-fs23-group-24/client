import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import QuestionImage from "../Images/questiony.png"


const FormField = props => {
    return (
        <div className="joincode field">
            <label className="joincode label">
                {props.label}
            </label>
            <input
                autoFocus
                className="login input"
                placeholder="XXXXXX"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onKeyDown={props.onKeyDown}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
};

const JoinCode = props => {
    const history = useHistory();
    const [gamePin, setGamePin] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = event => {
        if(event.key === "Enter"){
            joinGame();
        }
    };

    const joinGame = async () => {
        try {
            const response = await api.get('/games/' + gamePin);
            localStorage.setItem("gameLastState", response.data.status)

            const game = new GameInstance(response.data);

            localStorage.setItem('isHost', "false");

            history.push(`/entername/` + game.gamePin);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('No game with this pin found');
            }
        }
    };



    return (
        <BaseContainer>
            <div className="joincode container">
                <div className="joincode form">

                    <FormField
                        label="Enter lobby-code"
                        value={gamePin}
                        onChange={(n) => {
                            setGamePin(n);
                            setErrorMessage('');
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    {errorMessage && (
                        <div className="joincode error-message" style={{ color: "red" }}>
                            {errorMessage}
                        </div>
                    )}
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

export default JoinCode;
