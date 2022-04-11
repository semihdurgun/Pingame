import "./index.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import {boardDefault, generateNumber, hintDefault} from "./Words";
import React, {useState, createContext, useEffect} from "react";
import GameOver from "./components/GameOver";
import Hint from "./components/Hint";

export const AppContext = createContext();

function App() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letter: 0});
    const [correctNumber, setCorrectNumber] = useState("");
    const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
    const [hint, setHint] = useState(hintDefault);


    useEffect(() => {
        setCorrectNumber(generateNumber(4));
    }, []);

    const onEnter = () => {
        if (currAttempt.letter !== 5) 
            return;
        
        let currNumber = "";
        for (let i = 0; i < 5; i++) {
            currNumber += board[currAttempt.attempt][i];
        }
        // içeren sayı var mı kontrolü, ipucu için
        for (let i = 0, len = currNumber.length; i < len; ++i) {
            if (currNumber[i] == correctNumber.toString()[i]) {
                hint[currAttempt.attempt]+="+";
            } else if (correctNumber.toString().includes(currNumber[i])){
                hint[currAttempt.attempt]+="-";
            }    
        }
        console.log(hint);
        setHint(hint);
        // sayı doğru mu?
        if (currNumber == correctNumber) {
            setGameOver({gameOver: true, guessedWord: true});
            return;
        }
        setCurrAttempt({
            attempt: currAttempt.attempt + 1,
            letter: 0
        });

        if (currAttempt.attempt === 5) {
            setGameOver({gameOver: true, guessedWord: false});
            return;
        }
    };

    const onDelete = () => {
        if (currAttempt.letter === 0) 
            return;
        
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
        setBoard(newBoard);
        setCurrAttempt({
            ...currAttempt,
            letter: currAttempt.letter - 1
        });
    };

    const onSelectLetter = (key) => {
        if (currAttempt.letter > 4) 
            return;
        
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letter] = key;
        setBoard(newBoard);
        setCurrAttempt({
            attempt: currAttempt.attempt,
            letter: currAttempt.letter + 1
        });
    };

    return (
        <div className="App">
            <nav>
                <h1>p-i-n-g-a-m-e</h1>
            </nav>
            <AppContext.Provider value={
                {
                    board,
                    setBoard,
                    currAttempt,
                    setCurrAttempt,
                    correctNumber,
                    onSelectLetter,
                    onDelete,
                    onEnter,
                    gameOver,
                    hint,
                }
            }>
                <div className="game">
                    <div className="game1">
                        <Board/>
                        {hint && <Hint hintPos={currAttempt.attempt}/>}
                    </div>
                    {
                    gameOver.gameOver ? <GameOver/>: <Keyboard/>
                } </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
