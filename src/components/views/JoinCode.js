import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import QuestionImage from "./Images/questiony.png"


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
    const [errorMessage, setErrorMessage] = useState('');

    const joinGame = async () => {
        try {
            const response = await api.get('/games/' + gamePin);

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
