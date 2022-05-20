import "./index.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { generateNumber } from "./Words";
import React, {useEffect} from "react";
import GameOver from "./components/GameOver";
import Hint from "./components/Hint";
import Login from "./components/Login";
import Header from "./components/Header";
import dictionary from "././dictionary.json";
import { useDispatch, useSelector } from "react-redux";
import { correct_number} from "./stores/GameSlicer";

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
    

    useEffect(() => {
        dispatch(correct_number(generateNumber(selector.game.guessedNumberCount)))
    }, []);

    
    return (
        <div className="App">
            {  ! token && <Login/>   }
            <Header />
            <div className="game">
                <div className="game1">
                    <Board/> {
                    selector.game.hint && <Hint/>  } 
                </div>
                {
                    selector.game.gameOver ? <GameOver/>: <Keyboard/>
                } 
            </div>
            <script src="sweetalert2.all.min.js"></script>
            <script src="sweetalert2.min.js"></script>
            <link rel="stylesheet" href="sweetalert2.min.css"></link>
            <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        </div>
    );
}

export default App;
