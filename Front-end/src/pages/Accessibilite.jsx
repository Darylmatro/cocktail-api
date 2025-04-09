import React from 'react';

function Accessibilite() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Déclaration d'Accessibilité</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-gray-600 mb-6">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Notre engagement</h2>
        <p className="text-gray-600 mb-6">
          L'atelier du cocktail s'engage à rendre son site web accessible à tous, y compris aux personnes en situation de handicap, 
          conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. État de conformité</h2>
        <p className="text-gray-600 mb-6">
          Notre site est partiellement conforme aux normes RGAA (Référentiel Général d'Amélioration de l'Accessibilité). 
          Nous travaillons continuellement à l'amélioration de l'accessibilité de notre plateforme.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Mesures d'accessibilité mises en place</h2>
        <p className="text-gray-600 mb-6">
          Nous avons pris les mesures suivantes pour garantir l'accessibilité :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Structure sémantique claire avec des titres hiérarchisés</li>
          <li className="mb-2">Contraste suffisant entre le texte et l'arrière-plan</li>
          <li className="mb-2">Descriptions alternatives pour les images</li>
          <li className="mb-2">Navigation possible au clavier</li>
          <li className="mb-2">Formulaires accessibles avec étiquettes appropriées</li>
          <li className="mb-2">Textes redimensionnables sans perte de contenu</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Limites et alternatives</h2>
        <p className="text-gray-600 mb-6">
          Malgré nos efforts, certaines parties du site peuvent ne pas être totalement accessibles :
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li className="mb-2">Certains contenus multimédias anciens peuvent ne pas disposer de sous-titres</li>
          <li className="mb-2">Certains documents PDF peuvent ne pas être totalement accessibles</li>
        </ul>
        <p className="text-gray-600 mb-6">
          Si vous rencontrez des difficultés, n'hésitez pas à nous contacter pour obtenir une version alternative du contenu.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Amélioration et contact</h2>
        <p className="text-gray-600 mb-6">
          Nous nous engageons à améliorer continuellement l'accessibilité de notre site. Si vous rencontrez des difficultés 
          ou souhaitez nous faire part de suggestions, veuillez nous contacter à : accessibilite@atelierducocktail.fr
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Recours</h2>
        <p className="text-gray-600 mb-6">
          Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou une fonctionnalité du site, 
          et que vous nous le signalez sans obtenir de réponse satisfaisante, vous êtes en droit de faire parvenir vos doléances 
          ou une demande de saisine au Défenseur des droits.
        </p>
      </div>
    </div>
  );
}

export default Accessibilite;