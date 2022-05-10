import React, {useContext} from "react";
import {AppContext} from "../App";
import {IoIosRefresh} from 'react-icons/io';
import {BiCopy} from 'react-icons/bi';

function GameOver() {
    const {
        hint,
        currAttempt,
        gameOver,
        correctNumber,
    } = useContext(AppContext);
    const point = 80  - (currAttempt.attempt * 25) + (hint.join('').split('+').length - 1)*4 + (hint.join('').split('-').length - 1)*2;
    let copiedText = " p-i-n-g-a-m-e " + (currAttempt.attempt+1) + "/6 Puan:" + point + "\n\n";    
    for (let i = 0; i < hint.length; i++) {
        for (let j = 0; j < hint[i].length; j++) {
            if (hint[i][j] === "+"){
                copiedText += "🟢";
            } else{
                copiedText += "🟡";
            }
        }
        copiedText += "\n";
    }
    
    return (
        <div className="gameOver">
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}} className="content">
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => window.location.reload(false)}>
            <IoIosRefresh size={25}/>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() =>  navigator.clipboard.writeText(copiedText.trimEnd()+ "\n\n http://localhost:3000/")}>
            <BiCopy size={25} />
            </div></div>
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
