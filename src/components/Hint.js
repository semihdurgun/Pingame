import React, {useContext} from "react";
import {AppContext} from "../App";

function Hint() {
    const {hint, setHint} = useContext(AppContext);
    return (
        <div className="hintboard">
            {hint.map((h, i) => {
                return (
                    <div key={i} className="hint">
                        {[...h].map(sign => {
                            switch(sign){
                                case "+":
                                    return <span key={i} className="plus"></span>;
                                case "-":
                                    return <span key={i} className="minus"></span>;
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Hint
