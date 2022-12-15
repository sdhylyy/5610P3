import React, { useState, useEffect } from "react";
import "./Clock.css";
//suggest one component one directory
function Clock(props) {
    const [date, setDate] = useState(new Date());
    let timerID=null;

    useEffect(
        () => {
            timerID = setInterval(
                tick,
                1000
            );
            return (() => clearInterval(timerID));
        }
    )

    const tick = () => {
        setDate(
            ()=>{
                return new Date();
            }
        );
    }

    return (
        <div className="clock">
            {date.toLocaleTimeString()}
        </div>
    );
}

Clock.propTypes = {};
export default Clock;


