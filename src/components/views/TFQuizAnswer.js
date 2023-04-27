import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
import 'styles/views/QuizAnswer.scss';
import QuestionImage from "./Images/questiony.png"


const TFQuizAnswer = props => {
    const question=props.question;
    const submitAnswer=(value)=>{
        props.submitAnswer(value);
    }
    const value1=question.answerOptions[0].answerOptionId;
    const value2=question.answerOptions[1].answerOptionId;
    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
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

export default TFQuizAnswer;
