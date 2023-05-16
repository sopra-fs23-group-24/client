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
export const EndGuard = props => {
  if (localStorage.getItem("gamePin")) {
    console.log("game Pin found")
    if(localStorage.getItem("gameLastState") === "LOBBY" || (localStorage.getItem("gameLastState") === "SELECTION" && !localStorage.getItem("isHost")) || !localStorage.getItem("gameLastState")){
      console.log("trying to go to lobby")
      return <Redirect to="/lobby"/>;
    }
    else if(localStorage.getItem("gameLastState") === "SELECTION" && localStorage.getItem("isHost")){
      console.log("trying to go to selection")
      return <Redirect to="/selectionpage"/>;
    }
    else if(localStorage.getItem("gameLastState") === "PROMPT"){
      console.log("trying to go to prompt")
      return <Redirect to="/answerPrompt"/>;
    }
    else if(localStorage.getItem("gameLastState") === "QUIZ"){
      console.log("trying to go to lobby")
      return <Redirect to="/quizAnswer"/>;
    }
    else if(localStorage.getItem("gameLastState") === "END"){
      console.log("accepted as end")
      return props.children;
    }
  }
  return <Redirect to="/startscreen"/>;
};

EndGuard.propTypes = {
  children: PropTypes.node
};