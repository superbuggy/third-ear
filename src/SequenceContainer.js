import React, { Component } from 'react'
import NoteSequence from './NoteSequence'
import ScaleSelector from './ScaleSelector'
import { Scale } from 'tonal'

class SequenceContainer extends Component {
  constructor (props) {
    super(props)
    this.root = 'C '
    this.state = {
      scale: this.root + 'major'
    }
  }

  changeScale = scale => {
    this.setState(_ => ({ scale }))
  }

  render () {
    return (
      <div>
        <NoteSequence
          scale={this.state.scale}
        />
        <ScaleSelector
          changeScale={this.changeScale}
        />
      </div>
    )
  }
}

export default SequenceContainer
