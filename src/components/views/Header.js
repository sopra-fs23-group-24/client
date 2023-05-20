import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import HelpIcon from '@mui/icons-material/Help';
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Typography
} from "@mui/material";
import {Button} from "../ui/Button";


function ExpandMoreIcon() {
    return null;
}

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Header = props => {
    const [open, setOpen] = React.useState(false);
    const handleHelperOpen = () => {
        console.log("Help clicked")
        setOpen(true);
        console.log(open)
    }

    const handleHelperClose = () => {
        console.log("Help closed")
        setOpen(false);
        console.log(open)
    }

    const HelperContent = <HelpIcon onClick={handleHelperOpen} sx={{ fontSize: 75 }} color="primary"></HelpIcon>;
    return (
        <nav className="navbar navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand mb-0 h1">
                    <h1>Who said that?</h1>
                </a>
                {HelperContent}
            </div>
            <Dialog open={open}
                    onClose={handleHelperClose}
                    aria-labelledby="alert-dialog-help"
                    aria-describedby="alert-dialog-text">
                <DialogTitle id="alert-dialog-title">
                    {"How does the game work?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-text">
                        <p>Welcome to <i>"Who Said That?"</i>, the social party quiz made for you and your friends!</p>
                        <p>You need <b>at least 4 people</b> to play. In a first stage, everyone will have to <b>answer some prompts</b> by themselves.
                        Then, you will battle against your friends in a series of <b>quiz questions based on the answers everyone gave</b>.
                        The person that guesses the most questions correctly the fastest will win he game! And don't worry, you can play again as often as you'd like ;)</p>
                        <p>Enjoy your time and get creative with your responses!</p>
                        <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                                <Typography><b>Who can join the game?</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Anyone that <b>enters the pin or scans the QR code</b> shown in the lobby can enter the game, as long as the host did not start it.
                                    Until then, players can also leave again at will or the host can kick them out.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                                <Typography><b>How long does a game round take?</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    That entirely depends on your group! Once the game is started, the <b>host will select how many prompts of each type</b> will be given to everyone for filling out.
                                    Each prompt should take no more than 30 seconds to complete.<br/>
                                    Additionally, the <b>host can set a timer</b> to limit how long players have to give their answers <b>during the quiz</b>. The faster the answer, the more points.
                                    If you choose to <b>play without a timer</b>, you can take as long as you want to pick an answer and only the correctness will matter.<br/>
                                    <i>Our recommendation: if someone in the group is hanging behind, the rest of the players should hassle them a bit to speed up the process.</i>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography><b>True-False prompts</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    For true-false prompts, players will need to write a brief story about something and then mark whether this is true or a lie.<br/><br/>
                                    <b>Example Prompt:</b> <i>Tell a story about your best friend.</i><br/>
                                    <b>Example Quiz Question:</b> <i>Which player told this true story about their best friend?</i><br/>
                                    <b>Example Quiz Question:</b> <i>Is this story about somePlayerName's best friend true or false?</i>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel4a-content"
                              id="panel4a-header"
                            >
                                <Typography><b>Text prompts</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    For text prompts, players will need to write a short text response.<br/><br/>
                                    <b>Example Prompt:</b> <i>What would you name a pet alligator?</i><br/>
                                    <b>Example Quiz Question:</b> <i>Who would name their pet alligator 'some funny answer'?</i><br/>
                                    <b>Example Quiz Question:</b> <i>What would somePlayerName name their pet alligator?</i>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel5a-content"
                              id="panel5a-header"
                            >
                                <Typography><b>Drawing prompts</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    For drawing prompts, players will need to draw something.<br/><br/>
                                    <b>Example Prompt:</b> <i>Draw a rat.</i><br/>
                                    <b>Example Quiz Question:</b> <i>Which player drew this rat?</i><br/>
                                    <b>Example Quiz Question:</b> <i>Which rat was drawn by somePlayerName?</i>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel6a-content"
                                id="panel6a-header"
                            >
                                <Typography><b>How many quiz questions will be generated?</b></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    There will be <b>at least two questions per prompt</b>. Since everyone is allowed to answer every quiz question, <b>each player will have their prompt answers
                                    as the chosen correct one the same number of times</b>, to ensure no unfair advantage for anyone. <br/>
                                    For example: 4 players & 3 prompts => 8 quiz questions.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleHelperClose}>Close</Button>
            </DialogActions>
            </Dialog>
        </nav>
    );
}

Header.propTypes = {
  height: PropTypes.string
};

/**
 * Don't forget to export your component!
 */
export default Header;
