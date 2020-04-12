import React from 'react';

class Note extends React.Component {
  render() {
    const duration = this.props.duration;
    let icon;
    if (duration >= 1) {
      icon = 'Round';
    } else if (duration >= 0.5) {
      icon = 'White';
    } else {
      icon = 'Black';
    }
    return (
      <image href={'/svg/' + icon + 'Note.svg'} y="20"></image>
    )
  }
}

export default Note;