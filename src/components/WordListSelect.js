import React from 'react';

export default function WordListSelect(props) {

    return (
        <div>
            {props.wordlists !== null && (
                <select name="wordlist" id="wordlist" onChange={(event) => props.handleWordlistSelect(event)}>
                    <option>Select WordList</option>
                    {props.wordlists.map((wordlist, i) => <option key={i} value={wordlist.id}>{wordlist.name}</option>)}
                </select>
            )}
        </div>
    );
}