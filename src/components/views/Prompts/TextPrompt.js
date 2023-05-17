import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
import PropTypes from "prop-types";
import QuestionImage from "../Images/questiony.png"


const FormField = props => {
    return (
        <div className="prompt field">
            <label className="prompt label">
                {props.label}
            </label>
            <input
                autoFocus
                className="login input"
                placeholder="Enter Text"
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

const TextPrompt = props => {
    const prompt = props.prompt;
    const counterDisplay = props.counter + 1;
    const updateCounter = () => {
        props.updateCounter();
    }

    const handleKeyDown = event => {
        if(event.key === "Enter"){
            submitAnswer();
            updateCounter();
        }
    };

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
                Question {counterDisplay}
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
                        onKeyDown={handleKeyDown}
                    />
                    <div className="login button-container">
                        <Button
                            width="100%"
                            onClick={() => handleButtonClick()}
                        >
                            Submit Answer
                        </Button>
                    </div>

                </div>



            </div>
        </div>
    );
};

export default TextPrompt;
