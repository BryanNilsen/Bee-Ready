import React, { useEffect, useState } from "react";

export default function AddWord(props) {
    const [input, setInput] = useState("");

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    useEffect(() => {
        setInput("");
    }, [props.wordlist])

    const handleSubmit = () => {
        if (input !== "") {
            const copyOfWordlist = { ...props.wordlist };
            copyOfWordlist.words.push(input);
            props.updateWordlist(copyOfWordlist)
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    };


    return (
        <>
            <div className="container">
                <label>
                    Add Word:
                    <input type="text" className="guessInput" name="addwordinput" onKeyDown={handleKeyDown} onChange={handleChange} value={input} />
                </label>
                <input type="button" onClick={handleSubmit} value="Add Word to List" />
            </div>
        </>
    )
}