import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import NavBarTestCocktail from "./pages/Cocktail/navBarTestCocktail";
import ListCocktail from "./pages/Cocktail/ListCocktail";
import DetailCocktail from "./pages/Cocktail/DetailCocktail";
import SearchCocktail from "./pages/Cocktail/SearchCocktail";
import NewCocktail from "./pages/Cocktail/NewCocktail";

function App() {
  return (
    <>
      <Router>
        <NavBarTestCocktail />
        <h1>Cocktail API</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cocktail/list" element={<ListCocktail />} />
          <Route path="/cocktail/detail" element={<DetailCocktail />} />
          <Route path="/cocktail/search" element={<SearchCocktail />} />
          <Route path="/cocktail/new" element={<NewCocktail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
