import React, { Component } from 'react'
import { Dictionary } from 'tonal'
import { Scale } from 'tonal'
import Fuse from 'fuse.js'
import './ScaleSelector.css'
export default class ScaleSelector extends Component {
  state = {
    searchText: null,
    matches: []
  }

  scales = Scale.names()

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
    this.setState(_ => ({ matches }))
  }

  selectScale = event => {
    event.persist()
    this.props.changeScale(event.target.innerText)
  }

  render () {
    const matches = this.state.matches.map(scale => (
      <p
        className={'option'}
        onClick={this.selectScale}
      >
        {scale}
      </p>
    ))
    return (
      <div>
        <input
          type='text'
          name='scale'
          onChange={this.handleType}
          placeholder='Search for a scale...'
        />
        <div
          className='matches'
          style={
            {display: this.state.matches.length ? 'block' : 'none'}}
        >
          {matches}
        </div>
      </div>
    )
  }
}
