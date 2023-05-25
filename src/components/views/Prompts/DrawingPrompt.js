import React, {useEffect, useRef, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import 'styles/views/DrawingPrompt.scss';
import PropTypes from "prop-types";
import eraserImage from "../Images/eraser.png"


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
    const updateCounter = () => {
        props.updateCounter();
    }
    const handleButtonClick = () => {
        submitDrawing();
        updateCounter();
    }

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("black");
    const [lineWidth, setLineWidth] = useState(1.5);
    const [isEmpty, setIsEmpty] = useState(true);

    let dataURL;


    useEffect(() => {
        const canvas = canvasRef.current;
        const setCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = `${window.innerWidth / 1.5}px`;
            canvas.style.height = `${window.innerHeight / 1.5}px`;

            const context = canvas.getContext('2d');
            context.scale(1.5, 1.5);
            canvas.id = 'myCanvas';
            context.lineCap = 'round';
            context.lineWidth = lineWidth; // Set the initial line width
            contextRef.current = context;
        }

        setCanvas();
        const resizeCanvas = () => {
            canvas.style.width = `${window.innerWidth / 1.5}px`;
            canvas.style.height = `${window.innerHeight / 1.5}px`;
        }

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }

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

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = getCoordinatesFromEvent(nativeEvent);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        setIsEmpty(false);
        nativeEvent.preventDefault();
    };

    const draw = ({nativeEvent}) => {
        if (!isDrawing) return;

        const {offsetX, offsetY} = getCoordinatesFromEvent(nativeEvent);

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
        nativeEvent.preventDefault();
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
        return {offsetX, offsetY};
    };


    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setIsEmpty(true);
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
            const requestBody = JSON.stringify({associatedPromptNr: prompt.promptNr, answerDrawing: dataURL}); // stringifien und dann schicken

            //clear canvas after stringifying
            clearCanvas();
            await api.post('/games/' + localStorage.getItem("gamePin") + "/prompt-answers/drawing", requestBody, {headers: {"playerToken": localStorage.getItem("Token")}});
        } catch (error) {
            alert(`Something went wrong trying to submit drawing: \n${handleError(error)}`);
        }
    };

    return (
        <div className="drawingprompt container">
            <div className="drawingprompt form">
                <div className="drawingprompt canvasHeader">
                    <h1>{prompt.promptText}</h1>
                    <div className="drawingprompt colorbutton-container">
                        <Button
                            onClick={() => changeColor('blue')}
                            style={{backgroundColor: 'blue'}}
                        >
                        </Button>
                        <Button
                            onClick={() => changeColor('red')}
                            style={{backgroundColor: 'red'}}

                        >
                        </Button>
                        <Button
                            onClick={() => changeColor('yellow')}
                            style={{backgroundColor: 'yellow'}}
                        >
                        </Button>
                        <Button
                            onClick={() => changeColor('green')}
                            style={{backgroundColor: 'green'}}
                        >
                        </Button>
                        <Button
                            onClick={() => changeColor('violet')}

                            style={{backgroundColor: 'violet'}}
                        >
                        </Button>
                        <Button
                            onClick={() => changeColor('black')}
                            style={{backgroundColor: 'black'}}
                        >
                        </Button>
                        <Button
                            className="custom-button"
                            onClick={handleEraserClick}
                            style={{backgroundColor: 'transparent'}}
                        >
                            <img
                                src={eraserImage}
                                alt="Eraser"
                                className="button-image"
                                style={{width: '20px', height: '20px'}}
                            />
                        </Button>

                    </div>
                </div>
                <div className="drawingprompt row">

                    <div className="drawingprompt canvasBox">
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


                    <div className="drawingprompt column">

                        <div className="drawingprompt button-container">

                            <Button
                                width="100%"
                                onClick={() => clearCanvas()}
                                style={{backgroundColor: 'blue'}}
                            >
                                CLEAR CANVAS
                            </Button>

                        </div>

                        <div className="drawingprompt button-container">
                            <Button
                                width="100%"
                                onClick={() => handleButtonClick()}
                                disabled={isEmpty === true}
                            >
                                Submit Drawing
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawingPrompt;
