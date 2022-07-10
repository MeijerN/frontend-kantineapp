import styles from './SessionTimer.module.css';
import React from 'react';
import {useEffect} from "react";

function SessionTimer({loginTime}) {

    //State management
    const [counter, setCounter] = React.useState(loginTime);

    useEffect(() => {
        setTimeout(() => setCounter(counter + 1),1000);
    }, [counter]);

    return (
        <span>{counter}</span>
    );
}

export default SessionTimer;