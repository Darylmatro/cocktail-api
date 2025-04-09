import React from 'react';

function PolitiqueConfidentialite() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Politique de Confidentialité</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-gray-600 mb-6">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-6">
          L'atelier du cocktail s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, 
          utilisons, divulguons, conservons et protégeons vos informations personnelles.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Informations que nous collectons</h2>
        <p className="text-gray-600 mb-6">
          Nous pouvons collecter les types d'informations suivants :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Informations d'identification (nom, prénom, adresse email)</li>
          <li className="mb-2">Informations de contact (adresse postale, numéro de téléphone)</li>
          <li className="mb-2">Informations de paiement (pour les achats)</li>
          <li className="mb-2">Données de navigation (cookies, adresse IP)</li>
          <li className="mb-2">Préférences utilisateur (favoris, historique)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Utilisation des informations</h2>
        <p className="text-gray-600 mb-6">
          Nous utilisons vos informations personnelles pour :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Fournir, maintenir et améliorer nos services</li>
          <li className="mb-2">Traiter vos transactions et commandes</li>
          <li className="mb-2">Vous envoyer des communications marketing (avec votre consentement)</li>
          <li className="mb-2">Personnaliser votre expérience utilisateur</li>
          <li className="mb-2">Assurer la sécurité de nos services</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Partage des informations</h2>
        <p className="text-gray-600 mb-6">
          Nous ne vendons pas vos données personnelles. Nous pouvons partager vos informations avec :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Nos prestataires de services (hébergement, paiement, livraison)</li>
          <li className="mb-2">Les autorités légales en cas d'obligation légale</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Vos droits</h2>
        <p className="text-gray-600 mb-6">
          Conformément au RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Droit d'accès à vos données personnelles</li>
          <li className="mb-2">Droit de rectification de vos données</li>
          <li className="mb-2">Droit à l'effacement de vos données</li>
          <li className="mb-2">Droit à la limitation du traitement</li>
          <li className="mb-2">Droit à la portabilité de vos données</li>
          <li className="mb-2">Droit d'opposition au traitement</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Contact</h2>
        <p className="text-gray-600 mb-6">
          Pour toute question concernant cette politique ou pour exercer vos droits, veuillez nous contacter à :
          <br /><br />
          Email : privacy@atelierducocktail.fr<br />
          Adresse : 123 Avenue des Cocktails, 75000 Paris
        </p>
      </div>
    </div>
  );
}

export default PolitiqueConfidentialite;