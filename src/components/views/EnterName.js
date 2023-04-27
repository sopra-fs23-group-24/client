import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
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
                placeholder="Enter Name"
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

const EnterName = props => {

    const history = useHistory();
    const [playerName, setPlayerName] = useState(null);
    const id = localStorage.getItem("playerId");
    console.log(id);
    const {pin} = useParams();
    console.log("gameID entername: " + pin)



    const enterName = async () => {
        try {
            const requestBody = JSON.stringify({playerName, isHost: localStorage.getItem("isHost")});
            const response = await api.post('/games/' + pin +"/players", requestBody);


            const user = new User(response.data);
            localStorage.setItem('playerId', user.playerId);
            localStorage.setItem("Token", response.headers["playertoken"]);
            localStorage.setItem('gamePin', pin);

            history.push(`/lobby`); //TODO: find out what this is called

        } catch (error) {
            alert(`Something went wrong trying to host the game: \n${handleError(error)}`);
        }
    };



    return (
        <BaseContainer>
            <div className="joincode container">
                <div className="joincode form">

                    <FormField
                        label="Enter your Name"
                        value={playerName}
                        onChange={n => setPlayerName(n)}
                    />
                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => enterName()}
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
