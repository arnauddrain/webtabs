import React from 'react';
import './App.css';
import Sheet from './components/Sheet';
import * as MusicXML from './parsers/MusicXML';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: null
    }
  }

  async componentDidMount() {
    document.title = "Webtabs"
    this.setState({
      music: await MusicXML.parse('sample.xml')
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
