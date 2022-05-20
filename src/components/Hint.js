import React, {useContext} from "react";
import {  useSelector } from "react-redux";

function Hint() {
    const selector = useSelector(state=>state)
    return (
        <div className="hintboard">
            {selector.game.hint.map((h, i) => {
                return (
                    <div key={i} className="hint">
                        {[...h].map((sign,j) => {
                            switch(sign){
                                case "+":
                                    return <span key={j} className="plus"></span>;
                                case "-":
                                    return <span key={j} className="minus"></span>;
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Hint
