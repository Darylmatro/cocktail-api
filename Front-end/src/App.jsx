import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

import NavBarTestCocktail from './pages/TestCocktail/navBarTestCocktail'
import ListCocktail from './pages/TestCocktail/ListCocktail'
import DetailCocktail from './pages/TestCocktail/DetailCocktail'
import SearchCocktail from './pages/TestCocktail/SearchCocktail'
import NewCocktail from './pages/TestCocktail/NewCocktail'

function App() {

  return (
    <>
    <Router>
      <NavBarTestCocktail />
      <h1>Cocktail API</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/testCocktail/list" element={<ListCocktail />} />
        <Route path="/testCocktail/detail" element={<DetailCocktail />} />
        <Route path="/testCocktail/search" element={<SearchCocktail />} />
        <Route path="/testCocktail/new" element={<NewCocktail />} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
