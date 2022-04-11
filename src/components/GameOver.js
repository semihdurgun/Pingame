import React, {useContext} from "react";
import {AppContext} from "../App";

function GameOver() {
    const {
        board,
        setBoard,
        currAttempt,
        gameOver,
        onSelectLetter,
        correctNumber,
        onDelete
    } = useContext(AppContext);
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
                    .&nbsp;aramada bildiniz.</h3>
            )
        } </div>
    );
}

export default GameOver;
