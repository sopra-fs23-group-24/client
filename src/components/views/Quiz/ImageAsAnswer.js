import React, {useEffect, useState} from 'react';
import {Button} from 'components/ui/Button';
import 'styles/views/Prompt.scss';
import 'styles/views/QuizAnswer.scss';
import QuestionImage from "../Images/questiony.png"
import parse from 'html-react-parser'
import CountingTimer from "./timer";
import {api} from "../../../helpers/api";


const ImageAsAnswer = props => {
    const question=props.question;
    const submitAnswer=(value)=>{
        console.log(question.answerOptions[0].answerOptionId);
        props.submitAnswer(value, timeLeft);
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
    const [timeLeft, setTimeLeft] = useState(null); //Hier definiieren wie lange timer geht


    const handleClick = (clickNumber) => {
        clickNumber(true);
        setAllDisabled(true);
    };
    useEffect(() => {
        const setTimer = async () => {
            const response = await api.get('/games/' + localStorage.getItem("gamePin"));
            setTimeLeft(response.data.timer)
        }
        setTimer();
    }, []);

    return (
        <div className="prompt container">

            <div className="prompt containerQuestion">
                <div className="prompt form"
                     style={{height:"auto"}}>
                    <div className="quiz question-container">
                        <h1>{parse(question.quizQuestionText)}</h1>
                    </div>
                    <div className="quiz button-container">
                        <div className="quiz upperButtons">
                            <Button className={isClicked1 ? 'quiz clicked' : ''}
                                    width="50%"
                                    style={{height:"300px"}}
                                    disabled={allDisabled}
                                    onClick={()=>{submitAnswer(value1); handleClick(setIsClicked1)}}
                                    >
                                <img className="quiz answerImage" src={question.answerOptions[0].answerOptionText}/>
                            </Button>
                            <Button className={isClicked2 ? 'quiz clicked' : ''}
                                    width="50%"
                                    style={{height:"300px"}}
                                    disabled={allDisabled}
                                    onClick={()=>{submitAnswer(value2); handleClick(setIsClicked2)}}>
                                <img className="quiz answerImage" src={question.answerOptions[1].answerOptionText}/>
                            </Button>
                        </div>

                        <div className="quiz upperButtons">
                            <Button className={isClicked3 ? 'quiz clicked' : ''}
                                    width="50%"
                                    style={{height:"300px"}}
                                    disabled={allDisabled}
                                    onClick={()=>{submitAnswer(value3); handleClick(setIsClicked3)}}>
                                <img className="quiz answerImage" src={question.answerOptions[2].answerOptionText}/>
                            </Button>
                            <Button className={isClicked4 ? 'quiz clicked' : ''}
                                    width="50%"
                                    style={{height:"300px"}}
                                    disabled={allDisabled}
                                    onClick={()=>{submitAnswer(value4); handleClick(setIsClicked4)}}>
                                <img className="quiz answerImage" src={question.answerOptions[3].answerOptionText}/>
                            </Button>
                        </div>
                    </div>

                </div>



            </div>
            <div className="prompt container3">
                <div  className="prompt form2">
                    <h1><CountingTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} /> </h1>
                    <img src={QuestionImage} alt="" className="quiz questionimg"/>

                </div>
            </div>
        </div>
    );
};

export default ImageAsAnswer;
