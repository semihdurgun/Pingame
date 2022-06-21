import React, {useEffect, useState} from "react";
import { IoIosRefresh } from 'react-icons/io';
import { BiCopy } from 'react-icons/bi';
import { useSelector } from "react-redux";
import dictionary from "../dictionary.json";
import {collection, addDoc, Timestamp, getDocs} from "firebase/firestore";
import db from "../Config";
import Confetti from 'react-confetti'
import Pyramid from "./Pyramid";

function GameOver() {
    const selector = useSelector(state=>state)
    const [percent,setPercent] = useState('')
    var point = 80  - ((selector.game.attempt-1) * 17) + (selector.game.hint.join('').split('+').length - 1)*5 + (selector.game.hint.join('').split('-').length - 1)*3;
    if (point<0) {point=0};

    useEffect(() => {
        // componentWillUnmount
        return () => {
            add_database(point)
        }
      }, []);

    let copiedText = " numberland " + (selector.game.attempt) + "/8 Point: " + point + "  %"+ percent +"\n\n";    
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
        var sayac = 0
        try {
            const docRef = await addDoc(collection(db, "scoreboard"), {
                nickname: localStorage.getItem('nickname'), 
                point: point,
                date: Timestamp.now()});
            
            const querySnapshot = await getDocs(collection(db, "scoreboard")).then("OK");
            querySnapshot.forEach((doc) => {
                if (point>=doc.data().point){
                    sayac += 1
                }
              });
            var per = ((sayac/querySnapshot.size).toFixed(4))*100
            setPercent(per.toFixed(2)) 
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    function copied() {
        navigator.clipboard.writeText(copiedText.trimEnd()+ "\n\n " + window.location.href)
        var x = document.getElementById("copy")
        x.style.display = "block";
        setTimeout(()=>{
            x.style.display = "none";
        }, 3000)
    }

    return (
        <div className="gameOver">
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}} className="content">
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => window.location.reload(false)}>
                    <IoIosRefresh size={25}/>
                </div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => copied() }>
                    <BiCopy size={25} />
                    <span id="copy">{dictionary[selector.site.language].copy}</span>
                </div>
                
            </div>
            <h3> {
                selector.game.guessedWord ? localStorage.getItem("nickname").toUpperCase() + dictionary[selector.site.language].won1 
                : <span>{localStorage.getItem("nickname").toUpperCase() + dictionary[selector.site.language].lose1} <hr></hr> {dictionary[selector.site.language].search + selector.game.correctNumber}<span style={{color:"red"}}> {dictionary[selector.site.language].point } { point } </span></span>
            } </h3>
            {
            selector.game.guessedWord && ( <>
            <Confetti gravity={0.07}/>
                <h3> 
                <Pyramid val={percent}/>
                <br></br>
                <span style={{letterSpacing:1.4}} id="percent">%{percent} { dictionary[selector.site.language].percent }</span>
                    <br></br><hr></hr>
                    <span>{dictionary[selector.site.language].search + selector.game.correctNumber}<span style={{color:"red"}}> {dictionary[selector.site.language].point } { point } </span></span> </h3>
                    </>
                )
            
            
        }
        </div>
    );
}

export default GameOver;
