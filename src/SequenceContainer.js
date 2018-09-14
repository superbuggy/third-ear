import React, { Component } from 'react'
import NoteSequence from './NoteSequence'
import ScaleSelector from './ScaleSelector'

class SequenceContainer extends Component {
  render () {
    return (
      <div>
        <NoteSequence />
        <ScaleSelector />
      </div>
    )
  }
}

export default SequenceContainer
