import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Searcher = (props) => {
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);

  const searchArtist = async () => {
    const data = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${props.token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    });

    const artistID = data.data.artists.items[0].id;

    const artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
      headers: {
        'Authorization': `Bearer ${props.token}`
      },
      params: {
        limit: 10,
        market: 'US'
      }
    });

    setTracks(artistTracks.data.tracks);
  };

  const handlePlay = (uri) => {
    // This function will handle playing the selected track
    // You can call your player component here and pass the uri of the selected track as a prop
    return <Players uri={uri} />;
  }  

  return (
    <>
      <div className="SearchForm">
        <input
          className="Name"
          type="text"
          placeholder="Search By Artist Name ..."
          onChange={(e) => { setSearchKey(e.target.value) }}
        />
        <button onClick={searchArtist}>Search</button>
      </div>
      {
        tracks.slice(0, 5).map(track => (
          <div key={track.id} className="Track" onClick={() => handlePlay(track.uri)}>
            <div className="Track-title">{track.name}</div>
            <div className="Track-artist">{track.artists[0].name}</div>
            <div className="Track-album">{track.album.name}</div>
          </div>
        ))
      }
    </>
  );
};

export default Searcher;
