import React, {useEffect, useRef, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/DrawingPrompt.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import QuestionImage from "./Images/questiony.png"
import eraserImage from "./Images/eraser.png"


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
    const prompt = props.prompt;
    const counterDisplay = props.counter + 1
    const updateCounter = () => {
        props.updateCounter();
    }
    const handleButtonClick=() => {
        submitDrawing();
        updateCounter();
    }

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("black");
    const [lineWidth, setLineWidth] = useState(1.5);

    let dataURL;





    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth / 1.8}px`;
        canvas.style.height = `${window.innerHeight / 1.5}px`;

        const context = canvas.getContext('2d');
        context.scale(1.8, 1.5);
        canvas.id = 'myCanvas';
        context.lineCap = 'round';
        context.lineWidth = lineWidth; // Set the initial line width
        contextRef.current = context;
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
        }
    }, [color]);
    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.lineWidth = lineWidth;
        }
    }, [lineWidth]);



    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false);
    }

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = getCoordinatesFromEvent(nativeEvent);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = getCoordinatesFromEvent(nativeEvent);

        // Use eraser color and line width if the eraser button is active
        if (color === 'white') {
            contextRef.current.globalCompositeOperation = 'destination-out';
            contextRef.current.strokeStyle = 'rgba(0,0,0,1)';
            contextRef.current.lineWidth = 35; // Adjust the line width for erasing
        } else {
            contextRef.current.globalCompositeOperation = 'source-over';
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = lineWidth;
        }

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };
    const getCoordinatesFromEvent = (event) => {
        let offsetX, offsetY;
        if (event.changedTouches && event.changedTouches.length > 0) {
            const touch = event.changedTouches[0];
            offsetX = touch.clientX - canvasRef.current.getBoundingClientRect().left;
            offsetY = touch.clientY - canvasRef.current.getBoundingClientRect().top;
        } else {
            offsetX = event.offsetX;
            offsetY = event.offsetY;
        }
        return { offsetX, offsetY };
    };


    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const handleEraserClick = () => {
        setColor("white");
    };

    const changeColor = (col) => {
        setColor(col);
        setLineWidth(1.5);
    }




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
                 Question {counterDisplay}
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
                            onTouchStart={startDrawing}
                            onTouchEnd={finishDrawing}
                            onTouchMove={draw}
                            ref={canvasRef}
                        />

                    </div>


                    <div className = "drawingprompt column">
                        <div className="drawingprompt colorbutton-container">

                            <Button

                                onClick={() => changeColor('blue')}
                                style={{ backgroundColor: 'blue', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => changeColor('red')}
                                style={{ backgroundColor: 'red', width: '20px', height : '20px' }}

                            >
                            </Button>
                            <Button
                                onClick={() => changeColor('yellow')}
                                style={{ backgroundColor: 'yellow', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => changeColor('green')}
                                style={{ backgroundColor: 'green', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => changeColor('violet')}

                                style={{ backgroundColor: 'violet', width: '20px', height : '20px' }}
                            >
                            </Button>
                            <Button
                                onClick={() => changeColor('black')}
                                style={{ backgroundColor: 'black', width: '20px', height : '20px' }}
                            >
                            </Button>


                        </div>

                        <div className="drawingprompt button-container">
                            <Button
                                className="custom-button"
                                onClick={handleEraserClick}
                                style={{ backgroundColor: 'transparent' }}
                            >
                                <img
                                    src={eraserImage}
                                    alt="Eraser"
                                    className="button-image"
                                    style={{ width: '20px', height: '20px' }}
                                />
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

export default DrawingPrompt;
