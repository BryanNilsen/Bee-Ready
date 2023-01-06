import React, { useState, useEffect } from 'react';
import SpeakerOptions from './components/SpeakerOptions'
import WordDataOptions from './components/WordDataOptions'
import './App.css';
import wordlist from './WordList'
import TextInput from './components/TextInput';

export default function App() {
    const [voices, setVoices] = useState([]);
    const [currentVoice, setCurrentVoice] = useState({});
    const [wordId, setWordId] = useState(0);

    useEffect(() => {
        window.speechSynthesis.onvoiceschanged = () => {
            getVoices()
        }
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

    const speakNextWord = () => {
        let num = wordId
        num++
        if (num < wordlist.length) {
            setWordId(num);
            speak(wordlist[num])
        } else {
            alert("you've completed the wordlist")
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
                    speak(wordlist[wordId])
                }}>SAY WORD</button>
                <button onClick={() => {
                    speakNextWord()
                }}>NEXT WORD</button>
                {/* word data attribute buttons */}
                <WordDataOptions
                    speak={speak}
                    wordlist={wordlist}
                    wordId={wordId}
                />
                <TextInput word={wordlist[wordId]} />
            </div>
        </>
    );
}