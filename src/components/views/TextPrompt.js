import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
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
        <div className="prompt field">
            <label className="prompt label">
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

const TextPrompt = props => {
    const prompt = props.prompts;
    const updateCounter = () => {
        props.updateCounter();
    }

    const history = useHistory();
    const [answer, setAnswer] = useState(null);
    const submitAnswer=async () => {
        const requestBody = JSON.stringify({associatedPromptNr: prompt.promptNr, answer: answer});
        await api.post('/games/' + localStorage.getItem("gamePin") +"/prompt-answers/text", requestBody, { headers: { "playerToken": localStorage.getItem("Token") } });
    }
    const handleButtonClick=() => {
        submitAnswer();
        updateCounter();
    }


    return (
        <div className="prompt container">
            <div className="prompt container3">
                Question 1
                <div  className="prompt form2">
                    <img src={QuestionImage} alt="" className="prompt questionimg"/>

                </div>
            </div>
            <div className="prompt containerQuestion">
                <div className="prompt form">

                    <FormField
                        label={prompt.promptText}
                        value={answer}
                        onChange={n => setAnswer(n)}
                    />
                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => handleButtonClick()}
                        >
                            JOIN GAME
                        </Button>
                    </div>

                </div>



            </div>
        </div>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default TextPrompt;
