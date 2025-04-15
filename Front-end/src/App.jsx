// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { useContext } from "react";

import AppHeader from "./components/header";
import AppFooter from "./components/footer";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import Cookies from "./pages/Cookies";
import Accessibilite from "./pages/Accessibilite";

import ListCocktail from "./pages/TestCocktail/ListCocktail";
import APIListCocktail from "./pages/TestCocktail/ApiListCocktail";
import DetailCocktail from "./pages/TestCocktail/DetailCocktail";
import APIDetailCocktail from "./pages/TestCocktail/ApiDetailCocktail";
import SearchCocktail from "./pages/TestCocktail/SearchCocktail";
import NewCocktail from "./pages/TestCocktail/NewCocktail";

import Login from "./pages/Users/Login";
import Register from "./pages/Users/Register";
import Profile from "./pages/Users/Profile";
import { UserProvider, UserContext } from "./contexts/UserContext";

function AppContent() {
  //const { user, setUser } = useContext(UserContext);

  /*const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };*/

  //const routeAPI = location.pathname.endsWith("/api");

  return (
    <>
      {/* Header */}
      <AppHeader />

      {/* Contenu principal */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/testCocktail/list" element={<ListCocktail />} />
          <Route
            path="/testCocktail/detail/:name"
            element={<DetailCocktail />}
          />
          <Route path="/testCocktail/search" element={<SearchCocktail />} />
          <Route path="/testCocktail/new" element={<NewCocktail />} />

          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/profil" element={<Profile />} />

          {/* Legal pages */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route
            path="/politique-confidentialite"
            element={<PolitiqueConfidentialite />}
          />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/accessibilite" element={<Accessibilite />} />
        </Routes>
      </main>

      {/* Footer */}
      <AppFooter />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
