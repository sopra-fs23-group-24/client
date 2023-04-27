import React, {useEffect, useRef, useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/DrawingPrompt.scss';
import BaseContainer from "components/ui/BaseContainer";
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
        <div className="drawingprompt field">
            <label className="drawingprompt label">
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


const DrawingPrompt = props => {
    const prompt = props.prompts;
    const counter = props.counter + 1
    const updateCounter = () => {
        props.updateCounter();
    }
    const handleButtonClick=() => {
        submitDrawing();
        updateCounter();
    }
    const history = useHistory();

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("black");

    let dataURL;





    useEffect(() => {


        const canvas = canvasRef.current;
        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight ;
        canvas.style.width = `${window.innerWidth/1.8}px`;
        canvas.style.height = `${window.innerHeight/1.5}px`;






        const context = canvas.getContext("2d")
        context.scale(1.8,1.5);
        canvas.id="myCanvas";
        context.lineCap = "round";
        context.strokeStyle=color;
        context.lineWidth = 1.5;
        contextRef.current = context;



    }, [])
    const startDrawing = ({nativeEvent}) => {
        contextRef.current.strokeStyle = color;

        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false);
    }

    const draw = ({nativeEvent}) => {
        contextRef.current.strokeStyle = color;

        console.log("The color is" + color)
        if(!isDrawing){ return;}
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY)
        contextRef.current.stroke()
    }

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };




    const submitDrawing = async () => {
        try {
            const canvas = document.getElementById('myCanvas');
            dataURL = canvas.toDataURL();
            console.log(dataURL);
            const requestBody = JSON.stringify({ associatedPromptNr: prompt.promptNr, answerDrawing: dataURL }); // stringifien und dann schicken


            await api.post('/games/' + localStorage.getItem("gamePin") +"/prompt-answers/drawing", requestBody, { headers: { "playerToken": localStorage.getItem("Token") } });


        } catch (error) {
            alert(`Something went wrong trying to host the game: \n${handleError(error)}`);
        }
    };







    return (
        <BaseContainer>

            <div className="drawingprompt container">
                <div className="prompt container3">
                 Question {counter}
                <div className="drawingprompt form2">
                    <img src={QuestionImage} alt="" className="drawingprompt questionimg"/>

                </div>
                </div>
                <div className="drawingprompt form">

                    <FormField
                        label={prompt.promptText}

                    />
                    <div className = "drawingprompt row">

                    <div>
                        <canvas
                            className="drawingprompt canvas"
                            onMouseDown={startDrawing}
                            onMouseUp={finishDrawing}
                            onMouseMove={draw}
                            ref={canvasRef}
                        />
                    </div>


                    <div className = "drawingprompt column">
                        <div className="drawingprompt colorbutton-container">

                            <Button

                                onClick={() => setColor('blue')}
                                style={{ backgroundColor: 'blue', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => setColor('red')}
                                style={{ backgroundColor: 'red', width: '20px', height : '20px' }}

                            >
                            </Button>
                            <Button
                                onClick={() => setColor('yellow')}
                                style={{ backgroundColor: 'yellow', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => setColor("green")}
                                style={{ backgroundColor: 'green', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => setColor("violet")}

                                style={{ backgroundColor: 'violet', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => setColor("black")}
                                style={{ backgroundColor: 'black', width: '20px', height : '20px' }}
                            >
                            </Button>

                        </div>


                        <div className="drawingprompt button-container">

                            <Button
                                width="100%"
                                onClick={() => clearCanvas()}
                                style={{ backgroundColor: 'blue' }}
                            >
                                CLEAR CANVAS
                            </Button>

                        </div>

                        <div className="drawingprompt button-container">
                            <Button
                                width="100%"
                                onClick={() => handleButtonClick()}
                            >
                                Submit Drawing
                            </Button>
                        </div>
                    </div>
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
export default DrawingPrompt;
