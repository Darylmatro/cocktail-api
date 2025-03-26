from flask import Blueprint, request, jsonify
from API_Flask.database import Database

cocktail_api = Blueprint('cocktail_api', __name__)

connexion_test = Database()
cocktail_collection = connexion_test.get_database["cocktails-collection"]

# TODO
# Ajouter les routes suivantes:
# Frontend pour les routes:
# - Créer un cocktail
# Lister les cocktails avec filtres (route supplémentaire)

# Liste des cocktails
@cocktail_api.route('/api/cocktail/list', methods=['GET', 'POST'])
def cocktail_list():
    data_list = []
    try:
        for data in cocktail_collection.find():
            data.pop("_id")
            data_list.append(data)
        return jsonify(data_list)
    except Exception as e:
        print("Erreur: ", e)
        return jsonify({"message": "Erreur lors de la récupération des données"})


# Création d'un cocktail
@cocktail_api.route('/api/cocktail/create', methods=['GET', 'POST']) 
def cocktail_create():
    data = request.json
    '''Exemple de donnése à insérer:
    data = {"name": "cocktail1",
            "alcohol": True,
            "alcohol_level": 5,
            "ingredients": ["ingredient1", "ingredient2"],
            "prepation": "preparation1",
            }'''
    try:
        already_exist = cocktail_collection.find_one({"name": data["name"]})
        if already_exist != []:
            return jsonify({"message": "Ce cocktail existe déjà"})
        else:
            cocktail_collection.insert_one(data)
            return jsonify({"message": "Données insérées"})
    except Exception as e:
        print("Erreur: ", e)
        return jsonify({"message": "Erreur lors de l'insertion"})


# Recherche d'un cocktail un cocktail spécifique (TODO)
@cocktail_api.route('/api/cocktail/read/<cocktail_name>', methods=['GET', 'POST'])
def cocktail_read(cocktail_name):
    print(f"URL appelée : {request.url}") # Debug
    data_list = []
    try:
        for data in cocktail_collection.find({"name":cocktail_name}):
            print(data)
            data.pop("_id")
            data_list.append(data)
            print("Cocktail trouvé: ", data)
        return jsonify(data_list)
    except Exception as e:
        print("Erreur: ", e)
        return jsonify({"message": "Erreur lors de la récupération des données"})
    

# Mettre à jour un cocktail (TODO)
@cocktail_api.route('/api/cocktail/update', methods=['GET', 'POST'])
def cocktail_update(searched_data, updated_data):
    #cocktail_collection.update_one(searched_data, updated_data)
    return jsonify({"message": "Données mises à jour"})


# Supprimer un cocktail (TODO)
@cocktail_api.route('/api/cocktail/delete', methods=['GET', 'POST'])
def cocktail_delete(searched_data):
    #cocktail_collection.delete_one(searched_data)
    return jsonify({"message": "Données supprimées"})

