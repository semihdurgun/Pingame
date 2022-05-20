import React, {useContext} from "react";
import {AppContext} from "../App";
import {AiOutlineEnter} from 'react-icons/ai';
import {BsBackspace} from 'react-icons/bs';
import { useSelector } from "react-redux";

function Key({keyVal}) {
    const { onSelectLetter,onDelete, onEnter} = useContext(AppContext);
    const selector = useSelector(state=>state)

    const selectLetter = () => {
        if (selector.game.gameOver) 
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
        <div onClick={selectLetter}>
            <span> {
                (() => {
                    switch (keyVal) {
                        case "ENTER":
                            return <AiOutlineEnter viewBox="0 0 1024 900"/>;
                        case "DELETE":
                            return <BsBackspace viewBox="0 0 16 14"/>;
                        default:
                            return keyVal;
                    }
                })()
            } </span>
        </div>
    );
}

export default Key;
