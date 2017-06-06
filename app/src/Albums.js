import React, { Component } from 'react';
import './Albums.css';
import Album from './Album';
import albumsData from './data/albumsData.js';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
    }

    this.refreshState = this.refreshState.bind(this);
  }

  componentDidMount() {
    fetch('/api/albums/full')
    .then(albums => albums.json())
    .then( albumsData => {
      this.setState({albums: albumsData});
    })
  }

  refreshState() {
    fetch('/api/albums/full')
    .then(albums => albums.json())
    .then( albumsData => {
      this.setState({albums: albumsData});
    })
  }

  render() {
    let {albums} = this.state;
    return (
      <div className="Albums">
        {albums.map((album,i) => {
            return <Album key={i} albumData={album} refreshState={this.refreshState}/>
        })}
      </div>  
    );
  }
}

export default Albums;