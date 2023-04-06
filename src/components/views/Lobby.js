//import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
//import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
//import StartScreen from './StartScreen';

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
    return (
        <div className="lobby field">
            <label className="lobby label">
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

const Lobby = () => {
    const history = useHistory();
    //const [gamePin, setGamePin] = useState(null);


    const leaveGame = async () => {
        try {
            const response = await api.delete('/players' + localStorage.getItem("playerId"));
            // TODO: use response!!

            // Leaving worked successfully--> navigate to the start screen
            history.push(`/startscreen`);

        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }
    };

    /*const displayPlayers = async () => {
        try {
            //TO DO: get request


        } catch (error) {
            alert(`Something went wrong while trying to display users: \n${handleError(error)}`);
        }
    };*/



    return (
        <BaseContainer>
            
            <div className="lobby container">

                <div  className="lobby form2">
                    <img src="/images/questiony.png" alt="" className="lobby questionimg"/>
                </div>

                <div className="lobby form">
                    <h1>Players</h1>

                    <div className="login button-container">
                        <Button
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

    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Lobby;
