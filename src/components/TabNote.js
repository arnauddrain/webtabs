import React from 'react';

import Values from './values';

class TabNote extends React.Component {
  render() {
    const note = this.props.note;
    const y = Values.TAB_BASE + Values.TAB_STEP * note.tab.string - 5;
    return (
      <>
        <rect width="10" height="10" y={y - 10} fill="white" />
        <text y={y}>{note.tab.fret}</text>
      </>
    )
  }
}

export default TabNote;