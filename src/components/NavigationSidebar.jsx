import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NavigationSidebar(props) {
  useEffect(() => {
    console.log('props', props);
  });
  
  let listItems =
    props.playlists &&
    props.playlists.map((playlist, i) => (
      <li key={i}>
        <Link to="/playlist">{playlist.name}</Link>
      </li>
    ));

  return (
    <div id="sidebar">
      <nav id="topbar">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/home">Search</Link>
          </li>
        </ul>
      </nav>
      <nav id="bottombar">
        <ul>
          <h2 className="library">Your Library</h2>
          <li>
            <Link to="/app">Liked Songs</Link>
          </li>
          {listItems}
        </ul>
      </nav>
    </div>
  );
}
