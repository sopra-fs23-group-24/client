import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const GameGuard = props => {
  if (localStorage.getItem("gamePin")) {
    console.log("game Pin found")
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/startscreen"/>;
};

GameGuard.propTypes = {
  children: PropTypes.node
}