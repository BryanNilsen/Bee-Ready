import React, { Component } from 'react';

class SpeakerOptions extends Component {

  render() {
    return (
      <div>
        {/* select voice */}
        <select name="voice" id="voice" onChange={(event) => this.props.handleVoiceSelect(event)}>
          <option>Select Speaker Voice</option>
          {this.props.voices.map((voice, i) => <option key={i} value={i}>{voice.name}</option>)}
        </select>
      </div>
    );
  }


}
export default SpeakerOptions