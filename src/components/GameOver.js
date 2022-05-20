import React from "react";
import { IoIosRefresh } from 'react-icons/io';
import { BiCopy } from 'react-icons/bi';
import { useSelector } from "react-redux";

function GameOver() {
    const selector = useSelector(state=>state)

    const point = 80  - (selector.game.attempt * 25) + (selector.game.hint.join('').split('+').length - 1)*4 + (selector.game.hint.join('').split('-').length - 1)*2;
    let copiedText = " p-i-n-g-a-m-e " + (selector.game.attempt+1) + "/6 Puan:" + point + "\n\n";    
    for (let i = 0; i < selector.game.hint.length; i++) {
        for (let j = 0; j < selector.game.hint[i].length; j++) {
            if (selector.game.hint[i][j] === "+"){
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
                selector.game.guessedWord ? "Sayıyı doğru bildiniz (:" : "Sayıyı bilemediniz!! :("
            } </h3>
            <h1>Aranan Sayı: {selector.game.correctNumber}</h1>
            {
            selector.game.guessedWord && (
                <h3>
                    Tebrikler {
                    selector.game.attempt + 1
                }
                    .&nbsp;aramada bildiniz! Puan:{ point}</h3>
            )
        } </div>
    );
}

export default GameOver;
