import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";


const FormField = props => {
    return (
        <div className="lobby field">
            <label className="lobby label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="XXXXXX"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Lobby = () => {
    const history = useHistory();
    const [users, setUsers] = useState(null);
    const [qrCode, setQrCode] = useState(null);

    useEffect(async () => {
        try {
            const response = await api.get('/allPlayers');

            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            setUsers(response.data);
            //setUsers([{playerName: "user1"},{playerName: "user2"}])

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the users! See the console for details.");
        }

        createQrCode();

    }, []);

        const createQrCode = () => {
            const options = {
                method: 'GET',
                url: 'https://codzz-qr-cods.p.rapidapi.com/getQrcode',
                params: {type: 'url', value: 'https://www.google.com'},
                headers: {
                    'X-RapidAPI-Key': '9706f0679bmshb78281c4935e15bp14358cjsn25618d800385',
                    'X-RapidAPI-Host': 'codzz-qr-cods.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                setQrCode(response.data);
            }).catch(function (error) {
                console.error(error);
            });

        };

        const leaveGame = async () => {
        try {
            const response = await api.delete('/players' + localStorage.getItem("playerId"));
            // TODO: use response!!

            // Leaving worked successfully--> navigate to the start screen
            history.push(`/startscreen`);

        } catch (error) {
            alert(`Something went wrong trying to leave the game: \n${handleError(error)}`);
        }
    };



    return (
        <BaseContainer>
            
            <div className="lobby container">

                <div  className="lobby form2">
                    {qrCode !== null && <img style={{ width: 100, height: 100 }} src={qrCode.url} alt="qr code"/>}
                    <img src="/images/questiony.png" alt="" className="lobby questionimg"/>

                </div>


                <div className="lobby form">
                    <h1>Players</h1>
                    <ul>{users !== null && users.map(user => {
                        return <div>{user.playerName}</div>})}
                    </ul>
                    <div className="login button-container">
                        <Button
                            style={{ marginLeft: "auto" }}
                            width="30%"
                            onClick={() => leaveGame()}
                        >
                            LEAVE
                        </Button>
                    </div>
                </div>


            </div>

        </BaseContainer>

    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Lobby;
