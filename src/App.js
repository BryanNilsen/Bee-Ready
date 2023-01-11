import React, { useState, useEffect } from 'react';
import SpeakerOptions from './components/SpeakerOptions'
import WordDataOptions from './components/WordDataOptions'
import './App.css';
// import wordlist from './WordList'
import TextInput from './components/TextInput';
import WordHistory from './components/WordHistory';
import WordListManager from './WordListManager';
import AddWord from './components/AddWord';

export default function App() {
    const [voices, setVoices] = useState([]);
    const [currentVoice, setCurrentVoice] = useState({});
    const [wordId, setWordId] = useState(0);
    const [wordHistory, setWordHistory] = useState([]);
    const [wordlist, setWordlist] = useState(null);

    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = () => {
            getVoices()
        }
    }, []);

    const getWordList = () => {
        return WordListManager.getWordLists().then(wordlists => {
            setWordlist(wordlists[0])
        })
    }

    const updateWordlist = (wordlist) => {
        return WordListManager.updateWordlist(wordlist).then(getWordList)
    }
    useEffect(() => {
        getWordList()
    }, []);

    const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const voiceArray = voices.filter(voice => voice.lang === 'en-US');
        setVoices(voiceArray);
    }
    const handleVoiceSelect = (event) => {
        const voiceNum = event.target.value
        setCurrentVoice(voiceNum)
    }

    const speak = (text) => {
        const synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(text);
        // utterThis.rate = .8
        utterThis.voice = voices[currentVoice]
        synth.speak(utterThis)
    }

    const nextWord = () => {
        let num = wordId
        setWordHistory(updatedHistory => [...updatedHistory, num]);
        num++
        if (num < wordlist.words.length) {
            setWordId(num);
        } else {
            alert("end of wordlist");
        }
    }

    return (
        <>
            <nav className='topnav'>
                <h1 className="beetext">BEE-READY</h1>
            </nav>
            <div>

                <SpeakerOptions
                    handleVoiceSelect={handleVoiceSelect}
                    voices={voices}
                />
                {/* speak word controls */}
                <button onClick={() => {
                    speak(wordlist.words[wordId])
                }}>SAY WORD</button>
                <button onClick={() => {
                    nextWord()
                }}>NEXT WORD</button>
                {/* word data attribute buttons */}
                {wordlist !== null && (
                    <>

                        <WordDataOptions
                            speak={speak}
                            wordlist={wordlist.words}
                            wordId={wordId}
                        />

                        <TextInput word={wordlist.words[wordId]} setWordHistory={setWordHistory} nextWord={nextWord} />
                        <WordHistory wordlist={wordlist.words} wordHistory={wordHistory} />
                        <AddWord wordlist={wordlist} updateWordlist={updateWordlist} />
                    </>
                )}

            </div>
        </>
    );
}