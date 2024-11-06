import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { VscLibrary } from "react-icons/vsc";
import { MdAddBox } from "react-icons/md";
import { FcLikePlaceholder } from "react-icons/fc";
import http from "../axios";
import { Link } from "react-router-dom";
function Leftbar() {
  const [song, setSong] = useState([]);
  useEffect(() => {
    http
      .get("/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists")

      .then((data) => {
        if (data.status == 200) {
          setSong(data.data.playlists.items);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="home text-white flex flex-wrap items-center gap-2 ">
          <TiHome />

          <h1 className="text-white"><Link to={'/'} >Home</Link></h1>
        </div>
        <div className=" text-white flex flex-wrap items-center gap-2">
          <IoSearch />
          <h1 className=" text-gray-300">Search</h1>
        </div>
        <div className="librarary text-white flex flex-wrap items-center gap-2 ">
          <VscLibrary />
          <h1 className="text-gray-300">Your Library</h1>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-b  border-slate-300">
        <div className="playlist  text-white flex flex-wrap items-center gap-2 ">
          <MdAddBox />
          <h1 className=" text-white"> Create Playlist</h1>
        </div>

        <div className="liked text-white flex flex-wrap items-center gap-2 ">
          <FcLikePlaceholder />
          <h1>Liked Songs</h1>
        </div>
      </div>

      {song.length > 0 &&
        song.splice(0, 10).map((value) => {
          return (
            <div className="flex flex-col gap-4 mt-3">
              <h1 className="text-white">{value.name}</h1>
            </div>
          );
        })}
    </div>
  );
}

export default Leftbar;
