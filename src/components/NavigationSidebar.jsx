import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import LikedSongs from "./LikedSongs";

export default function NavigationSidebar(props) {
	useEffect(() => {
	});

	const _onPlaylistClick = (playlist) => {
		props.onPlaylistClicked(playlist)
	}

	let userPlaylists =
		props.playlists &&
		props.playlists.map((playlist, i) => (
			<li id="playlists" key={i} onClick={() => _onPlaylistClick(playlist)}>
				<Link to="/playlist"
					state={{
						displayPlaylist: playlist,
						token: props.token
					}}
				>
					{playlist.name}
				</Link>
			</li>
		));

	return (
		<div id="sidebar">
			<nav id="topbar">
				<ul>
					<li>
						<Link to={'/home'}>Home</Link>
					</li>
					<li >
						<Link to={'/home'}>Search</Link>
					</li>
				</ul>
			</nav>
			<nav id="bottombar">
				<ul>
					<h2 className="library">Your Library</h2>
					<ul>
						<li>
							<Link to={'/liked-songs'}>Liked Songs</Link>
						</li>
					</ul>
				</ul>
				{userPlaylists}
				<ul>

				</ul>
			</nav>
		</div>
	);
}
