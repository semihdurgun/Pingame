import React, { useState } from 'react'
import Header from './Header';
import dictionary from "../dictionary.json";
import { useSelector } from "react-redux";

function Login() {
    const selector = useSelector(state=>state)
    const [nickname,setNickname] = useState('')    


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
        localStorage.setItem('game', JSON.stringify({won: 0, lose: 0}));
        localStorage.setItem('nickname', nickname);

    }
    return (
        <div id="box" className='login'>
            <div className='login-content'>
                <Header value="nav"/>
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
