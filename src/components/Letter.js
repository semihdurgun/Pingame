import React, {useContext} from 'react'
import {AppContext} from '../App'

function Letter({val, pos}) {
    const {board} = useContext(AppContext);
    const letter = board[val][pos];
    return (
        <div className='letter'>
            {letter}</div>
    )
}

export default Letter
