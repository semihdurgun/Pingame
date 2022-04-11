import React, {useCallback, useEffect, useContext} from "react";
import Key from "./Key";
import {AppContext} from "../App";
function Keyboard() {
    const keys1 = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "DELETE",
        "",
        "ENTER"
    ];
    const {
        board,
        currAttempt,
        gameOver,
        onSelectLetter,
        onEnter,
        onDelete
    } = useContext(AppContext);

    const handleKeyboard = useCallback((event) => {
        if (gameOver.gameOver) 
            return;
        

        if (event.key === "Enter") {
            onEnter();
        } else if (event.key === "Backspace") {
            onDelete();
        } else {
            keys1.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key);
                }
            });

        }
    }, [currAttempt]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return() => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard"
            onKeyDown={handleKeyboard}>
                <div className="content">

                    {
                    keys1.map((key) => {
                        return <Key keyVal={key}/>;
                    })
                    }

            </div>
        </div>
    );
}

export default Keyboard;
