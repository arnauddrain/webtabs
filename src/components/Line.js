import React from 'react';
import LineStart from './LineStart';

class Line extends React.Component {
  render() {
    return (
      <g transform={'translate(0, ' + (20 + 300 * this.props.number) + ')'}>
        <LineStart />
      </g>
    )
  }
}

export default Line;