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
  selectImage(note, duration) {
    let icon;
    if (note.rest) {
      if (duration >= 1) {
        icon = 'QuarterRest';
      } else if (duration >= 0.5) {
        icon = 'QuarterRest';
      } else {
        icon = 'QuarterRest';
      }
    } else {
      if (duration >= 1) {
        icon = 'RoundNote';
      } else if (duration >= 0.5) {
        icon = 'WhiteNote';
      } else {
        icon = 'BlackNote';
      }
    }
    return icon;
  }

  generateStem(note, duration, y) {
    if (note.rest || duration >= 1) {
      return null;
    }
    const path = `M9 ${y + 3} L9 ${y - 20}`;
    return <path d={path} stroke="black" />
  }

  render() {
    const duration = this.props.duration;
    const note = this.props.note;
    const measure = this.props.measure;
    let value;
    let keyValue = 4 * 7 + getValue(measure.clef.sign);
    if (measure.clef.octaveChange) {
      keyValue += 7 * measure.clef.octaveChange;
    }
    if (note.rest) {
      value = keyValue + 5;
    } else {
      value = getValue(note.pitch.step) + 7 * note.pitch.octave;
    }
    const diffValue = keyValue - value;
    const y = 12 + Values.SHEET_STEP * 3 + 4.5 * diffValue;
    const icon = this.selectImage(note, duration);
    const stem = this.generateStem(note, duration, y);
    return <>
      <image href={'/svg/' + icon + '.svg'} y={y}></image>
      {stem}
    </>
  }
}

export default Note;