import React, { useState } from 'react';

export default function WordList(props) {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = (event) => {
        setIsVisible(!isVisible);
    }
    return (
        <>
            <div className="container">
                <button onClick={handleToggle} >{isVisible ? "Hide Word List" : "Show Word List"}</button>
                {isVisible && (
                    <div className='wordlist'>
                        {props.wordlist.map((word, index) =>
                            <div className="wordlist-word" key={index}>{word}</div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}