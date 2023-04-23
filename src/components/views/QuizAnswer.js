import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import DrawingPrompt from "./DrawingPrompt";
import TrueFalsePrompt from "./TrueFalsePrompt";
import {Spinner} from "../ui/Spinner";
import TextPrompt from "./TextPrompt";
import TextQuizAnswer from "./TextQuizAnswer";
import TFQuizAnswer from "./TFQuizAnswer";
import DrawingQuizAnswer from "./DrawingQuizAnswer";


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

const QuizAnswer = props => {

    const history = useHistory();
    const [question, setQuestion] = useState(null);

    /*
    api.post('/games/'+ localStorage.getItem("gamePin") + 'quizQuestions')
    */
    const getQuestions = async () => {
        await api.get('/games/'+ localStorage.getItem("gamePin") + 'quizQuestions');

    };


    let content = <Spinner/>


    return (
        <BaseContainer>
            <div className="login button-container">
                <Button
                    width="100%"
                    onClick={() => getQuestions()}
                >
                    JOIN GAME
                </Button>

            </div>
            <div className="prompt container">
                <TextQuizAnswer>
                </TextQuizAnswer>
            </div>
            <TFQuizAnswer>

            </TFQuizAnswer>
            <DrawingQuizAnswer>

            </DrawingQuizAnswer>
        </BaseContainer>

    );
};


export default QuizAnswer;
