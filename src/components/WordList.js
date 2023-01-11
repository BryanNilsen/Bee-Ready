import React from 'react';

export default function WordList(props) {

    return (
        <>
            <div className="container">
                <div className='wordlist'>
                    {props.wordlist.map((word, index) =>
                        <div className="wordlist-word" key={index}>{word}</div>
                    )}
                </div>
            </div>
        </>
    )
}