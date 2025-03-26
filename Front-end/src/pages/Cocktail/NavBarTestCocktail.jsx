import { Link } from "react-router-dom";
import ProtectedLink from "../../components/ProtectedLink";

function NavBarTestCocktail() {
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;

  return (
    <div>
      <nav className="bg-sky-700 p-2 my-2 text-center w-auto">
        <ul className="flex justify-around">
          <li className="m-4">
            <Link to="/cocktail/list">
              <p className="text-white">Liste des cocktails</p>
            </Link>
          </li>
          <li className="m-4">
            <ProtectedLink to="/cocktail/new">
              <p className="text-white">Ajouter un cocktail</p>
            </ProtectedLink>
          </li>
          <li className="m-4">
            <Link to="/cocktail/search">
              <p className="text-white">Rechercher un cocktail</p>
            </Link>
          </li>
          <li className="m-4">
            <Link to="/cocktail/detail">
              <p className="text-white">Information sur le cocktail</p>
            </Link>
          </li>
          {userData ? (
            <>
              <li className="m-4">
                <p className="text-white">Bienvenue, {userData.username}</p>
              </li>
              <li className="m-4">
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                  }}
                >
                  <p className="text-white">Déconnexion</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="m-4">
                <Link to="/login">
                  <p className="text-white">Connexion</p>
                </Link>
              </li>
              <li className="m-4">
                <Link to="/register">
                  <p className="text-white">Inscription</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBarTestCocktail;
