import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();


export const useFavorites = () => useContext(FavoritesContext);


export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (!prev.some((m) => m._id === movie._id)) return [...prev, movie];
      return prev;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m._id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((m) => m._id === movieId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
