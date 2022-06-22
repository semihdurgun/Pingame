import React, {useEffect, useState} from "react";
import { IoIosRefresh } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import { BsFillShareFill, BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import { useSelector } from "react-redux";
import dictionary from "../dictionary.json";
import {collection, addDoc, Timestamp, getDocs} from "firebase/firestore";
import db from "../Config";
import Confetti from 'react-confetti'
import Pyramid from "./Pyramid";

function GameOver() {
    const selector = useSelector(state=>state)
    const [percent,setPercent] = useState('')
    var point = selector.game.timer_end?0:80  - ((selector.game.attempt-1) * 18) + (selector.game.hint.join('').split('+').length - 1)*4 + (selector.game.hint.join('').split('-').length - 1)*2;
    point += Math.floor((selector.game.timer_end_time)/15)
    if (point<0) {point=0};
    
    useEffect(() => {
        search_database()
        if (point>0) add_database(point)
      }, []);

    let copiedText = "https://twitter.com/compose/tweet?text="+" numberland " + (selector.game.attempt) + "/8 Point: " + point + " %25"+ percent +"%0A%0A";    
    for (let i = 0; i < selector.game.hint.length; i++) {
        for (let j = 0; j < selector.game.hint[i].length; j++) {
            if (selector.game.hint[i][j] === "+"){
                copiedText += "🟢";
            } else{
                copiedText += "🟡";
            }
        }
        copiedText += "%0A";
    }
    const search_database = async ()=>{
        var sayac = 0

        try{
            const querySnapshot = await getDocs(collection(db, "scoreboard")).then("OK");
            querySnapshot.forEach((doc) => {
                if ((point>=doc.data().point)){
                    sayac += 1
                }
              });
            var per = ((sayac/querySnapshot.size).toFixed(4))*100
            if(point>0) setPercent(per.toFixed(2))
            else setPercent(0)
        }
        catch(e){
            console.error("Error searching document: ", e);
        }
      
    }

    const add_database = async (point) => {
        try {
            const docRef = await addDoc(collection(db, "scoreboard"), {
                nickname: localStorage.getItem('nickname'), 
                point: point,
                date: Timestamp.now()});
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    function copied() {
        navigator.clipboard.writeText(copiedText.replaceAll('%0A','\n').replace('25','').replace('https://twitter.com/compose/tweet?text=','').trimEnd()+ "\n\n " + window.location.href+ "\n @numberlandGame")
        var x = document.getElementById("copy")
        x.style.display = "block";
        setTimeout(()=>{
            x.style.display = "none";
        }, 3000)
    }
    /*const trim = (str, chars) => str.split(chars).filter(Boolean).join(chars);*/

    return (
        <div className="gameOver">
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginTop:10}} className="content">
                <a style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={() => window.location.reload(false)}>
                    <IoIosRefresh size={25}/>
                </a>
                <a style={{display:"flex",justifyContent:"center",alignItems:"center"}} onClick={copied}>
                    <FiCopy size={20} />
                    <span id="copy">{dictionary[selector.site.language].copy}</span>
                </a>
                <a href={copiedText + '%0A ' + window.location.href+ "%0A @numberlandGame" } target='_blank' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <BsFillShareFill size={20} />
                </a>
            </div>
            <div >
                <h3 className="h3"> {
                    selector.game.guessedWord ? localStorage.getItem("nickname").toUpperCase() + dictionary[selector.site.language].won1 
                    : <span>{localStorage.getItem("nickname").toUpperCase() + dictionary[selector.site.language].lose1} <hr></hr> {dictionary[selector.site.language].search + selector.game.correctNumber}<span style={{color:"red"}}> {dictionary[selector.site.language].point } { point } </span></span>
                } 
                </h3>
                {
                selector.game.guessedWord && ( <>
                <Confetti gravity={0.07}/>
                    <h3> 
                    <Pyramid val={percent}/>
                    <br></br>
                    <span style={{letterSpacing:1.4}} id="percent">%{percent} { dictionary[selector.site.language].percent }</span>
                        <br></br><hr></hr>
                        <span>{dictionary[selector.site.language].search + selector.game.correctNumber}<span style={{color:"red"}}> {dictionary[selector.site.language].point } { point } </span></span> 
                        </h3>
                    </>
                    )
                }
            </div>
        </div>
    );
}

export default GameOver;
