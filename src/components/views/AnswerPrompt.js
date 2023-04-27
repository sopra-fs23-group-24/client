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

const AnswerPrompt = props => {
    const [counter, setCounter] = useState(0);
    const updateCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
        if(counter > 3){
            console.log("peepeepoopoo")
            history.push("/waitingRoom");
        }
    }

    const history = useHistory();
    const [prompts, setPrompts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(localStorage.getItem("isHost")==="true") {
                    const newState = JSON.stringify({status: "SELECTION"});
                    await api.put('/games/'+ localStorage.getItem("gamePin"), newState, {headers:{"playerToken":localStorage.getItem('Token')}});
                }
                let response2 = await api.get('/games/' + localStorage.getItem("gamePin") +"/prompts");
                if(response2.data.length === 0){
                    const requestBody = JSON.stringify({textNr:2, truefalseNr:2, drawingNr:1});
                    await api.post('/games/' + localStorage.getItem("gamePin") +"/prompts", requestBody);
                    response2 = await api.get('/games/' + localStorage.getItem("gamePin") +"/prompts");
                }
                console.log(response2);

                setPrompts(response2.data);
            } catch (error) {
                alert(`Something went wrong trying to host the game: \n${handleError(error)}`);
            }
        };
        fetchData();
    }, []);


    let content = null;

    if(prompts && prompts !== [] && counter <=4 ){

            if (prompts[counter].promptType === 'TRUEFALSE') {
                content =
                    <TrueFalsePrompt prompts={prompts[counter]} updateCounter={updateCounter} counter={counter}>

                    </TrueFalsePrompt>
            }
            if (prompts[counter].promptType === 'TEXT') {
                content =
                    <TextPrompt prompts={prompts[counter]} updateCounter={updateCounter} counter={counter}>

                    </TextPrompt>
            }
            if (prompts[counter].promptType === 'DRAWING') {
                content =
                    <DrawingPrompt prompts={prompts[counter]} updateCounter={updateCounter} counter={counter}>

                    </DrawingPrompt>
            }

    }

        return (
        <BaseContainer>
            <div className="prompt container">
                {content}
            </div>
        </BaseContainer>

    );
};


export default AnswerPrompt;
