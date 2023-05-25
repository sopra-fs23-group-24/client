# "Who said that?" - A party quiz game
"Who said that?" is a party game for 4 of more players, which functions as a fun ice breaker or socialising activity when talking to new people, acquaintances or even old friends.

## Introduction
Instead of just asking each other the same lame questions over and over again, we wanted to create a fun and easy way to socialise and learn a bit about people.
Our quiz game revolves around the participants themselves and tests their knowledge of each other.

- roughly explained:
  - All players answer a set of initial prompts
  - Each type of prompt requires a different answer: a drawing, some text or telling a true/false story.
  - Next, the players participate in a quiz-like game that asks: "Who said that?" - and everybody takes a guess.
  - The goal is to be as correct and as fast as possible.

## Technologies used

- Google Cloud, GitHub, QR Code API (Rapid API), Bootstrap, MUI

## High-level components:

- The [StartScreen.js](src%2Fcomponents%2Fviews%2FGameSetup%2FStartScreen.js) is the gate-way point of the game, users can create and join games here.
- The [Lobby.js](src%2Fcomponents%2Fviews%2FGameSetup%2FLobby.js) shows all players in a group.
- In [Prompts](src%2Fcomponents%2Fviews%2FPrompts), players fill out the different types of prompt-questions that are the basis of the quiz.
- The [Quiz](src%2Fcomponents%2Fviews%2FQuiz) is the in-game view where users play against each other to answer questions the fastest correctly.


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


## Illustration: 

Our game flow is protected by guards. After the StartScreen, redirection is automatic or initiated by the host.

1. The users enter on the start screen, they then either host a game or join a game.
2. When all players are ready, the game can be started.
3. The host chooses the amount of prompts of each type and sets the timer.
4. All players answer the prompts on their own. With these provided answers, the quiz questions are then generated and
   later used in the quiz.
5. The quiz starts, a question is displayed that the players need to answer by selecting one of the provided answer options. There are 6 different types of questions,
   depending on what type of prompt they are based on and whether they have playernames or a promptanswers as answer options.
6. Between each quiz question, the current leaderboard is shown, which also indicates the amount of points each player got
   in the last question.
7. At the end of the game the _Top 3_ players are shown, and the game can be either restarted or ended.



## Roadmap: 
- adding new "game modes" respectively question types, like "rate this on a scale of 1-10", or other.
- changing the calculation of points to include "answer-streaks".
- making the game even more customisable by letting the users choose how many questions the want to be generated, per prompt.
- allowing players to create custom prompts within the existing types
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