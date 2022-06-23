import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { game_over, timer } from "../stores/GameSlicer";

function Timer() {

    const {timer_end_time} = useSelector(state=>state.game)
    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(timer({timer_end:false, timer_end_time:timer_end_time - 1}))
        }, 1000)
        if(timer_end_time === 0) {
            dispatch(game_over({gameOver: true, guessedWord: false}))
            dispatch(timer({timer_end:true, timer_end_time:0}))
        }
        dispatch(timer({timer_end:false, timer_end_time:timer_end_time}))
        return () => clearInterval(interval)
        
    }, [timer_end_time])

    const findTimeString = () => {
        var minutes = String(Math.trunc(timer_end_time / 60));
        var seconds = String(timer_end_time % 60);
        if (minutes.length === 1) {
          minutes = "0" + minutes;
        }
        if (seconds.length === 1) {
          seconds = "0" + seconds;
        }
        return minutes +":" +  seconds;
      };

    return (<>
        <div className='font-link'>
            {timer_end_time>=60 && findTimeString(timer_end_time)}
            {(timer_end_time<60) && (timer_end_time>15)  && <span style={{color:'yellow', fontFamily: 'Orbitron'}}>{findTimeString(timer_end_time)}</span>}
            {timer_end_time<=15 && <span style={{color:'red', fontFamily: 'Orbitron'}}>{findTimeString(timer_end_time)}</span>}
        
        </div>
        </>
    )
}

export default Timer