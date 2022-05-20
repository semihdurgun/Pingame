import React from 'react'
import { useSelector } from "react-redux";

function Letter({val, pos}) {
    const selector = useSelector(state=>state)
    const letter = selector.game.board2[val][pos];
    return (
        <div className='letter'>
            {letter}</div>
    )
}

export default Letter
