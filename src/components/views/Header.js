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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Accordion 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
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
