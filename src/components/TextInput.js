import React, { useEffect, useState } from "react";
export default function TextInput(props) {
    const [input, setInput] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    useEffect(() => {
        setInput("");
        resetMessage();
    }, [props.word])

    const handleSubmit = () => {
        const message = props.word === input ? "correct" : "incorrect";
        setMessage(message);
        setShowMessage(true);
        props.nextWord();
        // if correct, app level needs function to increase num correct and move to next word
    }

    const resetMessage = () => {
        setMessage("");
        setShowMessage(false);
    }

    return (
        <>
            <div className="container">
                <label>
                    Word:
                    <input type="text" className="guessInput" name="input" onChange={handleChange} onFocus={resetMessage} value={input} />
                </label>
                <input type="button" onClick={handleSubmit} value="Check" />
            </div>
            <div className="container">
                <p className={showMessage ? "" : "hidden"}>{message}</p>
            </div>
        </>
    )
}