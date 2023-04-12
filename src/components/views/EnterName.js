import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

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


    const enterName = async () => {
        try {
            const requestBody = JSON.stringify({playerName, isHost: localStorage.getItem("isHost")});
            const response = await api.post('/games/' + localStorage.getItem("gamePin") +"/players", requestBody);


            const user = new User(response.data);
            localStorage.setItem("Token", response.headers["playerToken"])

            // Login successfully worked --> navigate to the route /game in the GameRouter
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
                    <img src="/images/questiony.png" alt="" className="joincode questionimg"/>


                </div>


            </div>
        </BaseContainer>

    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default EnterName;
