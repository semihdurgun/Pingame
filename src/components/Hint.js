import React, {useContext} from "react";
import {AppContext} from "../App";

function Hint() {
    const {hint, setHint} = useContext(AppContext);

    return (
        <div className="">
            {hint.map((h, i) => {
                return (
                    <div key={i} className="hint">
                        <div className="hintPoint">{h}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Hint
