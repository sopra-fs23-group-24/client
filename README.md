# "Who said that?" - party game
We have created a party game, which makes getting to know people easier and more fun.


#### Introduction:
Instead of just asking each other the same lame questions over and over again, we wanted to create a fun and easy way to getting to know people. To achieve this we created a quiz game, revolving around the participants themselves.

- roughly explained:
    - All players answer the questions that are posed initially.
    - Each typ of question requires a different answer: a drawing, some text or telling a true/false story.
    - Next the quiz asks: "Who said that?" - and everybody takes a guess.
    - The goal is to be as correct and as fast as possible.


#### Technologies used

- JPA, REST, Google Cloud, GitHub, QR Code API (Rapid API), ... bootstrap, MUI 


#### High-level components:

- [Lobby.js](src%2Fcomponents%2Fviews%2FGameSetup%2FLobby.js), [Prompts](src%2Fcomponents%2Fviews%2FPrompts), [Quiz](src%2Fcomponents%2Fviews%2FQuiz) with the Leaderboard    
    These are the fundamental stages throughout our application.  
    That is what correlates them, and their name describes what their role is. Each subcomponent is responsible for a 
    view within that stage - all of them are needed currently, since the flow of the application is demanding it. 


#### Launch & Deployment:

_(copied from the provided template, which can be found below)_  

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

##### Dependencies and databases 
The JPA database, but that does not need to be run separately. 

##### Deployment
The project is set up to automatically deploy, each time you push onto the main branch. This is done via the GitHub workflow in [main.yml](.github%2Fworkflows%2Fmain.yml)


#### Illustrations: 
In your client repository, briefly describe and illustrate the main user flow(s) of your interface. How does it work (without going into too much detail)? Feel free to include a few screenshots of your application.



#### Roadmap: 
The top 2-3 features that new developers who want to contribute to your project could add.

#### Authors and acknowledgment.

#### License: 
Say how your project is licensed (see License guide3 ).

---

## Disclaimer 
    The following information was given to us by our course / TA's / prof 

# SoPra FS23 - Client Template with build pack

## Getting started

Read and go through these Tutorials. It will make your life easier:)

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) let you access the router's state and perform navigation from inside your components.

## Prerequisites and Installation
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


> Thanks to Lucas Pelloni and Kyrill Hux for working on the template.
