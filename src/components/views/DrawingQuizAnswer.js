import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
import PropTypes from "prop-types";
import 'styles/views/QuizAnswer.scss';


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */



const DrawingQuizAnswer = props => {
    const question=props.question;
    const submitAnswer=(value)=>{
        props.submitAnswer(value);
    }
    const history = useHistory();
    const value1=question.answerOptions[0].answerOptionId;
    const value2=question.answerOptions[1].answerOptionId;
    const value3=question.answerOptions[2].answerOptionId;
    const value4=question.answerOptions[3].answerOptionId;


    return (
        <div className="prompt container">

            <div className="prompt containerQuestion">
                <div className="quiz form">
                    <div className="quiz question-container">
                        <h1>{question.quizQuestionText}</h1>
                        <img src="/images/questiony.png" alt="" className="quiz questionimg"/>

                    </div>
                    <div className="quiz button-container">
                        <div className="quiz upperButtons">
                            <Button width="50%" onClick={()=>submitAnswer(value1)}>
                                {question.answerOptions[0].answerOptionText}
                            </Button>
                            <Button width="50%" onClick={()=>submitAnswer(value2)}>
                                {question.answerOptions[1].answerOptionText}
                            </Button>
                        </div>

                        <div className="quiz upperButtons">
                            <Button width="50%" onClick={()=>submitAnswer(value3)}>
                                {question.answerOptions[2].answerOptionText}
                            </Button>
                            <Button width="50%" onClick={()=>submitAnswer(value4)}>
                                {question.answerOptions[3].answerOptionText}
                            </Button>
                        </div>
                    </div>

                </div>



            </div>
            <div className="prompt container3">
                <div  className="prompt form2">
                    <img src="/images/questiony.png" alt="" className="quiz questionimg"/>

                </div>
            </div>
        </div>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default DrawingQuizAnswer;
