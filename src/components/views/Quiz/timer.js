import React, {useEffect, useRef} from 'react';

const CountingTimer = ({timeLeft, setTimeLeft}) => {
    const timerIntervalRef = useRef(null);

    useEffect(() => {
        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);
        return () => clearInterval(timerIntervalRef.current);
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            clearInterval(timerIntervalRef.current);
        }
    }, [timeLeft]);

    return (

        <div>
            Time: {timeLeft}
        </div>
    );
};

export default CountingTimer;
