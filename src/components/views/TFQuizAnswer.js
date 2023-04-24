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



const TFQuizAnswer = props => {

    const history = useHistory();
    const [answer, setAnswer] = useState(null);
    const question=props.question;
    const submitAnswer=(value)=>{
        props.submitAnswer(value);
    }
    const value1="player1";
    const value2="player2";


    return (
        <div className="prompt container">

            <div className="prompt containerQuestion">
                <div className="prompt form">
                    <div className="quiz question-container">
                        <h1>Here comes the Question</h1>
                    </div>
                    <div className="quiz button-container">
                        <div className="quiz upperButtons">
                            <Button width="50%" onClick={()=>submitAnswer(value1)}>
                                True
                            </Button>
                            <Button width="50%" onClick={()=>submitAnswer(value2)}>
                                False
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
export default TFQuizAnswer;
