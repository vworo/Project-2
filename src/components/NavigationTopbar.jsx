import React from "react";
import { useState, useEffect } from "react";
import Searcher from "./Searcher";
import Categories from "./Categories";
import UserProfile from './UserProfile';

export default function NavigationTopbar(props) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (props.token) {
      fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + props.token }
      })
      .then(response => response.json())
      .then(data => setUserProfile(data));
    }
  }, [props.token]);

  // Changes current URL the server_url where user will login to Spotify
  const authorize = () => {
    props.authorize();
  };

  return (
    <div className="top-navbar">
      <Searcher token={props.token} />

      {userProfile ? (
        <div className="profile-image-container">
          {userProfile.images.length > 0 && (
            <img className="profile-image" src={userProfile.images[0].url} alt="" />
          )}
        </div>
      ) : (
        <button className="login" onClick={authorize}>Login</button>
      )}
    </div>
  );
}
