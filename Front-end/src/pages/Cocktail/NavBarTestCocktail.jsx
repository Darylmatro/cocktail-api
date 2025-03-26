import { Link } from "react-router-dom";

function NavBarTestCocktail() {
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
            <Link to="/cocktail/new">
              <p className="text-white">Ajouter un cocktail</p>
            </Link>
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
        </ul>
      </nav>
    </div>
  );
}

export default NavBarTestCocktail;
