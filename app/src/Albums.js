import React, { Component } from 'react';
import './Albums.css';
import Album from './Album';


class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      titleNew: ''
    }

    this.addAlbum = this.addAlbum.bind(this);
    this.titleHandler =this.titleHandler.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
  }

  componentDidMount() {
    fetch('/api/albums/full')
    .then(albums => albums.json())
    .then( albumsData => {
      this.setState({albums: albumsData});
    })
  }

  titleHandler(e) {
      let {name, value} = e.target;
      this.setState({[name]: value});
  }

  addAlbum(e) {
    if(e.charCode==13){

      let newAlbum = {
        title: this.state.titleNew,
        pictures: []
      };

      fetch(`/api/albums/`, 
      {
        method: 'POST',
        body: JSON.stringify(newAlbum),
        headers: new Headers({'Content-Type': 'application/json'})
      }) 
      .then(album => {
        let albums = this.state.albums.slice();
        albums.push(album);
        this.setState({
          albums: albums,
          titleNew: ''
        });
      });
    }
  }

  deleteAlbum (e) {
    console.log(e.target.value)
    let {albums} = this.state;
    fetch(`/api/albums/${e.target.value}`,
    {
      method: 'DELETE'
    })
    .then(() => {

    });
  }

  render() {
    let {albums, titleNew} = this.state;
    return (
      <div className="Albums">
        {albums.map((album,i) => {
            return <Album key={i} albumData={album} deleteAlbum={this.deleteAlbum}/>
        })}
        <input 
          className="newAlbum Album" 
          placeholder="+" 
          onKeyPress={this.addAlbum}
          type="text" 
          name="titleNew" 
          value={titleNew}
          onChange={this.titleHandler}
        /> 
      </div>  
    );
  }
}

export default Albums;