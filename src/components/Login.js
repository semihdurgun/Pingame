import React, { useContext, useEffect, useState} from 'react'
import db from "../Config";
import {AppContext} from "../App";
import {collection, addDoc} from "firebase/firestore";

function Login() {

    const [nickname, setNickname] = useState(null);
 
    function createToken() {
        localStorage.setItem('token', JSON.stringify({token:"ses"}));
        console.log(localStorage.getItem('token'));
    }

    const deneme = async (e) => {
        e.preventDefault();
        if(nickname === null) {
            alert("Lütfen bir nick giriniz");
            return;  
        }
        createToken();
        try {
            const docRef = await addDoc(collection(db, "users"), {nickname: nickname});
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
            <form>
                <label>
                    <p>Adınız: </p>
                    <input onChange={e => setNickname(e.target.value)} type="text" required/>
                </label>
                <div>
                    <button id="delete" onClick={deneme} type="submit">Oyna!</button>
                </div>
            </form>
        
    )
}

export default Login

