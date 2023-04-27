import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import GameRouter from "components/routing/routers/GameRouter";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import StartScreen from "../../views/StartScreen";
import JoinCode from "../../views/JoinCode";
import Lobby from "components/views/Lobby";
import EnterName from "../../views/EnterName";
import DrawingPrompt from "../../views/DrawingPrompt";
import AnswerPrompt from "../../views/AnswerPrompt";
import WaitingRoom from "../../views/WaitingRoom";
import QuizAnswer from "../../views/QuizAnswer";
import EndScreen from "../../views/EndScreen";
import LeaderBoardView from "../../views/leaderBoardView";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
            <GameRouter base="/game"/>
        </Route>

        <Route exact path="/login">
            <Login/>
        </Route>

        <Route exact path="/startscreen">
            <StartScreen/>
        </Route>

        <Route exact path="/joincode">
            <JoinCode/>
        </Route>

        <Route exact path="/drawingprompt">
            <DrawingPrompt/>
        </Route>

        <Route exact path="/lobby">
            <Lobby/>
        </Route>



        <Route exact path="/enterName/:pin">
          <EnterName/>
        </Route>

        <Route exact path="/waitingRoom">
          <WaitingRoom/>
        </Route>

          <Route exact path="/EndScreen">
              <EndScreen/>
          </Route>

          <Route exact path="/leaderboard/:points">
              <LeaderBoardView/>
          </Route>



          <Route exact path="/answerPrompt">
          <AnswerPrompt/>
        </Route>

          <Route exact path="/quizAnswer">
              <QuizAnswer/>
          </Route>

        <Route exact path="/">
          <Redirect to="/startscreen"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
