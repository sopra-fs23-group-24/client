import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import DrawingPrompt from "./DrawingPrompt";
import TrueFalsePrompt from "./TrueFalsePrompt";
import TextPrompt from "./TextPrompt";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const AnswerPrompt = props => {
    const [counter, setCounter] = useState(0);
    const updateCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
        if(counter > promptNr-2){
            history.push("/waitingRoom");
        }
    }

    const history = useHistory();
    const [prompts, setPrompts] = useState(null);
    const [promptNr, setPromptNr] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response2 = await api.get('/games/' + localStorage.getItem("gamePin") +"/prompts");
                console.log(response2.data);
                setPromptNr(response2.data.length)

                setPrompts(response2.data);
            } catch (error) {
                if (error.response.status === 404) {
                    alert("The game has been ended by the host.")
                    localStorage.removeItem("playerId");
                    localStorage.removeItem("isHost");
                    localStorage.removeItem("gamePin");
                    localStorage.removeItem("Token");
                    localStorage.removeItem("gameLastState");
                    history.push("/startscreen");
                }
            }
        };
        fetchData();
    }, []);


    let content = null;

    if(prompts && prompts !== [] && counter <=promptNr-1 ){

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
