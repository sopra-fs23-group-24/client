import React, {useEffect, useState} from 'react';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
import 'styles/views/QuizAnswer.scss';
import QuestionImage from "../Images/questiony.png"
import parse from 'html-react-parser'
import CountingTimer from "./timer";
import {api} from "../../../helpers/api";


const DrawingQuizAnswer = props => {
    const question=props.question;
    const submitAnswer=(value)=>{
        props.submitAnswer(value, timeLeft);
        answered = true;
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
    const [timerYes, setTimerYes] = useState(true);
    let timerContent = null;
    const [timeLeft, setTimeLeft] = useState(null); //Hier definiieren wie lange timer geht
    let answered = false;

    useEffect(() => {

        if (timeLeft === 0) {
            if(answered === false){props.submitAnswer(value1, 0);}
        }
    }, [timeLeft]);

    useEffect(() => {
        const setTimer = async () => {
            const response = await api.get('/games/' + localStorage.getItem("gamePin"));
            setTimeLeft(Number(response.data.timer))
            if (Number(response.data.timer) <0){setTimerYes(false);}
        }
        setTimer();
    }, []);

    const handleClick = (clickNumber) => {
        clickNumber(true);
        setAllDisabled(true);
    };

    if (timerYes === true){
        timerContent =
            <h1><CountingTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} /> </h1>
    }


    return (
        <div className="quiz container">

            <div className="quiz containerQuestion">
                <div className="quiz form">
                    <div className="quiz question-container">
                        <h1>{parse(question.quizQuestionText)}</h1>
                        <img src={question.imageToDisplay} alt="" style={{height:"100%",width:"100%",objectFit:"contain"}}/>

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
                <div  className="quiz form2">
                    {timerContent}

                    <img src={QuestionImage} alt="" className="quiz questionimg"/>

                </div>
            </div>
        </div>
    );
};


export default DrawingQuizAnswer;
