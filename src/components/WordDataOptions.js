import React, { useEffect, useState } from 'react';
import APIManager from '../APIManager';

function WordDataOptions(props) {
    const [wordData, setWordData] = useState({});

    useEffect(() => { getWordData(props.wordlist[props.wordId]) }, [props.wordId, props.wordlist])
    const getWordData = (word) => {
        APIManager.getWord(word)
            .then(parsed => {
                console.log("parsed", parsed[0])
                setWordData(parsed[0])
            })
    }

    const dictionaryPronunciation = () => {
        const prs = wordData.hwi.prs[0].sound.audio
        const startsWith = prs.charAt(0)
        const wavAddress = `https://media.merriam-webster.com/soundc11/${startsWith}/${prs}.wav`
        const audio = new Audio(wavAddress)
        audio.play()
    }


    const getEtymology = () => {
        const string = wordData.et[0][1]
        const newString = string.replace(/{it}/g, "").replace(/{\/it}/g, "")
        console.log(newString)
        return newString
    }

    return (
        <div className="container">
            <button className="btn-worddata" onClick={() => {
                props.speak(wordData.shortdef[0])
            }}>Definition</button>
            <button className="btn-worddata" onClick={() => {
                props.speak(wordData.fl)
            }}>Part of Speech</button>
            <button className="btn-worddata" onClick={() => {
                dictionaryPronunciation()
            }}>Dictionary Pronunciation</button>
            <button className="btn-worddata" onClick={() => {
                props.speak(getEtymology())
            }}>Etymology</button>
        </div>
    );
}
export default WordDataOptions