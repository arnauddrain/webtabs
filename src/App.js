import React from 'react';
import './App.css';
import Sheet from './components/Sheet'

class App extends React.Component {
  componentDidMount() {
    document.title = "Webtabs"
  }

  render() {
    return (
      <div className="App">
        <Sheet />
      </div>
    );
  }
}

export default App;
