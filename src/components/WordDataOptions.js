import React, { useEffect, useState } from 'react';
import APIManager from '../APIManager';

function WordDataOptions(props) {
    const [wordData, setWordData] = useState({});
    const [allDefs, setAllDefs] = useState([]);
    const [allSounds, setAllSounds] = useState([]);
    const [soundIndex, setSoundIndex] = useState(null);

    useEffect(() => { getWordData(props.wordlist[props.wordId]) }, [props.wordId, props.wordlist])
    const getWordData = (word) => {
        APIManager.getWord(word)
            .then(parsed => {
                const defs = parsed.map(res => res.shortdef).flat();
                const sounds = parsed.map(res => findAllByKey(res, "audio")).flat();
                console.log('sounds: ', sounds);
                console.log("Defs", defs);
                console.log("parsed", parsed)
                console.log("parsed", parsed[0])
                setWordData(parsed[0])
                setAllSounds(sounds)
                sounds.length > 0 ? setSoundIndex(0) : setSoundIndex(null)
            })
    }

    function findAllByKey(obj, keyToFind) {
        return Object.entries(obj)
            .reduce((acc, [key, value]) => (key === keyToFind)
                ? acc.concat(value)
                : (typeof value === 'object')
                    ? acc.concat(findAllByKey(value, keyToFind))
                    : acc
                , [])
    }

    const dictionaryPronunciation = () => {
        const prs = wordData.hwi.prs[0].sound.audio
        const startsWith = prs.charAt(0)
        const wavAddress = `https://media.merriam-webster.com/soundc11/${startsWith}/${prs}.wav`
        const audio = new Audio(wavAddress)
        try {
            audio.play()
        } catch (error) {
            alert("no pronunciation available")
        }
    }

    const pronunceWord = () => {
        const prs = allSounds[soundIndex]
        const startsWith = prs.charAt(0)
        const wavAddress = `https://media.merriam-webster.com/soundc11/${startsWith}/${prs}.wav`
        const audio = new Audio(wavAddress)
        try {
            audio.play()
            if (soundIndex === allSounds.length - 1) {
                setSoundIndex(0)
            } else {
                setSoundIndex(soundIndex + 1)
            }
        } catch (error) {
            alert("no pronunciation available")
        }
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
                pronunceWord()
            }}>Pronounce</button>
            <button className="btn-worddata" onClick={() => {
                props.speak(getEtymology())
            }}>Etymology</button>
        </div>
    );
}
export default WordDataOptions