import React, { useState, useEffect } from 'react';
import SpeakerOptions from './components/SpeakerOptions'
import WordDataOptions from './components/WordDataOptions'
import './App.css';
// import wordlist from './WordList'
import TextInput from './components/TextInput';
import WordHistory from './components/WordHistory';
import WordListManager from './WordListManager';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import WordListSelect from './components/WordListSelect';

export default function App() {
    const [voices, setVoices] = useState([]);
    const [currentVoice, setCurrentVoice] = useState({});
    const [wordlistId, setWordlistId] = useState(0);
    const [wordId, setWordId] = useState(0);
    const [wordHistory, setWordHistory] = useState([]);
    const [wordlist, setWordlist] = useState(null);
    const [wordlists, setWordlists] = useState([]);

    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = () => {
            getVoices()
        }
    }, []);

    const getWordLists = () => {
        return WordListManager.getWordLists().then(wordlists => {
            setWordlists(wordlists)
        })
    }
    const getWordList = () => {
        return WordListManager.getWordListById(wordlistId).then(wordlist => {
            setWordlist(wordlist)
        })
    }
    const handleWordlistSelect = (event) => {
        const wordlistId = event.target.value
        setWordlistId(wordlistId);
        setWordId(0);
    }

    const updateWordlist = (wordlist) => {
        return WordListManager.updateWordlist(wordlist, wordlistId).then(getWordList)
    }
    useEffect(() => {
        getWordList(wordlistId)
    }, [wordlistId]);

    useEffect(() => {
        getWordLists()
    }, []);

    const getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const voiceArray = voices.filter(voice => voice.lang === 'en-US');
        console.log(voiceArray);
        setVoices(voiceArray);
        setCurrentVoice(4)
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
                <WordListSelect wordlists={wordlists} handleWordlistSelect={handleWordlistSelect} />

                {/* <SpeakerOptions
                    handleVoiceSelect={handleVoiceSelect}
                    voices={voices}
                /> */}
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
                        {/* <WordHistory wordlist={wordlist.words} wordHistory={wordHistory} /> */}
                        <AddWord wordlist={wordlist} updateWordlist={updateWordlist} />
                        <WordList wordlist={wordlist.words} />
                    </>
                )}

            </div>
        </>
    );
}