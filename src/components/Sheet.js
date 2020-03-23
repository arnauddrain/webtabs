import React from 'react';
import Line from './Line'

class Sheet extends React.Component {
  render() {
    return <svg width="1080" height="300">
      <Line></Line>
    </svg>
  }
}

export default Sheet;