import React from 'react';
import LineStart from './LineStart';
import LineBlock from './LineBlock';

class Line extends React.Component {
  render() {
    return (
      <g transform={'translate(0, ' + (20 + 300 * this.props.number) + ')'}>
        <LineStart />
        <LineBlock number="0" />
        <LineBlock number="1" />
        <LineBlock number="2" />
      </g>
    )
  }
}

export default Line;