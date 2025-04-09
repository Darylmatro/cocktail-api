import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4 py-12">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <span className="text-9xl font-bold text-orange-500">404</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Page non trouvée</h1>
                <p className="text-gray-600 mb-8">Oups ! La page que vous recherchez semble avoir disparu comme un cocktail en été.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full transition duration-300 shadow-md">
                        Retour à l'accueil
                    </Link>
                    <Link to="/testCocktail/list" className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-full border border-gray-300 transition duration-300 shadow-md">
                        Voir nos recettes
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;