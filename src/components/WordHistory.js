import React, { useEffect, useState } from "react";

export default function WordHistory(props) {

    return (
        <>
            <div className="container">
                <p className="wordhistory">&nbsp;
                    {props.wordHistory.map((wordId, index) =>
                        <span key={index} className="wordhistory-word">{props.wordlist[wordId]}</span>
                    )}
                </p>
            </div>
        </>
    )
}