import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
import PropTypes from "prop-types";
import 'styles/views/QuizAnswer.scss';
import QuestionImage from "./Images/questiony.png"



/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */



const TextQuizAnswer = props => {

    const history = useHistory();
    const question=props.question;
    const submitAnswer=(value)=>{
        console.log(question.answerOptions[0].answerOptionId);
        console.log(value);
        props.submitAnswer(value);
    }
    const value1=question.answerOptions[0].answerOptionId;
    const value2=question.answerOptions[1].answerOptionId;
    const value3=question.answerOptions[2].answerOptionId;
    const value4=question.answerOptions[3].answerOptionId;
    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);
    const [isClicked4, setIsClicked4] = useState(false);
    const [allDisabled, setAllDisabled] = useState(false);

    const handleClick = (clickNumber) => {
        clickNumber(true);
        setAllDisabled(true);
    };
    let TFStory = null;
    if(question.storyToDisplay!==null){
        TFStory = question.storyToDisplay;
    }
    return (
        <div className="prompt container">

            <div className="prompt containerQuestion">
                <div className="prompt form">
                    <div className="quiz question-container">
                        <h1>{question.quizQuestionText}</h1>
                        <h1>{TFStory}</h1>
                    </div>
                    <div className="quiz button-container">
                        <div className="quiz upperButtons">
                            <Button className={isClicked1 ? 'quiz clicked' : ''}
                                width="50%"
                                disabled={allDisabled}
                                onClick={()=>{submitAnswer(value1); handleClick(setIsClicked1)}}>
                                {question.answerOptions[0].answerOptionText}
                            </Button>
                            <Button className={isClicked2 ? 'quiz clicked' : ''}
                                width="50%"
                                disabled={allDisabled}
                                    onClick={()=>{submitAnswer(value2); handleClick(setIsClicked2)}}>
                                {question.answerOptions[1].answerOptionText}
                            </Button>
                        </div>

                        <div className="quiz upperButtons">
                            <Button className={isClicked3 ? 'quiz clicked' : ''}
                                width="50%"
                                disabled={allDisabled}
                                    onClick={()=>{submitAnswer(value3); handleClick(setIsClicked3)}}>
                                {question.answerOptions[2].answerOptionText}
                            </Button>
                            <Button className={isClicked4 ? 'quiz clicked' : ''}
                                width="50%"
                                disabled={allDisabled}
                                onClick={()=>{submitAnswer(value4); handleClick(setIsClicked4)}}>
                                {question.answerOptions[3].answerOptionText}
                            </Button>
                        </div>
                    </div>

                </div>



            </div>
            <div className="prompt container3">
                <div  className="prompt form2">
                    <img src={QuestionImage} alt="" className="quiz questionimg"/>

                </div>
            </div>
        </div>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default TextQuizAnswer;
