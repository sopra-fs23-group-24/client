import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import GameInstance from 'models/GameInstance';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Spinner} from 'components/ui/Spinner';
import 'styles/views/StartScreen.scss';

import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import QuestionImageBubble from "./Images/bubbleQuest.png"

import 'styles/views/Login.scss';
import User from "../../models/User";


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
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);




    useEffect(()=> {
        const myButton = document.getElementById('hostButton');
        const myButton2 = document.getElementById('joinButton');


        const delay = 1000;

        setTimeout(() => {
            myButton.style.display = 'block';
        }, delay);
        setTimeout(() => {
            myButton2.style.display = 'block';
        }, delay);
        localStorage.removeItem("playerId");
        localStorage.removeItem("isHost");
        localStorage.removeItem("gamePin");
        localStorage.removeItem("Token");
    },[])



    const hostGame = async () => {
        try {
            const myButton = document.getElementById('hostButton');
            const myButton2 = document.getElementById('joinButton');

            myButton.style.display = 'none';
            myButton2.style.display = 'none';
            setIsVisible(true);
            setIsAnimated(true);

            const response = await api.post('/games');

            const game = new GameInstance(response.data);

            localStorage.setItem('isHost', "true");

            await new Promise(resolve => setTimeout(resolve, 3000));
            if (await response){history.push(`/enterName/` + game.gamePin);}
        } catch (error) {
            alert(`Something went wrong trying to host the game: \n${handleError(error)}`);
        }
    };

    const joinGame = async () => {
        try {
            const myButton = document.getElementById('hostButton');
            const myButton2 = document.getElementById('joinButton');

            myButton.style.display = 'none';
            myButton2.style.display = 'none';
            setIsVisible(true);
            setIsAnimated(true);

            await new Promise(resolve => setTimeout(resolve, 3000));
            history.push("/joincode")
        } catch (error) {
            alert(`Something went wrong during joining a game: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="startscreen container">
                <div className="startscreen form">




                    <img src={QuestionImageBubble} alt="" className={isAnimated ? 'startscreen questionimg' : 'startscreen question'}   />


                </div>

                <div  className="startscreen form2">
                    <div className="login button-container">
                        <Button className = "startscreen appearingButton" id="hostButton" style={{display: 'none'}}

                            width="100%"
                            onClick={() => hostGame()}
                        >
                            HOST GAME
                        </Button>

                    </div>

                    {isVisible && <div><h1>Loading...</h1> </div>}

                    {isVisible && <div className="loading-spinner"><Spinner/> </div>}


                    <div className="login button-container">

                        <Button className ="startscreen appearingButton2" id="joinButton" style={{display: 'none'}}
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
