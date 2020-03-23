import React from 'react';

function LeftNotes() {
  return (
    <>
      <rect x="12" y="15" width="50" height="1" fill="black"></rect>
      <rect x="12" y="24" width="50" height="1" fill="black"></rect>
      <rect x="12" y="33" width="50" height="1" fill="black"></rect>
      <rect x="12" y="42" width="50" height="1" fill="black"></rect>
      <rect x="12" y="51" width="50" height="1" fill="black"></rect>
      <image href="/svg/GClef.svg" x="15" y="5" width="20"></image>
    </>
  )
}

function LeftTab() {
  return (
    <>
      <rect x="12" y="165" width="50" height="1" fill="black"></rect>
      <rect x="12" y="176" width="50" height="1" fill="black"></rect>
      <rect x="12" y="187" width="50" height="1" fill="black"></rect>
      <rect x="12" y="198" width="50" height="1" fill="black"></rect>
      <rect x="12" y="209" width="50" height="1" fill="black"></rect>
      <rect x="12" y="220" width="50" height="1" fill="black"></rect>
      <text x="18" y="185" font-size="22">T</text>
      <text x="18" y="201" font-size="22">A</text>
      <text x="18" y="217" font-size="22">B</text>
    </>
  )
}

class LeftLine extends React.Component {
  render() {
    return (
      <>
        <rect x="5" y="5" width="3" height="225" fill="black"></rect>
        <path d=" M5,5 C6,5,6,5,18,2 C12,8,6,8,6,8 z"
          fill="black" stroke="none"></path>
        <path d=" M5,230 C6,230,6,230,18,233 C12,227,6,227,6,227 z"
          fill="black" stroke="none"></path>
        <rect x="12" y="15" width="1" height="205" fill="black"></rect>
        <LeftNotes />
        <LeftTab />
      </>
    )
  }
}

export default LeftLine;