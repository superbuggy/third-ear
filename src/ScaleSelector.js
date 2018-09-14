import React, { Component } from 'react'
import { Dictionary } from 'tonal'
import Fuse from 'fuse.js'
import './ScaleSelector.css'
export default class ScaleSelector extends Component {
  state = {
    searchText: null,
    matches: []
  }

  scales = Dictionary.scale.names()

  handleType = event => {
    event.persist()
    this.setState(
      _ => ({searchText: event.target.value}),
      this.matchSearch
    )
  }

  matchSearch = () => {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1
    }
    const matches = new Fuse(this.scales, options)
      .search(this.state.searchText)
      .map(index => this.scales[index])
    console.log(matches)
    this.setState(_ => ({ matches }))
  }

  render () {
    const matches = this.state.matches.map(scale => (
      <p> {scale} </p>
    ))
    return (
      <div>
        <input
          type='text'
          name='scale'
          onChange={this.handleType}
        />
        <div className='matches'>
          {matches}
        </div>
      </div>
    )
  }
}
