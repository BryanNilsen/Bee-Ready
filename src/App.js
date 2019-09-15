import React, { Component } from 'react';
import Speak from './Speak'
import './App.css';
import wordlist from './WordList'

class App extends Component {
  state = {
    voices: [],
    currentVoice: {},
  };

  componentDidMount() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.getVoices()
    }
  }

  getVoices = () => {
    const voices = window.speechSynthesis.getVoices()
    console.log("voices", voices)
    const voiceArray = voices.filter(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
    this.setState({ voices: voiceArray })
  }



  handleVoiceSelect = (event) => {
    const voiceNum = event.target.value
    this.setState({ currentVoice: voiceNum })
  }

  speak = (text) => {
    const synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.rate = .8
    utterThis.voice = this.state.voices[this.state.currentVoice]
    synth.speak(utterThis)
  }




  render() {
    return (
      <div>
        <h1>Bee-Ready</h1>
        <select name="voice" id="voice" onChange={(event) => this.handleVoiceSelect(event)}>
          {this.state.voices.map((voice, i) => <option key={i} value={i}>{voice.name}</option>)}
        </select>
        <hr />
        <button onClick={() => this.speak(wordlist[0])}>SPEAK</button>
        {/* <Speak number={this.state.number} /> */}
      </div>
    );
  }
}

export default App;

