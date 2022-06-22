import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { game_over, timer } from "../stores/GameSlicer";

function Timer() {

    const [countDown, setCountDown] = useState(300)
    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDown - 1)
        }, 1000)
        if(countDown === 0) {
            dispatch(game_over({gameOver: true, guessedWord: false}))
            dispatch(timer({timer_end:true, timer_end_time:0}))
        }
        dispatch(timer({timer_end:false, timer_end_time:countDown}))
        return () => clearInterval(interval)
        
    }, [countDown])

    const findTimeString = () => {
        var minutes = String(Math.trunc(countDown / 60));
        var seconds = String(countDown % 60);
        if (minutes.length === 1) {
          minutes = "0" + minutes;
        }
        if (seconds.length === 1) {
          seconds = "0" + seconds;
        }
        return minutes +":" +  seconds;
      };

    return (<>
        <link rel="prefetch" href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'/>
        <div style={{fontFamily: 'Orbitron'}}>
            {countDown>=60 && findTimeString(countDown)}
            {(countDown<60) && (countDown>15)  && <span style={{color:'yellow', fontFamily: 'Orbitron'}}>{findTimeString(countDown)}</span>}
            {countDown<=15 && <span style={{color:'red', fontFamily: 'Orbitron'}}>{findTimeString(countDown)}</span>}
        
        </div>
        </>
    )
}

export default Timer