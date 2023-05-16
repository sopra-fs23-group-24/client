import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import 'styles/views/JoinCode.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Button} from "../ui/Button";
import {useHistory} from "react-router-dom";


/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const SelectionPage = props => {
    const history = useHistory();
    const [trueFalseNr, setTrueFalseNr] = useState(1);
    const [textNr , setTextNr] = useState(1);
    const [drawingNr, setDrawingNr] = useState(1);
    const [timer, setTimer] = useState(40);
    let selectionSent = false;

    //unnecessary - needs to happen before going to this page!
    /*useEffect(async () => {
      try {
            if (localStorage.getItem("isHost") === "true") {
                const newState = JSON.stringify({status: "SELECTION"});
                await api.put('/games/' + localStorage.getItem("gamePin"), newState, {headers: {"playerToken": localStorage.getItem('Token')}});
            console.log('HALLOHALLO');
            }
        }
        catch (error) {
            alert(`Something went wrong trying to setup the prompt selection for the game: \n${handleError(error)}`);
        }
    }, []);*/

    async function changeTFQuestions(value) {
      setTrueFalseNr(trueFalseNr + value);
    }

    async function changeTextQuestions(value) {
      setTextNr(textNr + value);
    }

    async function changeDrawingQuestion(value) {
      setDrawingNr(drawingNr + value);
    }

    async function updatePrompts() {
      const requestBody = JSON.stringify({
        textNr: textNr,
        trueFalseNr: trueFalseNr,
        drawingNr: drawingNr,
        timer: timer
      });
      await api.post('/games/' + localStorage.getItem("gamePin") + "/prompts", requestBody);
    }

    const startGame = async () => {
      try {
        await updatePrompts();
        //need to change the stage for all users... - especially the non-hosts
        //NO - happens automatically when prompts are set!
        //const newState = JSON.stringify({status: "PROMPT"});
        //await api.put('/games/'+ localStorage.getItem("gamePin"), newState, {headers:{"playerToken":localStorage.getItem('Token')}});

        const responseLobby = await api.get('/games/' + localStorage.getItem("gamePin"));
        localStorage.setItem("gameLastState", responseLobby.data.status)
        history.push("/answerprompt");
      } catch (error) {
        alert(`Something went wrong trying to set the prompts: \n${handleError(error)}`);
      }
    };

    return (
      <BaseContainer>
        <div className="drawingprompt container">
          <div className="drawingprompt form">
            <div>
              <h1>
                {trueFalseNr} TRUE OR FALSE QUESTIONS
                <Button
                  style={{marginLeft: "auto"}}
                  width='5%'
                  onClick={() => changeTFQuestions(-1)}>
                  -
                </Button>
                <Button
                  style={{marginLeft: "auto"}}
                  width='5%'
                  onClick={() => changeTFQuestions(1)}>
                  +
                </Button>
              </h1>


              <h1>{textNr} TEXT QUESTIONS
                <Button
                  style={{marginLeft: "auto"}}
                  width='5%'
                  onClick={() => changeTextQuestions(-1)}>
                  -
                </Button>
                <Button
                  style={{marginLeft: "auto"}}
                  width='5%'
                  onClick={() => changeTextQuestions(1)}>
                  +
                </Button>
              </h1>
              <h1>{drawingNr} DRAWING QUESTIONS
                <Button
                  style={{marginLeft: "auto"}}
                  width='5%'
                  onClick={() => changeDrawingQuestion(-1)}>
                  -
                </Button>
                <Button
                  style={{marginLeft: "auto"}}
                  width='5%'
                  onClick={() => changeDrawingQuestion(1)}>
                  +
                </Button>
              </h1>
            </div>

            <div className="button-container">
              <Button className='primary-button'
                      style={{marginRight: "auto"}}
                      width="20%"
                      onClick={() => startGame()}
              >
                START GAME
              </Button>
            </div>
          </div>
        </div>
      </BaseContainer>

    );

  }
;


export default SelectionPage;