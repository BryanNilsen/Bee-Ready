import React, { useState } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";

function Speak(props) {
  const [value, setValue] = useState("");
  const [speaker, setSpeaker] = useState("");
  const { speak } = useSpeechSynthesis();

  const voices = window.speechSynthesis.getVoices()
  const voiceArray = voices.filter(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')

  let currentVoice = voiceArray[speaker]
  speak.rate = 5

  const synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance("katie is the champ");
  utterThis.rate = .9
  utterThis.voice = currentVoice


  return (

    <div>
      <div>
        <p>{props.number}</p>
        <select name="voice" id="voice"
          onChange={event => setSpeaker(event.target.value)}>
          {voiceArray.map((voice, i) => <option key={i} value={i}>{voice.name}</option>)}
        </select>
      </div>
      <textarea
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value, voice: currentVoice })}>Speak</button>

      <button onClick={() => synth.speak(utterThis)}>Stored</button>
    </div>
  );
}

export default Speak;

