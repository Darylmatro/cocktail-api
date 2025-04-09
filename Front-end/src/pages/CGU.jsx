import React from 'react';

function CGU() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Conditions Générales d'Utilisation</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-gray-600 mb-6">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptation des conditions</h2>
        <p className="text-gray-600 mb-6">
          L'accès et l'utilisation du site L'atelier du cocktail sont soumis à l'acceptation et au respect des présentes 
          Conditions Générales d'Utilisation. En utilisant notre site, vous acceptez pleinement et sans réserve ces conditions.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Description des services</h2>
        <p className="text-gray-600 mb-6">
          L'atelier du cocktail propose un site de recettes de cocktails, permettant aux utilisateurs de découvrir, 
          sauvegarder et partager des recettes. Certaines fonctionnalités peuvent nécessiter la création d'un compte utilisateur.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Création de compte</h2>
        <p className="text-gray-600 mb-6">
          Pour accéder à certaines fonctionnalités, vous devrez créer un compte en fournissant des informations exactes et à jour. 
          Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les activités effectuées sous votre compte.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Comportement des utilisateurs</h2>
        <p className="text-gray-600 mb-6">
          En utilisant notre site, vous vous engagez à :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Ne pas publier de contenu illégal, offensant ou inapproprié</li>
          <li className="mb-2">Ne pas tenter d'accéder à des zones non autorisées du site</li>
          <li className="mb-2">Ne pas perturber le fonctionnement normal du site</li>
          <li className="mb-2">Respecter les droits des autres utilisateurs</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Propriété intellectuelle</h2>
        <p className="text-gray-600 mb-6">
          Tous les contenus présents sur le site (textes, images, logos, etc.) sont protégés par les droits de propriété intellectuelle. 
          Toute reproduction ou utilisation non autorisée est interdite.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Contenu utilisateur</h2>
        <p className="text-gray-600 mb-6">
          En publiant du contenu sur notre site, vous nous accordez une licence non exclusive pour utiliser, modifier, 
          afficher et distribuer ce contenu sur notre plateforme.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Limitation de responsabilité</h2>
        <p className="text-gray-600 mb-6">
          L'atelier du cocktail ne peut garantir l'exactitude de toutes les informations présentes sur le site. 
          Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation du site.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Modification des conditions</h2>
        <p className="text-gray-600 mb-6">
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur le site.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Droit applicable</h2>
        <p className="text-gray-600 mb-6">
          Les présentes conditions sont régies par le droit français. Tout litige relatif à l'interprétation ou à l'exécution 
          des présentes conditions relèvera de la compétence des tribunaux français.
        </p>
      </div>
    </div>
  );
}

export default CGU;