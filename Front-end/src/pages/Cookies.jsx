import React from 'react';

function Cookies() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Politique de Gestion des Cookies</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-gray-600 mb-6">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
        <p className="text-gray-600 mb-6">
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite 
          sur notre site. Il permet de stocker des informations relatives à votre navigation et de vous offrir une expérience personnalisée.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Les cookies que nous utilisons</h2>
        <p className="text-gray-600 mb-6">
          Notre site utilise différents types de cookies :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2"><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
          <li className="mb-2"><strong>Cookies de performance :</strong> Pour analyser la fréquentation et l'utilisation du site</li>
          <li className="mb-2"><strong>Cookies de fonctionnalité :</strong> Pour mémoriser vos préférences</li>
          <li className="mb-2"><strong>Cookies de ciblage :</strong> Pour vous proposer des publicités pertinentes</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Durée de conservation des cookies</h2>
        <p className="text-gray-600 mb-6">
          Les cookies peuvent être conservés pour une durée maximale de 13 mois. À l'expiration de ce délai, 
          votre consentement sera à nouveau sollicité.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Gestion de vos préférences</h2>
        <p className="text-gray-600 mb-6">
          Vous pouvez à tout moment modifier vos préférences en matière de cookies :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Via le bandeau de cookies présent sur notre site</li>
          <li className="mb-2">En paramétrant votre navigateur</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Comment configurer votre navigateur</h2>
        <p className="text-gray-600 mb-6">
          Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2"><strong>Chrome :</strong> Menu → Paramètres → Afficher les paramètres avancés → Confidentialité → Paramètres de contenu</li>
          <li className="mb-2"><strong>Firefox :</strong> Menu → Options → Vie privée → Historique → Paramètres</li>
          <li className="mb-2"><strong>Safari :</strong> Préférences → Confidentialité</li>
          <li className="mb-2"><strong>Edge :</strong> Menu → Paramètres → Afficher les paramètres avancés → Confidentialité et services</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
          <p className="text-orange-700">
            <strong>Note :</strong> La désactivation des cookies peut limiter votre accès à certaines fonctionnalités du site.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Vos droits</h2>
        <p className="text-gray-600 mb-6">
          Conformément à la réglementation en vigueur, vous disposez de droits d'accès, de rectification et d'opposition 
          au traitement des données vous concernant. Pour exercer ces droits, veuillez nous contacter à l'adresse : 
          privacy@atelierducocktail.fr
        </p>
      </div>
    </div>
  );
}

export default Cookies;