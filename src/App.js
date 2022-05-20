import "./index.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { generateNumber } from "./Words";
import React, {useState, createContext, useEffect} from "react";
import GameOver from "./components/GameOver";
import Hint from "./components/Hint";
import Swal from "sweetalert2";
import Login from "./components/Login";
import Header from "./components/Header";
import dictionary from "././dictionary.json";
import { useDispatch, useSelector } from "react-redux";
import { curr_attempt, correct_number, board2, game_over, hint } from "./stores/GameSlicer";
export const AppContext = createContext();

function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken ?. token
}

function App() {
    const selector = useSelector(state=>state)
    const dispatch = useDispatch()

    document.title = "p-i-n-g-a-m-e";

    const token = getToken();
    const guessedNumberCount = 4;
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        dispatch(correct_number(generateNumber(guessedNumberCount)))
    }, []);

    const onEnter = () => {
        if (selector.game.letter !== guessedNumberCount) 
            return;
        

        let currNumber = "";
        for (let i = 0; i < guessedNumberCount; i++) {
            currNumber += selector.game.board2[selector.game.attempt][i];
        }
        console.log(currNumber)    
        if (currNumber.split("").filter((v, i, a) => a.indexOf(v) === i).length != guessedNumberCount) {
            Toast.fire({icon: 'warning', title: 'Oyun Kuralları!', html: '1-Aynı sayıları tekrar giremezsiniz.<hr>'})
            return;
        }
        // içeren sayı var mı kontrolü, ipucu için
        var _hint = [...selector.game.hint]
        for (let i = 0, len = currNumber.length; i < len; ++ i) {
            if (currNumber[i] == selector.game.correctNumber[i]) {
                _hint[selector.game.attempt] += "+"
            } else if (selector.game.correctNumber.includes(currNumber[i])) {
                _hint[selector.game.attempt] += "-"
            }
        }
        console.log(_hint)
        dispatch(hint(_hint))
        // sayı doğru mu?
        if (currNumber == selector.game.correctNumber) {
            var retrievedObject = JSON.parse(localStorage.getItem('game'))["won"];
            retrievedObject += 1;
            localStorage.setItem('game', JSON.stringify({won: retrievedObject, lose: JSON.parse(localStorage.getItem('game'))["lose"]}));
            dispatch(game_over({gameOver: true, guessedWord: true}))
            return;
        }
        dispatch(curr_attempt({attempt:selector.game.attempt +1,letter:0}))

        if (selector.game.attempt === 7) {
            var retrievedObject = JSON.parse(localStorage.getItem('game'))["lose"];
            retrievedObject += 1;
            localStorage.setItem('game', JSON.stringify({won: JSON.parse(localStorage.getItem('game'))["won"], lose: retrievedObject}));
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
        if (selector.game.letter > (guessedNumberCount-1)) 
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
    
    return (
        <div className="App">
            <AppContext.Provider value={
                {
                    onSelectLetter,
                    onDelete,
                    onEnter,
                }
            }>
                {
                ! token && <Login/>
            }
                <Header />
                <div className="game">
                    <div className="game1">
                        <Board/> {
                        selector.game.hint && <Hint hintPos={
                            selector.game.attempt
                        }/>
                    } </div>
                    {
                    selector.game.gameOver ? <GameOver/>: <Keyboard/>
                } </div>
            </AppContext.Provider>
            <script src="sweetalert2.all.min.js"></script>
            <script src="sweetalert2.min.js"></script>
            <link rel="stylesheet" href="sweetalert2.min.css"></link>
            <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        </div>
    );
}

export default App;
