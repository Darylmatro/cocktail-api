import { useContext } from "react";
import { UserProvider, UserContext } from "./../contexts/UserContext";
import { Link } from "react-router-dom";

function AppHeader() {

    const { user, setUser } = useContext(UserContext);

    return (
        <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="../../public/Cocktail.webp"
                alt="Logo L'atelier du cocktail"
                className="h-12 w-auto mr-3"
              />
              <h1 className="text-2xl font-bold text-orange-500">
                L'atelier du cocktail
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 font-medium transition duration-300"
            >
              Accueil
            </Link>
            <Link
              to="/testCocktail/list"
              className="text-gray-700 hover:text-orange-500 font-medium transition duration-300"
            >
              Recettes
            </Link>
            {user ? (
              <>
                <Link
                  to="/profil"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition duration-300"
                >
                  Profil
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="text-gray-700 hover:text-orange-500 font-medium transition duration-300"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="text-gray-700 hover:text-orange-500 font-medium transition duration-300"
                >
                  Inscription
                </Link>
              </>
            )}
          </nav>

          {/* Menu mobile (hamburger) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    )
}

export default AppHeader;