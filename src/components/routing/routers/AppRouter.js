import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import StartScreen from "../../views/StartScreen";
import JoinCode from "../../views/JoinCode";
import Lobby from "components/views/Lobby";
import EnterName from "../../views/EnterName";
import AnswerPrompt from "../../views/AnswerPrompt";
import WaitingRoom from "../../views/WaitingRoom";
import QuizAnswer from "../../views/QuizAnswer";
import EndScreen from "../../views/EndScreen";
import LeaderBoardView from "../../views/leaderBoardView";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import {PromptsGuard} from "../routeProtectors/PromptsGuard";
import {QuizGuard} from "../routeProtectors/QuizGuard";
import {EndGuard} from "../routeProtectors/EndGuard";

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

        {/*Before joining game*/}
        <Route exact path="/startscreen">
          <LoginGuard>
            <StartScreen/>
          </LoginGuard>
        </Route>

        <Route exact path="/start">
          <LoginGuard>
            <StartScreen/>
          </LoginGuard>
        </Route>

        <Route exact path="/home">
          <LoginGuard>
            <StartScreen/>
          </LoginGuard>
        </Route>

        <Route exact path="/joincode">
          <LoginGuard>
            <JoinCode/>
          </LoginGuard>
        </Route>

        <Route exact path="/enterName/:pin">
          <LoginGuard>
            <EnterName/>
          </LoginGuard>
        </Route>

        {/*Joining game*/}
        <Route exact path="/lobby">
          <LobbyGuard>
            <Lobby/>
          </LobbyGuard>
        </Route>


        {/*Filling out prompts*/}
        <Route exact path="/answerPrompt">
          <PromptsGuard>
            <AnswerPrompt/>
          </PromptsGuard>
        </Route>

        <Route exact path="/prompts">
          <PromptsGuard>
            <AnswerPrompt/>
          </PromptsGuard>
        </Route>

        <Route exact path="/waitingRoom">
          <PromptsGuard>
            <WaitingRoom/>
          </PromptsGuard>
        </Route>


        {/*Quiz*/}
        <Route exact path="/quizAnswer">
          <QuizGuard>
            <QuizAnswer/>
          </QuizGuard>
        </Route>

        <Route exact path="/leaderboard">
          <QuizGuard>
            <LeaderBoardView/>
          </QuizGuard>
        </Route>


        {/*End of game*/}
        <Route exact path="/EndScreen">
          <EndGuard>
            <EndScreen/>
          </EndGuard>
        </Route>


        {/*Base*/}
        <Route exact path="/">
          <LoginGuard>
            <Redirect to="/startscreen"/>
          </LoginGuard>
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
