import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {api} from "../../../helpers/api";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <LobbyGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const LobbyGuard = props => {
  if (localStorage.getItem("gamePin")) {
    console.log("game Pin found")
    if(localStorage.getItem("gameLastState") === "LOBBY" || (localStorage.getItem("gameLastState") === "SELECTION" && localStorage.getItem("isHost") === 'false') || !localStorage.getItem("gameLastState")){
      console.log("accepted as lobby")
      return props.children;
    }
    else if(localStorage.getItem("gameLastState") === "SELECTION" && localStorage.getItem("isHost") === 'true'){
      console.log("trying to go to selection")
      return <Redirect to="/selectionpage"/>;
    }
    else if(localStorage.getItem("gameLastState") === "PROMPT"){
      console.log("trying to go to prompts")
      return <Redirect to="/answerPrompt"/>;
    }
    else if(localStorage.getItem("gameLastState") === "QUIZ"){
      console.log("trying to go to quiz")
      return <Redirect to="/quizAnswer"/>;
    }
    else if(localStorage.getItem("gameLastState") === "END"){
      console.log("trying to go to end")
      return <Redirect to="/EndScreen"/>;
    }
  }
  return <Redirect to="/startscreen"/>;
};

LobbyGuard.propTypes = {
  children: PropTypes.node
};