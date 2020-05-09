import React from 'react';

import Values from './values';

function getValue(letter) {
  return {
    'A': 6,
    'B': 7,
    'C': 1,
    'D': 2,
    'E': 3,
    'F': 4,
    'G': 5
  }[letter];
}

class Note extends React.Component {
  render() {
    const duration = this.props.duration;
    const note = this.props.note;
    const measure = this.props.measure;
    let value;
    const keyValue = 4 * 7 + getValue(measure.clef.sign);
    if (note.rest) {
      value = keyValue + 5;
    } else {
      value = getValue(note.pitch.step) + 7 * note.pitch.octave;
    }
    const diffValue = keyValue - value;
    const zeroValue = 12 + Values.SHEET_STEP * 3 + 4.5 * diffValue;
    console.log(zeroValue, note);
    let icon;
    if (note.rest) {
      if (duration >= 1) {
        icon = 'QuarterRest';
      } else if (duration >= 0.5) {
        icon = 'QuarterRest';
      } else {
        icon = 'QuarterRest';
      }
    } else if (duration >= 1) {
      icon = 'RoundNote';
    } else if (duration >= 0.5) {
      icon = 'WhiteNote';
    } else {
      icon = 'BlackNote';
    }
    return (
      <image href={'/svg/' + icon + '.svg'} y={zeroValue}></image>
    )
  }
}

export default Note;