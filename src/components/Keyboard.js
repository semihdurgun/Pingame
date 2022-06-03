import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AiOutlineEnter} from 'react-icons/ai';
import {BsBackspace} from 'react-icons/bs';
import { curr_attempt, board2, game_over, hint } from "../stores/GameSlicer";
import Swal from "sweetalert2";
import dictionary from "../dictionary.json";

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
        "DLT",
        "",
        "ENTER"
    ];
    
    const selector = useSelector(state=>state)
    const dispatch = useDispatch()
   
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        background: 'gray',
        color: 'white',
        showConfirmButton: false,
        timer: 2300,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const onEnter = () => {
        if (selector.game.letter !== selector.game.guessedNumberCount) 
            return;
        

        let currNumber = "";
        for (let i = 0; i < selector.game.guessedNumberCount; i++) {
            currNumber += selector.game.board2[selector.game.attempt][i];
        }
        console.log(currNumber)    
        if (currNumber.split("").filter((v, i, a) => a.indexOf(v) === i).length !== selector.game.guessedNumberCount) {
            Toast.fire({icon: 'warning', title: dictionary[selector.site.language].toast, html: dictionary[selector.site.language].toast2})
            return;
        }
        // içeren sayı var mı kontrolü, ipucu için
        var _hint = [...selector.game.hint]
        for (let i = 0, len = currNumber.length; i < len; ++ i) {
            if (currNumber[i] === selector.game.correctNumber[i]) {
                _hint[selector.game.attempt] += "+"
            } else if (selector.game.correctNumber.includes(currNumber[i])) {
                _hint[selector.game.attempt] += "-"
            }
        }
        dispatch(hint(_hint))
        dispatch(curr_attempt({attempt:selector.game.attempt +1,letter:0}))

        // sayı doğru mu?
        if (currNumber === selector.game.correctNumber) {
            var getWon = JSON.parse(localStorage.getItem('game'))["won"];
            getWon += 1;
            localStorage.setItem('game', JSON.stringify({won: getWon, lose: JSON.parse(localStorage.getItem('game'))["lose"]}));
            dispatch(game_over({gameOver: true, guessedWord: true}))
            return;
        }
        if (selector.game.attempt === 7) {
            var getLose = JSON.parse(localStorage.getItem('game'))["lose"];
            getLose += 1;
            localStorage.setItem('game', JSON.stringify({won: JSON.parse(localStorage.getItem('game'))["won"], lose: getLose}));
            dispatch(game_over({gameOver: true, guessedWord: false}))
            return;
        }
    };
    const onDelete = () => {
        if (selector.game.letter === 0) 
            return;
        
        const newBoard2 = selector.game.board2.map((innerArray, index) => {
            if (index === selector.game.attempt) return innerArray.map((item, index) => {
                if (index === selector.game.letter - 1) return ""
                return item
            })
            return innerArray
        })
     
        dispatch(board2(newBoard2))
        dispatch(curr_attempt({
            attempt: selector.game.attempt,
            letter: selector.game.letter - 1
        }))
    };
    const onSelectLetter = (key) => {
        if (selector.game.letter > (selector.game.guessedNumberCount-1)) 
            return;
        
        const newBoard2 = selector.game.board2.map((innerArray, index) => {
            if (index === selector.game.attempt) return innerArray.map((item, index) => {
                if (index === selector.game.letter) return key
                return item
            })
            return innerArray
        })
        dispatch(board2(newBoard2))
        console.log(newBoard2) 
        dispatch(curr_attempt({
            attempt: selector.game.attempt,
            letter: selector.game.letter + 1
        }))
    };


    const handleKeyboard = useCallback((event) => {
        if (selector.game.gameOver) 
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
    }, [selector.game.letter,selector.game.attempt]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return() => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    const selectLetter = (keyVal) => {
        if (selector.game.gameOver) 
            return;

        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DLT") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    };

    return (
        <div className="keyboard"
            onKeyDown={handleKeyboard}>
                <div className="content">

                    {
                    keys1.map((key) => {
                        return (
                            <div onClick={() => selectLetter(key)}>
                            <span> {
                                (() => {
                                    switch (key) {
                                        case "ENTER":
                                            return <AiOutlineEnter viewBox="0 0 1024 900"/>;
                                        case "DLT":
                                            return <BsBackspace viewBox="0 0 16 14"/>;
                                        default:
                                            return key;
                                    }
                                })()
                            } </span>
                        </div>);
                    })
                    }

            </div>
        </div>
    );
}

export default Keyboard;
