import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Récupération de l'utilisateur depuis le localStorage au premier chargement
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser._id && parsedUser.username) {
          setUser(parsedUser);
        } else {
          console.warn("User data invalid, clearing localStorage.");
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Erreur de parsing des données utilisateur :", error);
      localStorage.removeItem("user");
    }
  }, []);

  // À chaque mise à jour de l'utilisateur, on met à jour localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Déconnection ou absence de user
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
