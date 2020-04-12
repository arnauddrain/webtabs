import React from 'react';

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
    const value = getValue(note.pitch.step) + 7 * note.pitch.octave;
    const keyValue = 4 * 7 + getValue(measure.clef.sign);
    const diffValue = keyValue - value;
    console.log(diffValue);
    const zeroValue = 12 + 9 * 3 + 4.5 * diffValue;
    console.log(zeroValue);
    let icon;
    if (duration >= 1) {
      icon = 'Round';
    } else if (duration >= 0.5) {
      icon = 'White';
    } else {
      icon = 'Black';
    }
    return (
      <image href={'/svg/' + icon + 'Note.svg'} y={zeroValue}></image>
    )
  }
}

export default Note;