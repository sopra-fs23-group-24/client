import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <LobbyGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const QuizGuard = props => {
    if (localStorage.getItem("gamePin")) {
        if (localStorage.getItem("gameLastState") === "LOBBY" || (localStorage.getItem("gameLastState") === "SELECTION" && localStorage.getItem("isHost") === 'false') || !localStorage.getItem("gameLastState")) {
            return <Redirect to="/lobby"/>;
        } else if (localStorage.getItem("gameLastState") === "SELECTION" && localStorage.getItem("isHost") === 'true') {
            return <Redirect to="/selectionpage"/>;
        } else if (localStorage.getItem("gameLastState") === "PROMPT") {
            return <Redirect to="/answerPrompt"/>;
        } else if (localStorage.getItem("gameLastState") === "QUIZ") {
            return props.children;
        } else if (localStorage.getItem("gameLastState") === "END") {
            return <Redirect to="/EndScreen"/>;
        }
    }
    return <Redirect to="/startscreen"/>;
};

QuizGuard.propTypes = {
    children: PropTypes.node
};