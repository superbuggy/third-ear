import React, { Component } from 'react'
import { Scale } from 'tonal'
import Tone from 'tone'

class NoteSequence extends Component {
  constructor (props) {
    super(props)
    const notes = this.shuffleArray(Scale.notes('C major'))
    console.log(notes.constructor)
    this.state = {
      notes,
      synth: new Tone.DuoSynth().toMaster(),
      transport: Tone.Transport,
      sequence: this.newSequence(notes)
    }
  }

  shuffleArray (array) { // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let newArray = array.slice()
    for (let pivot = newArray.length - 1; pivot > 0; pivot--) {
      const randomIndex = Math.floor(Math.random() * (pivot + 1))
      ;[newArray[pivot], newArray[randomIndex]] = [newArray[randomIndex], newArray[pivot]]
    }
    return newArray
  }

  generateSequence (length) {
    return Array.from(Array(length).keys())
      .map(_ => 'C1')
  }

  setSequence () {
    const sequence = this.newSequence()
    this.setState(_ => ({ sequence }))
  }

  newSequence (notes) {
    const sequence = new Tone.Sequence(this.playNote, notes)
    sequence.loop = 0
    return sequence
  }

  playNote = (time, note) => {
    console.log(note + 4)
    this.state.synth.triggerAttackRelease(note + 4, '4n')
  }

  startPlayback () {
    this.state.transport.start(0.5)
    this.state.sequence.start(0.5)
  }

  render () {
    console.log(this.state.notes)
    this.startPlayback()

    return (
      <div>
        {this.state.notes}
      </div>
    )
  }
}

export default NoteSequence
