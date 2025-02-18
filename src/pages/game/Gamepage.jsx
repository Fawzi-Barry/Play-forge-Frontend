import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllGames } from "../../apis/Api";
import { toast } from "react-toastify";

const GamePage = () => {
  const [games, setGames] = useState([]);
  const [apigames, setApiGames] = useState([]);
  const [query, setQuery] = useState("games");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSearch = () => {
    fetchGames(query, category);
  };

  useEffect(() => {
    console.log("useEffect");

    fetchGames();
  }, []);

  const fetchGames = () => {
    getAllGames()
      .then((res) => {
        setGames(res.data.games);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch games");
      });
  };

  return (
    <div className="bg-geda2 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">
        Developer Published Games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((singleGame) => (
          <div
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            key={singleGame._id}
          >
            <img
              src={singleGame.gameThumbnail}
              className="w-full h-48 object-cover"
              alt={singleGame.gameTitle}
            />
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-100">
                {singleGame.gameTitle}
              </h1>

              <span className="text-sm text-gray-100">
                {singleGame.developerName}
              </span>

              <p className="text-gray-400 text-sm">{singleGame.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
