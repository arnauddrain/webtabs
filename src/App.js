import React from 'react';
import './App.css';
import Sheet from './components/Sheet';
import Player from './components/Player';
import MusicXML from './parsers/MusicXML';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: null,
      playback: {
        playing: false
      }
    }
  }

  async componentDidMount() {
    document.title = "Webtabs";
    const musicXML = new MusicXML();
    this.setState({
      music: await musicXML.parse('https://webtabs.s3.eu-west-3.amazonaws.com/summer.musicxml')
    });
  }

  handlePlaybackChange = (playback) => {
    playback.measure = 0;
    this.setState({
      playback: playback
    });
  }

  render() {
    if (!this.state.music) {
      return (
        <div className="App">
          Loading...
        </div>
      )
    }
    return (
      <div className="App">
        <div className="AppInner">
          <Sheet music={this.state.music} playback={this.state.playback} />
        </div>
        <Player playback={this.state.playback} playbackChange={this.handlePlaybackChange} />
      </div>
    );
  }
}

export default App;
