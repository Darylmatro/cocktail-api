import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import CGU from './pages/CGU'
import Cookies from './pages/Cookies'
import Accessibilite from './pages/Accessibilite'

import ListCocktail from './pages/TestCocktail/ListCocktail'
import DetailCocktail from './pages/TestCocktail/DetailCocktail'
import SearchCocktail from './pages/TestCocktail/SearchCocktail'
import NewCocktail from './pages/TestCocktail/NewCocktail'

import Login from './pages/Users/Login'
import Register from './pages/Users/Register'


function App() {
  return (
    <>
    <Router>
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/cocktail-logo.png" alt="Logo L'atelier du cocktail" className="h-12 w-auto mr-3" />
              <h1 className="text-2xl font-bold text-orange-500">L'atelier du cocktail</h1>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition duration-300">
              Accueil
            </Link>
            <Link to="/testCocktail/list" className="text-gray-700 hover:text-orange-500 font-medium transition duration-300">
              Recettes
            </Link>
            <Link to="/connexion" className="text-gray-700 hover:text-orange-500 font-medium transition duration-300">
              Connexion
            </Link>
            <Link to="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition duration-300">
              Contact
            </Link>
          </nav>
          
          {/* Menu mobile (hamburger) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/testCocktail/list" element={<ListCocktail />} />
          <Route path="/testCocktail/detail/:name" element={<DetailCocktail />} />
          <Route path="/testCocktail/search" element={<SearchCocktail />} />
          <Route path="/testCocktail/new" element={<NewCocktail />} />

          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          
          {/* Legal pages */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/accessibilite" element={<Accessibilite />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img src="/images/cocktail-logo.png" alt="Logo L'atelier du cocktail" className="h-10 w-auto mr-3" />
                <h3 className="text-xl font-bold text-orange-400">L'atelier du cocktail</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Découvrez les meilleures recettes de cocktails pour toutes les occasions. 
                Des classiques aux créations originales, trouvez l'inspiration pour vos soirées.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-orange-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Liens rapides */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-orange-400 transition duration-300">Accueil</Link></li>
                <li><Link to="/testCocktail/list" className="text-gray-300 hover:text-orange-400 transition duration-300">Recettes</Link></li>
                <li><Link to="/connexion" className="text-gray-300 hover:text-orange-400 transition duration-300">Connexion</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-orange-400 transition duration-300">Contact</Link></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">123 Avenue des Cocktails, 75000 Paris</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">contact@atelierducocktail.fr</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">01 23 45 67 89</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Mentions légales */}
          <div className="border-t border-gray-700 mt-8 pt-6 pb-2">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <Link to="/mentions-legales" className="hover:text-orange-400 transition duration-300">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="hover:text-orange-400 transition duration-300">Politique de confidentialité</Link>
              <Link to="/cgu" className="hover:text-orange-400 transition duration-300">CGU</Link>
              <Link to="/cookies" className="hover:text-orange-400 transition duration-300">Gestion des cookies</Link>
              <Link to="/accessibilite" className="hover:text-orange-400 transition duration-300">Accessibilité</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-4 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} L'atelier du cocktail. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </Router>
    </>
  )
}

export default App
