import React, {useContext} from "react";
import {AppContext} from "../App";
import {AiOutlineEnter} from 'react-icons/ai';
import {BsBackspace} from 'react-icons/bs';


function Key({keyVal, button}) {
    const {gameOver, onSelectLetter, onDelete, onEnter} = useContext(AppContext);

    const selectLetter = () => {
        if (gameOver.gameOver) 
            return;
        


        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    };
    return (
        <div className="key"
            onClick={selectLetter}>
            {
            (() => {
                switch (keyVal) {
                    case "ENTER":
                        return <AiOutlineEnter/>;
                    case "DELETE":
                        return <BsBackspace/>;
                    default:
                        return keyVal;
                }
            })()
        } </div>
    );
}

export default Key;
