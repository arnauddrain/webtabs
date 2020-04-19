import React from 'react';
import './App.css';
import Sheet from './components/Sheet';
import MusicXML from './parsers/MusicXML';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: null
    }
  }

  async componentDidMount() {
    document.title = "Webtabs";
    const musicXML = new MusicXML();
    this.setState({
      music: await musicXML.parse('target.xml')
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
        <Sheet music={this.state.music} />
      </div>
    );
  }
}

export default App;
