import React, {useEffect} from "react";
import { IoIosRefresh } from 'react-icons/io';
import { BiCopy } from 'react-icons/bi';
import { useSelector } from "react-redux";
import dictionary from "../dictionary.json";
import {collection, addDoc} from "firebase/firestore";
import db from "../Config";

function GameOver() {
    const selector = useSelector(state=>state)
    const point = 80  - (selector.game.attempt * 18) + (selector.game.hint.join('').split('+').length - 1)*5 + (selector.game.hint.join('').split('-').length - 1)*2;

    let copiedText = " p-i-n-g-a-m-e " + (selector.game.attempt+1) + "/7 Puan:" + point + "\n\n";    
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

    const add_database = async (point) => {
        try {
            const docRef = await addDoc(collection(db, "scoreboard"), {nickname: JSON.parse(localStorage.getItem('nickname')).nickname, point: point});
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    useEffect(() => {
        add_database(point)
    }, []);

    return (
        <div className="gameOver">
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}} className="content">
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => window.location.reload(false)}>
                    <IoIosRefresh size={25}/>
                </div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() =>  navigator.clipboard.writeText(copiedText.trimEnd()+ "\n\n http://p-i-n-g-a-m-e.com/")}>
                    <BiCopy size={25} />
                </div>
            </div>
            <h3> {
                selector.game.guessedWord ? dictionary[selector.site.language].won1 : dictionary[selector.site.language].lose1 
            } </h3>
            <h2 disabled >{dictionary[selector.site.language].search + selector.game.correctNumber}</h2>
            {
            selector.game.guessedWord && ( 
                <h3> 
                    { dictionary[selector.site.language].won2 } <br></br>
                    { dictionary[selector.site.language].attempt }
                    { selector.game.attempt + 1 } <br></br>
                    { dictionary[selector.site.language].point } { point }</h3>
            )
            
        }
        </div>
    );
}

export default GameOver;
