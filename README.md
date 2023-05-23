# "Who said that?" - party game
We have created a party game, which makes getting to know people easier and more fun.


## Introduction:
Instead of just asking each other the same lame questions over and over again, we wanted to create a fun and easy way to getting to know people. To achieve this we created a quiz game, revolving around the participants themselves.

- roughly explained:
    - All players answer the questions that are posed initially.
    - Each typ of question requires a different answer: a drawing, some text or telling a true/false story.
    - Next the quiz asks: "Who said that?" - and everybody takes a guess.
    - The goal is to be as correct and as fast as possible.


## Technologies used

- Google Cloud, GitHub, QR Code API (Rapid API), Bootstrap, MUI


## High-level components:

- [StartScreen.js](src%2Fcomponents%2Fviews%2FGameSetup%2FStartScreen.js), [Lobby.js](src%2Fcomponents%2Fviews%2FGameSetup%2FLobby.js), [Prompts](src%2Fcomponents%2Fviews%2FPrompts), [Quiz](src%2Fcomponents%2Fviews%2FQuiz) with the Leaderboard    
    These are the fundamental stages throughout our application.  
    That is what correlates them, and their name describes what their role is. Each subcomponent is responsible for a 
    view within that stage. All these components are needed, since the flow of the application is depending on them. 


## Launch & Deployment:

- **installing** 
  - For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:
  - ```npm install```
  - Run this command before you start your application for the first time. Next, you can start the app with:


- **running**

  - ```npm run dev```

  - Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  - Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).


- **testing**
  - You can run the tests with `npm run test`.
  - This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  - > For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

- **building**
  - Finally, `npm run build` builds the app for production to the `build` folder.<br>
  It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>


- **Dependencies and databases** 
  - The JPA database, but that does not need to be run separately. 


- **Deployment**
  - The project is set up to automatically deploy, each time you push onto the main branch. This is done via the GitHub workflow in [main.yml](.github%2Fworkflows%2Fmain.yml)


## Description: 

1. The users enter on the start screen, they then either host a game or join a game.
2. When the lobby of players is ready, the game can be started. 
At first, the host chooses the amount of prompts of each type, and can set the timer. 
3. Next all players answer the prompts on their own. (With these provided answers, the quiz questions are then generated and
presented in the quiz. 
There are different types of questions generated, different in what type of answer they need. - Having players, or text-answers 
or true/false as an answer type.)
4. The quiz starts, and after each quiz question, the current leaderboard is shown, which also indicates the amount of points each player got 
in the last question. 
5. At the end of the game the _Top 3_ players are shown, and the game can be either restarted or ended. 



## Roadmap: 
- adding new "game modes" respectively question types, like "rate this on a scale of 1-10", or other.
- changing the calculation of points to include "answer-streaks".
- making the game even more customisable by letting the users choose how many questions the want to be generated, per prompt.
- adding progress indicators:
  - on how far the other players are with answering their prompts
  - in the quiz:
    - on each question - how many players have already answered
    - in general - showing how many questions out of the total amount have been answered
- adding a "go back" option to allow "undo" and the re-writing of already answered prompts

(This is the same as in the server README, because the two parts of our application are closely connected, in achieving these features.)

## Authors
SoPra Group 24:
- Tim Kinget
- Linda Steiner
- Lara Gianinni
- Mike Röllin
- Jan Eggli

## License: 
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
The [SOPRA_README.md](SOPRA_README.md) provided us with helpful information as well as inspiration. Especially on the
topic of _Launch & Deployment_ in our README. 