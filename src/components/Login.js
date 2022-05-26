import React, { useState } from 'react'
import db from "../Config";
import {collection, addDoc} from "firebase/firestore";
import Header from './Header';
import dictionary from "../dictionary.json";
import { useSelector } from "react-redux";

function Login() {
    const selector = useSelector(state=>state)
    const [nickname,setNickname] = useState('')    

    function createToken() {
        localStorage.setItem('token', JSON.stringify({token: "ses"}));
        localStorage.setItem('game', JSON.stringify({won: 0, lose: 0}));
        console.log(localStorage.getItem('token'));
    }
    const deneme = async (e) => {
        e.preventDefault();
        if (nickname === '') {
            alert("Lütfen bir nick giriniz");
            return;
        }
        var deleted = document.getElementById("delete");
        deleted.remove();

        var removed = document.getElementById("box");
        
        removed.classList.add("hidden");
        createToken();
        try {
            localStorage.setItem('nickname', JSON.stringify({nickname: nickname}));
            const docRef = await addDoc(collection(db, "users"), {nickname: nickname});
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div id="box" className='login'>
            <div className='login-content'>
                <Header />
            <form>
                <label>
                    <p style={{fontWeight:910,letterSpacing:3,fontSize:18}}>{dictionary[selector.site.language].welcome}
                    </p>
                    <input onChange={
                            e => setNickname(e.target.value)
                        }
                        type="text"
                        required
                        className='login-input'/>
                </label>
                <div>
                    <button id="delete"
                        onClick={deneme}>{dictionary[selector.site.language].play}</button>
                </div>
            </form>
            </div>
        </div>

    )
}

export default Login
