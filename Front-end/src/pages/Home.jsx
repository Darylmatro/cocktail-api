function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/cocktailhome.webp')" }}
      >
        <div className="relative container mx-auto px-6 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Découvrez des Cocktails Rafraîchissants
            </h1>
            <p className="text-xl text-white mb-8 drop-shadow-lg">
              Parfaits pour vos soirées d'été
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
              Explorer
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Catégories Populaires
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Category Card 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/tropical-cocktails.jpg')",
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cocktails Tropicaux
              </h3>
              <p className="text-gray-600">Découvrez des saveurs exotiques</p>
            </div>
          </div>

          {/* Category Card 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/mocktails.jpg')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Mocktails
              </h3>
              <p className="text-gray-600">
                Sans alcool mais pleins de saveurs
              </p>
            </div>
          </div>

          {/* Category Card 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/classic-cocktails.jpg')",
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Classiques
              </h3>
              <p className="text-gray-600">Les incontournables revisités</p>
            </div>
          </div>

          {/* Category Card 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/fruit-cocktails.jpg')" }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fruités
              </h3>
              <p className="text-gray-600">Explosions de saveurs fruitées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cocktails */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Cocktails Tendance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cocktail Card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/mojito.jpg')" }}
              ></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Mojito Classique
                  </h3>
                  <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Le cocktail cubain rafraîchissant à base de rhum, menthe et
                  citron vert.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-600 ml-1">4.8</span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 font-medium">
                    Voir la recette
                  </button>
                </div>
              </div>
            </div>

            {/* Cocktail Card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/pina-colada.jpg')" }}
              ></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Piña Colada
                  </h3>
                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Tropical
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Un délicieux mélange de rhum, lait de coco et jus d'ananas.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-600 ml-1">4.7</span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 font-medium">
                    Voir la recette
                  </button>
                </div>
              </div>
            </div>

            {/* Cocktail Card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/margarita.jpg')" }}
              ></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Margarita
                  </h3>
                  <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Classique
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Le cocktail mexicain à base de tequila, triple sec et jus de
                  citron vert.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-gray-600 ml-1">4.6</span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-700 font-medium">
                    Voir la recette
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl shadow-xl p-10 md:p-16">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Recevez nos recettes exclusives
            </h2>
            <p className="text-white text-lg mb-8">
              Inscrivez-vous à notre newsletter pour découvrir chaque semaine de
              nouvelles recettes de cocktails.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button className="bg-white text-orange-500 hover:bg-orange-100 font-semibold py-3 px-8 rounded-full transition duration-300">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
