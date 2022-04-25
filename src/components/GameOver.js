import React, {useContext} from "react";
import {AppContext} from "../App";

function GameOver() {
    const {
        hint,
        currAttempt,
        gameOver,
        correctNumber,
    } = useContext(AppContext);

    const point = 80  - (currAttempt.attempt * 25) + (hint.join('').split('+').length - 1)*4 + (hint.join('').split('-').length - 1)*2;
    console.log(point);
    return (
        <div className="gameOver">
            <h3> {
                gameOver.guessedWord ? "Sayıyı doğru bildiniz (:" : "Sayıyı bilemediniz!! :("
            } </h3>
            <h1>Aranan Sayı: {correctNumber}</h1>
            {
            gameOver.guessedWord && (
                <h3>
                    Tebrikler {
                    currAttempt.attempt + 1
                }
                    .&nbsp;aramada bildiniz! Puan:{ point}</h3>
            )
        } </div>
    );
}

export default GameOver;
