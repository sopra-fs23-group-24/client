import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
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
                placeholder="Enter Name"
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

const EnterName = props => {

    const history = useHistory();
    const [playerName, setPlayerName] = useState(null);
    const id = localStorage.getItem("playerId");
    const {pin} = useParams();
    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = event => {
        if(event.key === "Enter"){
            enterName();
        }
    };

    const enterName = async () => {
        try {
            const requestBody = JSON.stringify({playerName, isHost: localStorage.getItem("isHost")});
            const response = await api.post('/games/' + pin +"/players", requestBody);


            const user = new User(response.data);
            localStorage.setItem('playerId', user.playerId);
            localStorage.setItem("Token", response.headers["playertoken"]);
            localStorage.setItem('gamePin', pin);
            console.log("Game pin set to: " + localStorage.getItem("gamePin"));

            history.push(`/lobby`);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Username is already taken');
            }
        }
    };


    return (
        <BaseContainer>
            <div className="joincode container">
                <div className="joincode form">

                    <FormField
                        label="Enter your Name"
                        value={playerName}
                        onChange={n => {setPlayerName(n); setErrorMessage('');}}
                        onKeyDown={handleKeyDown}
                    />
                    {playerName && playerName.length > 9 && (
                        <div className="joincode error-message"
                             style={{ color: "red" }}>

                            Username must be 1-9 characters
                        </div>
                    )}
                    {errorMessage && (
                        <div className="joincode error-message" style={{ color: "red" }}>
                            {errorMessage}
                        </div>
                    )}
                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => enterName()}
                            disabled={playerName && playerName.length > 9}
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

export default EnterName;
