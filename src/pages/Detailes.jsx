import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";

function Detailes() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    http
      .get(`playlists/${id}`)
      .then((response) => {
        setPlaylist(response.data);
        setTracks(response.data.tracks.items);
      })
      .catch((error) => console.error("Error loading playlist:", error));
  }, [id]);

  if (!playlist) {
    return (
      <div className="text-center py-8 text-gray-300 text-2xl">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      {/* Playlist Header */}
      <div className="flex items-center space-x-6 mb-8">
        {playlist.images && playlist.images[0] && (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="w-56 h-56 object-cover rounded-md shadow-lg"
          />
        )}
        <div>
          <p className="uppercase text-sm font-semibold tracking-wider text-gray-400">
            Playlist
          </p>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <p className="text-gray-300 text-sm max-w-lg">
            {playlist.description}
          </p>
          <p className="text-gray-400 mt-2">
            {playlist.owner?.display_name} • {playlist.tracks.total} songs
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {tracks.map((song, index) => (
          <div
            key={song?.track?.id}
            className="grid grid-cols-12 items-center p-2 rounded hover:bg-gray-800 transition duration-150"
          >
            <div className="col-span-1 text-gray-400 text-center">
              {index + 1}
            </div>
            <div className="col-span-10 flex items-center space-x-4">
              {song.track.album.images && song.track.album.images[0] && (
                <img
                  src={song.track.album.images[0].url}
                  alt={song.track.name}
                  className="w-12 h-12 rounded"
                />
              )}
              <div>
                <h3 className="font-medium text-lg text-white">
                  {song.track.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {song.track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="col-span-1 text-gray-400 text-sm text-right">
              {Math.floor(song.track.duration_ms / 60000)}:
              {(
                "0" + Math.floor((song.track.duration_ms % 60000) / 1000)
              ).slice(-2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detailes;
