import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/WaitingRoom.scss';
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
        <div className="waitingroom field">
            <label className="waitingroom label">
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

const WaitingRoom = props => {
    const history = useHistory();


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/games/'+ localStorage.getItem("gamePin"));
            if (response.data.status !== 'PROMPT') {
                history.push("/startscreen");
            }

        };

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);
/*
    useEffect(() => {
        if (data.status !== 'PROMPT') {
            history.push("/startscreen");
        }
    }, [data]);

 */


    const changeStatus = () => {
        const newState = JSON.stringify({status:"SELECTION"});
        api.put('/games/'+ localStorage.getItem("gamePin"), newState, {headers:{"playerToken":localStorage.getItem('Token')}});
    }

    return (
        <BaseContainer>
            <div className="waitingroom container">
                <div className="waitingroom form">
                    <img src="/images/questiony.png" alt="" className="waitingroom questionimg"   />
                </div>
                <div  className="waitingroom form2">
                    <h1>Waiting for other players to answer the questions!</h1>
                    <Button
                        width="100%"
                        onClick={() => changeStatus()}
                    >
                        Change Status
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default WaitingRoom;
