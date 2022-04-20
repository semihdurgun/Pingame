import React, { useState} from 'react'
import db from "../Config";
import {collection, addDoc} from "firebase/firestore";

function Login() {
    const [nickname, setNickname] = useState(null);

    function createToken() {
        localStorage.setItem('token', JSON.stringify({token: "ses"}));
        localStorage.setItem('game', JSON.stringify({won: 0, lose: 0}));
        console.log(localStorage.getItem('token'));
    }
    const deneme = async (e) => {
        e.preventDefault();
        if (nickname === null) {
            alert("Lütfen bir nick giriniz");
            return;
        }
        var deleted = document.getElementById("delete");
        deleted.remove();

        var removed = document.getElementById("box");
        removed.classList.add("hidden");
        createToken();
        try {
            const docRef = await addDoc(collection(db, "users"), {nickname: nickname});
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <div id="box" className='login'>
            <div className='login-content'>
                <header>
                    <h1 style={{fontWeight:70,letterSpacing:0.5}}><strong>p-i-n-g-a-m-e</strong></h1>
                </header>
            <form>
                <label>
                    <p style={{fontWeight:910,letterSpacing:3,fontSize:18}}>Bana bir isim lazım..
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
                        onClick={deneme}>Oyna</button>
                </div>
            </form>
            </div>
        </div>

    )
}

export default Login
