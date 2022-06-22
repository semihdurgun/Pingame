import "./index.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { generateNumber } from "./Words";
import React, {useEffect} from "react";
import GameOver from "./components/GameOver";
import Hint from "./components/Hint";
import Login from "./components/Login";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { correct_number } from "./stores/GameSlicer";
import { language } from "./stores/Site";

function App() {
    const selector = useSelector(state=>state)
    const dispatch = useDispatch()

    const tokenString = localStorage.getItem('nickname');
    useEffect(() => {
      }, []);
      
    useEffect(() => {
        dispatch(correct_number(generateNumber(selector.game.guessedNumberCount)))
        if (localStorage.getItem("language") !== null){
            dispatch(language(localStorage.getItem("language")))
        }    
    }, []); 

    return (
        <div className="App">
            {  ! tokenString && <Login/>   }
            <Header value="home" />
            <div className="game">
                <div className="game1">
                    <Board/> {
                    selector.game.hint && <Hint/>  } 
                </div>
                {
                    selector.game.gameOver ? <GameOver/>: <Keyboard/>
                } 
            </div>
        </div>
    );
}

export default App;
