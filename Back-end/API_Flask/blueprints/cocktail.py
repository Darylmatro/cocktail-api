from flask import Blueprint, request, jsonify
from API_Flask.database import Database

cocktail_api = Blueprint('cocktail_api', __name__)

connexion_test = Database()
test_collection = connexion_test.get_database["cocktails-collection"]

# TODO
# Ajouter les routes suivantes:
# Frontend pour les routes:
# - Créer un cocktail
# Lister les cocktails avec filtres (route supplémentaire)

@cocktail_api.route('/api/cocktail/list', methods=['GET', 'POST'])
def cocktail_list():
    data_list = []
    for data in test_collection.find():
        data.pop("_id")
        data_list.append(data)
    return jsonify(data_list)


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
        test_collection.insert_one(data)
    except Exception as e:
        print("Erreur: ", e)
        return jsonify({"message": "Erreur lors de l'insertion"})
    return jsonify({"message": "Données insérées"})


@cocktail_api.route('/api/cocktail/read', methods=['GET', 'POST'])
def cocktail_read():
    searched_data = "cocktail1"
    data_list = []
    for data in test_collection.find({"name":searched_data}):
        print(data)
        data.pop("_id")
        data_list.append(data)
    return jsonify(data)
    


@cocktail_api.route('/api/cocktail/update', methods=['GET', 'POST'])
def cocktail_update(searched_data, updated_data):
    test_collection.update_one(searched_data, updated_data)
    return jsonify({"message": "Données mises à jour"})


@cocktail_api.route('/api/cocktail/delete', methods=['GET', 'POST'])
def cocktail_delete(searched_data):
    test_collection.delete_one(searched_data)
    return jsonify({"message": "Données supprimées"})

