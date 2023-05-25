import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import DrawingPrompt from "./DrawingPrompt";
import TrueFalsePrompt from "./TrueFalsePrompt";
import TextPrompt from "./TextPrompt";
import PromptInstance from "../../../models/PromptInstance";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const AnswerPrompt = props => {
    const [counter, setCounter] = useState(0);
    const updateCounter = () => {
        let counter = Number(localStorage.getItem("promptCounter"))
        counter = counter + 1
        localStorage.setItem("promptCounter", String(counter))
        setCounter(counter)
        if (localStorage.getItem("promptCounter") >= promptNr) {
            history.push("/waitingRoom");
        }
    }

    const history = useHistory();
    const [prompts, setPrompts] = useState(null);
    const [promptNr, setPromptNr] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response2 = await api.get('/games/' + localStorage.getItem("gamePin") + "/prompts");
                setPromptNr(response2.data.length)
                setCounter(Number(localStorage.getItem("promptCounter")));

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

    if (prompts && prompts !== [] && Number(localStorage.getItem("promptCounter")) <= promptNr - 1) {

        let counter = Number(localStorage.getItem("promptCounter"))
        const currentPrompt = new PromptInstance(prompts[counter])

        if (currentPrompt.promptType === 'TRUEFALSE') {
            content =
                <TrueFalsePrompt prompt={currentPrompt} updateCounter={updateCounter} counter={counter}>

                </TrueFalsePrompt>
        }
        if (currentPrompt.promptType === 'TEXT') {
            content =
                <TextPrompt prompt={currentPrompt} updateCounter={updateCounter} counter={counter}>

                </TextPrompt>
        }
        if (currentPrompt.promptType === 'DRAWING') {
            content =
                <DrawingPrompt prompt={currentPrompt} updateCounter={updateCounter} counter={counter}>

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
