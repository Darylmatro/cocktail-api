import React from 'react';

function MentionsLegales() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mentions Légales</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Éditeur du site</h2>
        <p className="text-gray-600 mb-4">
          L'atelier du cocktail<br />
          123 Avenue des Cocktails<br />
          75000 Paris, France<br />
          SIRET : 123 456 789 00012<br />
          Téléphone : 01 23 45 67 89<br />
          Email : contact@atelierducocktail.fr
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Directeur de la publication</h2>
        <p className="text-gray-600 mb-4">
          Jean Dupont, Directeur Général
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Hébergement</h2>
        <p className="text-gray-600 mb-4">
          Ce site est hébergé par :<br />
          Société d'Hébergement<br />
          456 Rue des Serveurs<br />
          69000 Lyon, France<br />
          Téléphone : 04 56 78 90 12
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Propriété intellectuelle</h2>
        <p className="text-gray-600 mb-4">
          L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est la propriété exclusive de L'atelier du cocktail 
          ou de ses partenaires. Toute reproduction, représentation, modification, publication, transmission, dénaturation, 
          totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit 
          est interdite sans l'autorisation écrite préalable de L'atelier du cocktail.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Données personnelles</h2>
        <p className="text-gray-600 mb-4">
          Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, 
          de rectification et de suppression des données vous concernant. Pour exercer ce droit, veuillez nous contacter 
          par email à l'adresse : contact@atelierducocktail.fr
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Cookies</h2>
        <p className="text-gray-600 mb-4">
          Notre site utilise des cookies pour améliorer votre expérience de navigation. Pour plus d'informations, 
          veuillez consulter notre page dédiée à la gestion des cookies.
        </p>
      </div>
    </div>
  );
}

export default MentionsLegales;