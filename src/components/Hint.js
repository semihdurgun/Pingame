import React, {useContext} from "react";
import {AppContext} from "../App";

function Hint() {
    const {hint, setHint} = useContext(AppContext);
    return (
        <div className="hintboard">
            {hint.map((h, i) => {
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
