import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../axios";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

function Home() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [top, setTop] = useState([]);
  const [made, setMade] = useState([]);
  const [recently, setRec] = useState([]);
  const [jump, setJump] = useState([]);
  const [unique, setUnique] = useState([]);

  const [showAllTop, setShowAllTop] = useState(false);
  const [showAllMade, setShowAllMade] = useState(false);
  const [showAllRecently, setShowAllRecently] = useState(false);
  const [showAllJump, setShowAllJump] = useState(false);
  const [showAllUnique, setShowAllUnique] = useState(false);

  useEffect(() => {
    http
      .get("/browse/featured-playlists")
      .then((data) => {
        setCart(data.data.playlists.items.slice(0, 6));
      })
      .catch((error) => console.error("Pleylistsni olishda xato:", error));
  }, []);

  useEffect(() => {
    http
      .get("/browse/categories/toplists/playlists")
      .then((data) => {
        if (data.status === 200) {
          setTop(data.data.playlists.items);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists")
      .then((data) => {
        if (data.status === 200) {
          setMade(data.data.playlists.items);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists")
      .then((data) => {
        if (data.status === 200) {
          setRec(data.data.playlists.items);
        }
      });
  }, []);

  useEffect(() => {
    http
      .get("/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists")
      .then((data) => {
        if (data.status === 200) {
          setJump(data.data.playlists.items);
        }
      });
  }, []);

  useEffect(() => {
    http
      .get("/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists")
      .then((data) => {
        if (data.status === 200) {
          setUnique(data.data.playlists.items);
        }
      });
  }, []);

  const handleSeeAllToggle = (setter, toggleState) => {
    setter(!toggleState);
  };

  const handleCartClick = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };

  const renderSection = (title, data, showAll, setShowAll) => (
    <div className="flex flex-col my-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <p
          className="cursor-pointer text-gray-300 hover:underline"
          onClick={() => handleSeeAllToggle(setShowAll, showAll)}
        >
          {showAll ? "Kamroq ko'rsat" : "Barchasini ko'rsat"}
        </p>
      </div>
      <div className="flex flex-wrap gap-6 cursor-pointer">
        {(showAll ? data : data.slice(0, 4)).map((item) => (
          <div
            className="flex items-center p-4 rounded-lg bg-[#121212] w-[200px] text-white flex-col transition-transform transform hover:scale-105"
            key={item.id}
            onClick={() => handleCartClick(item.id)}
          >
            {item.images && item.images.length > 0 && (
              <img
                className="w-[1000px] mb-3 rounded-lg"
                src={item.images[0].url}
                alt={item.name}
              />
            )}
            <h1 className="text-white font-medium text-center">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <div className="h-[500px] w-[60vw] p-6 bg-gradient-to-t from-cyan-900 to-purple-800 mx-auto rounded-lg shadow-md">
        <div className="flex gap-4 mb-6">
          <FaCircleArrowLeft className="text-white text-2xl cursor-pointer" />
          <FaCircleArrowRight className="text-white text-2xl cursor-pointer" />
        </div>
        <h1 className="mt-8 text-4xl text-white font-bold">Good Afternoon</h1>
        <div className="flex flex-wrap justify-between mt-6 cursor-pointer">
          {cart.length > 0 &&
            cart.map((song) => (
              <div
                key={song.id}
                className="flex items-center bg-white/30 p-3 m-2 rounded-lg shadow-lg w-[45%] h-[80px] cursor-pointer hover:bg-white/40"
                onClick={() => handleCartClick(song.id)}
              >
                {song.images && song.images.length > 0 && (
                  <img
                    className="w-16 h-full mr-5 rounded"
                    src={song.images[0].url}
                    alt={song.name}
                  />
                )}
                <h1 className="text-white font-semibold text-xl">{song.name}</h1>
              </div>
            ))}
        </div>
      </div>
      <div className="container mx-auto mt-8 p-4">
        {renderSection("Your Top Mixes", top, showAllTop, setShowAllTop)}
        {renderSection("Made For You", made, showAllMade, setShowAllMade)}
        {renderSection("Recently Played", recently, showAllRecently, setShowAllRecently)}
        {renderSection("Jump Back In", jump, showAllJump, setShowAllJump)}
        {renderSection("Uniquely Yours", unique, showAllUnique, setShowAllUnique)}
      </div>
    </div>
  );
}

export default Home;